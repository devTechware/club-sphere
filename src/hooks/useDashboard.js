import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

export const useAdminStats = () => {
  return useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const response = await api.get("/stats/admin/overview");
      return response.data;
    },
  });
};

export const useManagerStats = () => {
  return useQuery({
    queryKey: ["managerStats"],
    queryFn: async () => {
      const response = await api.get("/stats/manager/overview");
      return response.data;
    },
  });
};

export const useMemberStats = () => {
  return useQuery({
    queryKey: ["memberStats"],
    queryFn: async () => {
      const response = await api.get("/stats/member/overview");
      return response.data;
    },
  });
};