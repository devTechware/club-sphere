import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

export const useClubs = (search = "", category = "all", sort = "newest") => {
  return useQuery({
    queryKey: ["clubs", search, category, sort],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (category && category !== "all") params.append("category", category);
      if (sort) params.append("sort", sort);

      const response = await api.get(`/clubs?${params.toString()}`);
      return response.data;
    },
  });
};

export const useClubDetails = (id) => {
  return useQuery({
    queryKey: ["club", id],
    queryFn: async () => {
      const response = await api.get(`/clubs/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useFeaturedClubs = () => {
  return useQuery({
    queryKey: ["featuredClubs"],
    queryFn: async () => {
      const response = await api.get("/stats/featured-clubs");
      return response.data;
    },
  });
};