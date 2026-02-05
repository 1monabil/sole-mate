import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useStore, AppliedDiscount } from '@/store/useStore';

export type DiscountResult = AppliedDiscount;

export const useDiscount = () => {
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { appliedDiscount, setAppliedDiscount, clearAppliedDiscount } = useStore();

  const validateDiscount = async (code: string, subtotal: number): Promise<DiscountResult | null> => {
    if (!code.trim()) {
      setError('Please enter a discount code');
      return null;
    }

    setIsValidating(true);
    setError(null);

    try {
      const { data: discount, error: fetchError } = await supabase
        .from('discounts')
        .select('*')
        .eq('code', code.toUpperCase().trim())
        .eq('is_active', true)
        .maybeSingle();

      if (fetchError) {
        setError('Error validating discount code');
        return null;
      }

      if (!discount) {
        setError('Invalid discount code');
        return null;
      }

      // Check expiration
      if (discount.expires_at && new Date(discount.expires_at) < new Date()) {
        setError('This discount code has expired');
        return null;
      }

      // Check usage limits
      if (discount.max_uses !== null && (discount.current_uses ?? 0) >= discount.max_uses) {
        setError('This discount code has reached its usage limit');
        return null;
      }

      // Check minimum order amount
      if (discount.min_order_amount !== null && subtotal < discount.min_order_amount) {
        setError(`Minimum order of $${discount.min_order_amount.toFixed(2)} required for this code`);
        return null;
      }

      // Calculate discount
      let calculatedDiscount = 0;
      if (discount.discount_type === 'percentage') {
        calculatedDiscount = (subtotal * discount.discount_value) / 100;
      } else {
        calculatedDiscount = Math.min(discount.discount_value, subtotal);
      }

      const result: DiscountResult = {
        code: discount.code,
        discountType: discount.discount_type as 'percentage' | 'fixed',
        discountValue: discount.discount_value,
        calculatedDiscount,
      };

      setAppliedDiscount(result);
      return result;
    } catch (err) {
      setError('An unexpected error occurred');
      return null;
    } finally {
      setIsValidating(false);
    }
  };

  const clearDiscount = () => {
    clearAppliedDiscount();
    setError(null);
  };

  return {
    isValidating,
    error,
    appliedDiscount,
    validateDiscount,
    clearDiscount,
  };
};
