import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface Review {
  id: string;
  user_id: string;
  product_id: string;
  rating: number;
  title: string | null;
  comment: string | null;
  created_at: string;
  user_name?: string;
}

export interface ReviewStats {
  average: number;
  total: number;
  distribution: { [key: number]: number };
}

export const useReviews = (productId: string) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<ReviewStats>({ average: 0, total: 0, distribution: {} });
  const [userReview, setUserReview] = useState<Review | null>(null);
  const [canReview, setCanReview] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch reviews for a product
  const fetchReviews = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error: fetchError } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', productId)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      // Fetch user names from profiles
      const reviewsWithNames = await Promise.all(
        (data || []).map(async (review) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', review.user_id)
            .maybeSingle();
          
          return {
            ...review,
            user_name: profile?.full_name || 'Anonymous',
          };
        })
      );

      setReviews(reviewsWithNames);

      // Calculate stats
      if (reviewsWithNames.length > 0) {
        const total = reviewsWithNames.length;
        const sum = reviewsWithNames.reduce((acc, r) => acc + r.rating, 0);
        const average = sum / total;
        
        const distribution: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        reviewsWithNames.forEach((r) => {
          distribution[r.rating] = (distribution[r.rating] || 0) + 1;
        });

        setStats({ average, total, distribution });
      } else {
        setStats({ average: 0, total: 0, distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } });
      }

      // Check if current user has a review
      if (user) {
        const existing = reviewsWithNames.find((r) => r.user_id === user.id);
        setUserReview(existing || null);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('Failed to load reviews');
    } finally {
      setIsLoading(false);
    }
  }, [productId, user]);

  // Check if user can review (has purchased the product)
  const checkCanReview = useCallback(async () => {
    if (!user) {
      setCanReview(false);
      return;
    }

    try {
      const { data, error: rpcError } = await supabase
        .rpc('has_purchased_product', {
          _user_id: user.id,
          _product_id: productId,
        });

      if (rpcError) throw rpcError;
      setCanReview(data === true);
    } catch (err) {
      console.error('Error checking purchase status:', err);
      setCanReview(false);
    }
  }, [user, productId]);

  // Submit a review
  const submitReview = async (rating: number, title: string, comment: string) => {
    if (!user) {
      setError('You must be logged in to submit a review');
      return false;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      if (userReview) {
        // Update existing review
        const { error: updateError } = await supabase
          .from('reviews')
          .update({ rating, title, comment })
          .eq('id', userReview.id);

        if (updateError) throw updateError;
      } else {
        // Create new review
        const { error: insertError } = await supabase
          .from('reviews')
          .insert([{
            user_id: user.id,
            product_id: productId,
            rating,
            title,
            comment,
          }]);

        if (insertError) throw insertError;
      }

      await fetchReviews();
      return true;
    } catch (err: any) {
      console.error('Error submitting review:', err);
      if (err.message?.includes('row-level security')) {
        setError('You can only review products you have purchased');
      } else {
        setError('Failed to submit review');
      }
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete a review
  const deleteReview = async () => {
    if (!userReview) return false;

    setIsSubmitting(true);
    try {
      const { error: deleteError } = await supabase
        .from('reviews')
        .delete()
        .eq('id', userReview.id);

      if (deleteError) throw deleteError;

      setUserReview(null);
      await fetchReviews();
      return true;
    } catch (err) {
      console.error('Error deleting review:', err);
      setError('Failed to delete review');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchReviews();
    checkCanReview();
  }, [fetchReviews, checkCanReview]);

  return {
    reviews,
    stats,
    userReview,
    canReview,
    isLoading,
    isSubmitting,
    error,
    submitReview,
    deleteReview,
    refetch: fetchReviews,
  };
};
