import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, User, Pencil, Trash2, Loader2 } from 'lucide-react';
import { useReviews, Review, ReviewStats } from '@/hooks/useReviews';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';

interface ProductReviewsProps {
  productId: string;
}

const StarRating = ({ 
  rating, 
  interactive = false, 
  onRatingChange 
}: { 
  rating: number; 
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
          onMouseEnter={() => interactive && setHoverRating(star)}
          onMouseLeave={() => interactive && setHoverRating(0)}
          onClick={() => interactive && onRatingChange?.(star)}
        >
          <Star
            className={`w-5 h-5 ${
              star <= (hoverRating || rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-muted-foreground'
            }`}
          />
        </button>
      ))}
    </div>
  );
};

const ReviewStatsDisplay = ({ stats }: { stats: ReviewStats }) => {
  const maxCount = Math.max(...Object.values(stats.distribution), 1);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-card rounded-2xl border border-border">
      {/* Average Rating */}
      <div className="flex flex-col items-center justify-center md:pr-6 md:border-r border-border">
        <span className="text-5xl font-bold">{stats.average.toFixed(1)}</span>
        <StarRating rating={Math.round(stats.average)} />
        <span className="text-muted-foreground mt-1">{stats.total} reviews</span>
      </div>

      {/* Distribution */}
      <div className="flex-1 space-y-2">
        {[5, 4, 3, 2, 1].map((star) => {
          const count = stats.distribution[star] || 0;
          const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0;

          return (
            <div key={star} className="flex items-center gap-3">
              <span className="text-sm w-3">{star}</span>
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.5, delay: (5 - star) * 0.1 }}
                  className="h-full bg-yellow-400 rounded-full"
                />
              </div>
              <span className="text-sm text-muted-foreground w-8">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ReviewCard = ({ review, isOwner, onEdit, onDelete }: { 
  review: Review; 
  isOwner: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="p-6 bg-card rounded-2xl border border-border"
  >
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
          <User className="w-5 h-5 text-muted-foreground" />
        </div>
        <div>
          <p className="font-semibold">{review.user_name}</p>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <StarRating rating={review.rating} />
        {isOwner && (
          <div className="flex gap-1 ml-2">
            <button
              onClick={onEdit}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 hover:bg-secondary hover:text-destructive rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
    {review.title && <h4 className="font-semibold mt-4">{review.title}</h4>}
    {review.comment && <p className="text-muted-foreground mt-2">{review.comment}</p>}
  </motion.div>
);

const ReviewForm = ({ 
  initialRating = 0,
  initialTitle = '',
  initialComment = '',
  isSubmitting,
  onSubmit,
  onCancel,
  isEdit = false,
}: {
  initialRating?: number;
  initialTitle?: string;
  initialComment?: string;
  isSubmitting: boolean;
  onSubmit: (rating: number, title: string, comment: string) => void;
  onCancel?: () => void;
  isEdit?: boolean;
}) => {
  const [rating, setRating] = useState(initialRating);
  const [title, setTitle] = useState(initialTitle);
  const [comment, setComment] = useState(initialComment);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    onSubmit(rating, title.trim(), comment.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-card rounded-2xl border border-border space-y-4">
      <h3 className="font-bold text-lg">{isEdit ? 'Edit Your Review' : 'Write a Review'}</h3>
      
      <div>
        <label className="text-sm font-medium mb-2 block">Your Rating *</label>
        <StarRating rating={rating} interactive onRatingChange={setRating} />
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Title (optional)</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Summarize your experience"
          maxLength={100}
        />
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Review (optional)</label>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts about this product..."
          rows={4}
          maxLength={1000}
        />
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {isEdit ? 'Update Review' : 'Submit Review'}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export const ProductReviews = ({ productId }: ProductReviewsProps) => {
  const { user } = useAuth();
  const { 
    reviews, 
    stats, 
    userReview, 
    canReview, 
    isLoading, 
    isSubmitting, 
    error,
    submitReview,
    deleteReview,
  } = useReviews(productId);

  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (rating: number, title: string, comment: string) => {
    const success = await submitReview(rating, title, comment);
    if (success) {
      toast.success(userReview ? 'Review updated!' : 'Review submitted!');
      setIsEditing(false);
      setShowForm(false);
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete your review?')) {
      const success = await deleteReview();
      if (success) {
        toast.success('Review deleted');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Customer Reviews</h2>

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive">
          {error}
        </div>
      )}

      {/* Stats */}
      {stats.total > 0 && <ReviewStatsDisplay stats={stats} />}

      {/* Review Form */}
      {user && canReview && !userReview && !showForm && (
        <Button onClick={() => setShowForm(true)}>Write a Review</Button>
      )}

      {user && canReview && !userReview && showForm && (
        <ReviewForm
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      {user && userReview && isEditing && (
        <ReviewForm
          initialRating={userReview.rating}
          initialTitle={userReview.title || ''}
          initialComment={userReview.comment || ''}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onCancel={() => setIsEditing(false)}
          isEdit
        />
      )}

      {!user && (
        <p className="text-muted-foreground">
          <a href="/auth" className="text-primary hover:underline">Sign in</a> to leave a review.
        </p>
      )}

      {user && !canReview && !userReview && (
        <p className="text-muted-foreground">
          Only verified buyers can review this product. Purchase it to leave a review!
        </p>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        <AnimatePresence>
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              isOwner={user?.id === review.user_id}
              onEdit={() => setIsEditing(true)}
              onDelete={handleDelete}
            />
          ))}
        </AnimatePresence>

        {reviews.length === 0 && (
          <p className="text-center py-8 text-muted-foreground">
            No reviews yet. Be the first to review this product!
          </p>
        )}
      </div>
    </div>
  );
};
