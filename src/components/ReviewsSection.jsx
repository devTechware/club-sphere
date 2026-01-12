import { useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaRegStar, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-hot-toast";

const ReviewsSection = ({
  reviews = [],
  itemType = "club",
  itemId,
  onAddReview,
}) => {
  const { user } = useAuth();
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate average rating
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
    percentage:
      reviews.length > 0
        ? (
            (reviews.filter((r) => r.rating === star).length / reviews.length) *
            100
          ).toFixed(0)
        : 0,
  }));

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to write a review");
      return;
    }

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (reviewText.trim().length < 10) {
      toast.error("Review must be at least 10 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      const newReview = {
        userId: user.uid,
        userName: user.displayName || "Anonymous",
        userPhoto:
          user.photoURL ||
          `https://ui-avatars.com/api/?name=${user.displayName || "User"}`,
        rating,
        comment: reviewText,
        date: new Date().toISOString(),
      };

      if (onAddReview) {
        await onAddReview(newReview);
      }

      toast.success("Review submitted successfully!");
      setReviewText("");
      setRating(0);
      setIsWritingReview(false);
    } catch (error) {
      toast.error("Failed to submit review");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const StarRating = ({
    rating,
    size = "text-xl",
    interactive = false,
    onRate,
  }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onMouseEnter={() => interactive && setHoveredRating(star)}
            onMouseLeave={() => interactive && setHoveredRating(0)}
            onClick={() => interactive && onRate && onRate(star)}
            className={`${
              interactive ? "cursor-pointer" : "cursor-default"
            } transition-colors`}
          >
            {star <= (interactive ? hoveredRating || rating : rating) ? (
              <FaStar className={`${size} text-warning`} />
            ) : (
              <FaRegStar className={`${size} text-base-content/30`} />
            )}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black mb-2">Reviews & Ratings</h2>
          <p className="text-base-content/70">
            {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
          </p>
        </div>
        {user && !isWritingReview && (
          <button
            onClick={() => setIsWritingReview(true)}
            className="btn btn-primary"
          >
            Write a Review
          </button>
        )}
      </div>

      {/* Rating Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Average Rating */}
        <div className="card bg-base-100 shadow-xl border-2 border-base-200">
          <div className="card-body items-center text-center">
            <div className="text-6xl font-black text-primary mb-2">
              {averageRating}
            </div>
            <StarRating
              rating={Math.round(parseFloat(averageRating))}
              size="text-2xl"
            />
            <p className="text-base-content/70 font-semibold">
              Based on {reviews.length}{" "}
              {reviews.length === 1 ? "review" : "reviews"}
            </p>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="card bg-base-100 shadow-xl border-2 border-base-200">
          <div className="card-body">
            {ratingDistribution.map(({ star, count, percentage }) => (
              <div key={star} className="flex items-center gap-3">
                <span className="font-bold w-8">{star}</span>
                <FaStar className="text-warning" />
                <div className="flex-1 bg-base-300 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-warning h-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-base-content/70 w-12 text-right">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Write Review Form */}
      {isWritingReview && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card bg-base-100 shadow-xl border-2 border-primary"
        >
          <div className="card-body">
            <h3 className="card-title text-xl font-bold mb-4">
              Write Your Review
            </h3>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              {/* Rating Selection */}
              <div>
                <label className="label">
                  <span className="label-text font-bold">Your Rating *</span>
                </label>
                <StarRating
                  rating={rating}
                  size="text-3xl"
                  interactive={true}
                  onRate={setRating}
                />
              </div>

              {/* Review Text */}
              <div>
                <label className="label">
                  <span className="label-text font-bold">Your Review *</span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full h-32"
                  placeholder="Share your experience... (minimum 10 characters)"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  required
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setIsWritingReview(false);
                    setReviewText("");
                    setRating(0);
                  }}
                  className="btn btn-ghost"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={
                    isSubmitting ||
                    rating === 0 ||
                    reviewText.trim().length < 10
                  }
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Submitting...
                    </>
                  ) : (
                    "Submit Review"
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold mb-2">No reviews yet</h3>
            <p className="text-base-content/70">
              Be the first to share your experience!
            </p>
          </div>
        ) : (
          reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card bg-base-100 shadow-lg border-2 border-base-200"
            >
              <div className="card-body p-6">
                <div className="flex items-start gap-4">
                  {/* User Avatar */}
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full">
                      {review.userPhoto ? (
                        <img src={review.userPhoto} alt={review.userName} />
                      ) : (
                        <FaUserCircle className="w-full h-full text-base-content/30" />
                      )}
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                      <div>
                        <h4 className="font-bold text-lg">{review.userName}</h4>
                        <p className="text-sm text-base-content/70">
                          {new Date(review.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="text-base-content/80 leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;
