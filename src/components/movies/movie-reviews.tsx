'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, ThumbsUp, MessageCircle, Send } from 'lucide-react';
import { toast } from 'sonner';

interface Review {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  rating: number;
  title: string;
  comment: string;
  date: string;
  likes: number;
  isLiked: boolean;
  helpful: number;
}

interface MovieReviewsProps {
  movieId: string;
  movieTitle: string;
}

export function MovieReviews({ movieId, movieTitle }: MovieReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({
    rating: 0,
    title: '',
    comment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Sample reviews data
  const sampleReviews: Review[] = [
    {
      id: '1',
      user: {
        name: 'John Doe',
        avatar: ''
      },
      rating: 5,
      title: 'Amazing Visual Experience!',
      comment: 'The visual effects in this movie are absolutely stunning. The 3D experience was incredible and the story kept me engaged throughout. Highly recommend watching this in IMAX for the best experience.',
      date: '2024-01-15',
      likes: 12,
      isLiked: false,
      helpful: 8
    },
    {
      id: '2',
      user: {
        name: 'Sarah Wilson',
        avatar: ''
      },
      rating: 4,
      title: 'Great Movie, Long Runtime',
      comment: 'Really enjoyed the movie overall. The cinematography is beautiful and the acting is solid. My only complaint is that it\'s quite long, so make sure you\'re comfortable!',
      date: '2024-01-14',
      likes: 8,
      isLiked: true,
      helpful: 5
    },
    {
      id: '3',
      user: {
        name: 'Mike Johnson',
        avatar: ''
      },
      rating: 3,
      title: 'Good but Overhyped',
      comment: 'The movie is decent but I think it was overhyped. The special effects are impressive but the story feels a bit slow in places. Worth watching but not a must-see.',
      date: '2024-01-13',
      likes: 3,
      isLiked: false,
      helpful: 2
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setReviews(sampleReviews);
    }, 1000);
  }, [movieId]);

  const handleRatingClick = (rating: number) => {
    setNewReview(prev => ({ ...prev, rating }));
  };

  const handleSubmitReview = async () => {
    if (newReview.rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    if (!newReview.title.trim()) {
      toast.error('Please enter a review title');
      return;
    }
    if (!newReview.comment.trim()) {
      toast.error('Please write a review comment');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const review: Review = {
        id: Date.now().toString(),
        user: {
          name: 'You',
          avatar: ''
        },
        rating: newReview.rating,
        title: newReview.title,
        comment: newReview.comment,
        date: new Date().toISOString().split('T')[0],
        likes: 0,
        isLiked: false,
        helpful: 0
      };

      setReviews(prev => [review, ...prev]);
      setNewReview({ rating: 0, title: '', comment: '' });
      setShowReviewForm(false);
      setIsSubmitting(false);
      toast.success('Review submitted successfully!');
    }, 1000);
  };

  const handleLikeReview = (reviewId: string) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { 
            ...review, 
            isLiked: !review.isLiked,
            likes: review.isLiked ? review.likes - 1 : review.likes + 1
          }
        : review
    ));
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const getRatingDistribution = () => {
    const distribution = [0, 0, 0, 0, 0];
    reviews.forEach(review => {
      distribution[review.rating - 1]++;
    });
    return distribution;
  };

  const renderStars = (rating: number, interactive = false, onRatingClick?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => interactive && onRatingClick?.(star)}
            disabled={!interactive}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
          >
            <Star
              className={`h-5 w-5 ${
                star <= rating
                  ? 'text-yellow-500 fill-current'
                  : 'text-gray-400'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Reviews Summary */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Reviews & Ratings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Overall Rating */}
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">{getAverageRating()}</div>
              <div className="mb-2">{renderStars(Math.round(parseFloat(getAverageRating() as string)))}</div>
              <p className="text-gray-400 text-sm">Based on {reviews.length} reviews</p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = getRatingDistribution()[rating - 1];
                const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                return (
                  <div key={rating} className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400 w-4">{rating}</span>
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-400 w-8">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Write Review */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Write a Review</CardTitle>
            <Button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="bg-yellow-500 hover:bg-yellow-600 text-black"
            >
              {showReviewForm ? 'Cancel' : 'Write Review'}
            </Button>
          </div>
        </CardHeader>
        
        {showReviewForm && (
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Rating</label>
              <div className="flex space-x-1">
                {renderStars(newReview.rating, true, handleRatingClick)}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Review Title</label>
              <Input
                placeholder="Give your review a title..."
                value={newReview.title}
                onChange={(e) => setNewReview(prev => ({ ...prev, title: e.target.value }))}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Your Review</label>
              <Textarea
                placeholder="Share your thoughts about this movie..."
                value={newReview.comment}
                onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 min-h-[100px]"
              />
            </div>

            <Button
              onClick={handleSubmitReview}
              disabled={isSubmitting}
              className="bg-yellow-500 hover:bg-yellow-600 text-black"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </Button>
          </CardContent>
        )}
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">User Reviews</h3>
        {reviews.map((review) => (
          <Card key={review.id} className="bg-gray-900 border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={review.user.avatar} alt={review.user.name} />
                  <AvatarFallback className="bg-yellow-500 text-black">
                    {review.user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-white">{review.user.name}</h4>
                    <div className="flex space-x-1">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-gray-400 text-sm">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <h5 className="font-medium text-white mb-2">{review.title}</h5>
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">{review.comment}</p>
                  
                  <div className="flex items-center space-x-4">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleLikeReview(review.id)}
                      className={`text-gray-400 hover:text-white ${
                        review.isLiked ? 'text-blue-500' : ''
                      }`}
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {review.likes}
                    </Button>
                    <span className="text-gray-400 text-sm">
                      {review.helpful} people found this helpful
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
