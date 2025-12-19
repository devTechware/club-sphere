import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

export const useAdminStats = () => {
  return useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const response = await api.get("/stats/admin");
      return response.data;
    },
  });
};

export const useManagerStats = () => {
  return useQuery({
    queryKey: ["managerStats"],
    queryFn: async () => {
      const response = await api.get("/stats/manager");
      return response.data;
    },
  });
};

export const useMemberStats = () => {
  return useQuery({
    queryKey: ["memberStats"],
    queryFn: async () => {
      const response = await api.get("/stats/member");
      return response.data;
    },
  });
};