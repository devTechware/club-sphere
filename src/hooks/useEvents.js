import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

export const useEvents = (search = "", sort = "eventDate") => {
  return useQuery({
    queryKey: ["events", search, sort],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (sort) params.append("sort", sort);

      const response = await api.get(`/events?${params.toString()}`);
      return response.data;
    },
  });
};

export const useEventDetails = (id) => {
  return useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const response = await api.get(`/events/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useUpcomingEvents = () => {
  return useQuery({
    queryKey: ["upcomingEvents"],
    queryFn: async () => {
      const response = await api.get("/stats/upcoming-events");
      return response.data;
    },
  });
};