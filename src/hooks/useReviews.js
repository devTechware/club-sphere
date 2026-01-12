import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../utils/api";

// Get reviews for an item
export const useReviews = (itemType, itemId) => {
  return useQuery({
    queryKey: ["reviews", itemType, itemId],
    queryFn: async () => {
      const response = await api.get(`/reviews/${itemType}/${itemId}`);
      return response.data;
    },
    enabled: !!itemType && !!itemId,
  });
};

// Add a review
export const useAddReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reviewData) => {
      const response = await api.post("/reviews", reviewData);
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Invalidate reviews query to refetch
      queryClient.invalidateQueries([
        "reviews",
        variables.itemType,
        variables.itemId,
      ]);
    },
  });
};

// Update a review
export const useUpdateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ reviewId, ...data }) => {
      const response = await api.patch(`/reviews/${reviewId}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
    },
  });
};

// Delete a review
export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reviewId) => {
      const response = await api.delete(`/reviews/${reviewId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
    },
  });
};