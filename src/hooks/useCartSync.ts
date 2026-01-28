import { useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useStore, Product, CartItem, WishlistItem } from '@/store/useStore';
import { useAuth } from '@/hooks/useAuth';
import type { Json } from '@/integrations/supabase/types';

export const useCartSync = () => {
  const { user } = useAuth();
  const cart = useStore((state) => state.cart);
  const wishlist = useStore((state) => state.wishlist);
  const isLoadingRef = useRef(false);
  const lastUserIdRef = useRef<string | null>(null);

  // Load cart and wishlist from database when user logs in
  const loadUserData = useCallback(async (userId: string) => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;

    try {
      // Load cart items
      const { data: cartData, error: cartError } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', userId);

      if (!cartError && cartData) {
        // Clear local cart first, then add database items
        useStore.getState().clearCart();
        cartData.forEach((item) => {
          const product = item.product_data as unknown as Product;
          useStore.getState().addToCart(product, item.size, item.quantity);
        });
      }

      // Load wishlist items
      const { data: wishlistData, error: wishlistError } = await supabase
        .from('wishlist_items')
        .select('*')
        .eq('user_id', userId);

      if (!wishlistError && wishlistData) {
        useStore.getState().clearWishlist();
        wishlistData.forEach((item) => {
          const product = item.product_data as unknown as Product;
          useStore.getState().addToWishlist(product);
        });
      }
    } catch (error) {
      console.error('Error loading user cart/wishlist:', error);
    } finally {
      // Delay setting isLoading to false to let state settle
      setTimeout(() => {
        isLoadingRef.current = false;
      }, 1000);
    }
  }, []);

  // Sync cart to database
  const syncCartToDb = useCallback(async (userId: string, cartItems: CartItem[]) => {
    if (isLoadingRef.current) return;

    try {
      // Delete all existing cart items for user
      await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId);

      // Insert current cart items
      if (cartItems.length > 0) {
        const items = cartItems.map((item) => ({
          user_id: userId,
          product_id: item.product.id,
          product_data: JSON.parse(JSON.stringify(item.product)) as Json,
          size: item.size,
          quantity: item.quantity,
        }));

        await supabase.from('cart_items').insert(items);
      }
    } catch (error) {
      console.error('Error syncing cart to database:', error);
    }
  }, []);

  // Sync wishlist to database
  const syncWishlistToDb = useCallback(async (userId: string, wishlistItems: WishlistItem[]) => {
    if (isLoadingRef.current) return;

    try {
      // Delete all existing wishlist items for user
      await supabase
        .from('wishlist_items')
        .delete()
        .eq('user_id', userId);

      // Insert current wishlist items
      if (wishlistItems.length > 0) {
        const items = wishlistItems.map((item) => ({
          user_id: userId,
          product_id: item.product.id,
          product_data: JSON.parse(JSON.stringify(item.product)) as Json,
        }));

        await supabase.from('wishlist_items').insert(items);
      }
    } catch (error) {
      console.error('Error syncing wishlist to database:', error);
    }
  }, []);

  // Load user data when they log in
  useEffect(() => {
    if (user && user.id !== lastUserIdRef.current) {
      lastUserIdRef.current = user.id;
      loadUserData(user.id);
    } else if (!user) {
      lastUserIdRef.current = null;
    }
  }, [user?.id, loadUserData]);

  // Sync cart changes to database (debounced)
  useEffect(() => {
    if (!user || isLoadingRef.current) return;

    const timeoutId = setTimeout(() => {
      syncCartToDb(user.id, cart);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [cart, user?.id, syncCartToDb]);

  // Sync wishlist changes to database (debounced)
  useEffect(() => {
    if (!user || isLoadingRef.current) return;

    const timeoutId = setTimeout(() => {
      syncWishlistToDb(user.id, wishlist);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [wishlist, user?.id, syncWishlistToDb]);

  return { loadUserData };
};
