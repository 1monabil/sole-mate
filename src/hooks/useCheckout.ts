import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useStore, CartItem } from '@/store/useStore';
import { useAuth } from '@/hooks/useAuth';
import type { Json } from '@/integrations/supabase/types';

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface OrderResult {
  orderId: string;
  orderNumber: string;
  total: number;
}

export const useCheckout = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { cart, clearCart, getCartTotal } = useStore();
  const { user } = useAuth();

  const createOrder = async (
    shippingAddress: ShippingAddress,
    discountCode: string | null,
    discountAmount: number,
    shipping: number
  ): Promise<OrderResult | null> => {
    if (!user) {
      setError('You must be logged in to complete checkout');
      return null;
    }

    if (cart.length === 0) {
      setError('Your cart is empty');
      return null;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const subtotal = getCartTotal();
      const totalAmount = subtotal + shipping - discountAmount;

      // Create the order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([{
          user_id: user.id,
          subtotal,
          total_amount: totalAmount,
          discount_amount: discountAmount,
          discount_code: discountCode,
          shipping_address: JSON.parse(JSON.stringify(shippingAddress)) as Json,
          status: 'pending',
        }])
        .select('id')
        .single();

      if (orderError) {
        console.error('Order creation error:', orderError);
        setError('Failed to create order. Please try again.');
        return null;
      }

      // Create order items
      const orderItems = cart.map((item: CartItem) => ({
        order_id: order.id,
        product_id: item.product.id,
        product_name: item.product.name,
        product_image: item.product.image,
        quantity: item.quantity,
        size: String(item.size),
        price_at_purchase: item.product.price,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        console.error('Order items error:', itemsError);
        // Rollback the order if items fail
        await supabase.from('orders').delete().eq('id', order.id);
        setError('Failed to add items to order. Please try again.');
        return null;
      }

      // Increment discount usage if applicable
      if (discountCode) {
        const { data: discountData } = await supabase
          .from('discounts')
          .select('current_uses')
          .eq('code', discountCode)
          .maybeSingle();
        
        if (discountData) {
          await supabase
            .from('discounts')
            .update({ current_uses: (discountData.current_uses ?? 0) + 1 })
            .eq('code', discountCode);
        }
      }

      // Send order confirmation email
      try {
        const emailPayload = {
          orderId: order.id,
          email: shippingAddress.email,
          customerName: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
          items: orderItems.map((item) => ({
            product_name: item.product_name,
            quantity: item.quantity,
            price_at_purchase: item.price_at_purchase,
            size: item.size,
            product_image: item.product_image,
          })),
          subtotal,
          discountAmount: discountAmount > 0 ? discountAmount : undefined,
          discountCode: discountCode || undefined,
          totalAmount,
          shippingAddress,
        };

        const { error: emailError } = await supabase.functions.invoke(
          'send-order-confirmation',
          { body: emailPayload }
        );

        if (emailError) {
          console.error('Failed to send confirmation email:', emailError);
          // Don't fail the order if email fails
        } else {
          console.log('Order confirmation email sent successfully');
        }
      } catch (emailErr) {
        console.error('Email sending error:', emailErr);
        // Don't fail the order if email fails
      }

      // Clear the cart
      clearCart();

      return {
        orderId: order.id,
        orderNumber: order.id.substring(0, 8).toUpperCase(),
        total: totalAmount,
      };
    } catch (err) {
      console.error('Checkout error:', err);
      setError('An unexpected error occurred during checkout');
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isProcessing,
    error,
    createOrder,
  };
};
