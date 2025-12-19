import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import api from "../../utils/api";
import toast from "react-hot-toast";
import {
  FaBuilding,
  FaCheck,
  FaTimes,
  FaClock,
  FaSearch,
  FaEye,
  FaUsers,
  FaDollarSign,
} from "react-icons/fa";

const ManageClubs = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const queryClient = useQueryClient();

  // Fetch all clubs
  const { data: clubs, isLoading } = useQuery({
    queryKey: ["allClubs"],
    queryFn: async () => {
      const response = await api.get("/clubs/admin/all");
      return response.data;
    },
  });

  // Update club status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const response = await api.patch(`/clubs/admin/${id}/status`, { status });
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["allClubs"]);
      toast.success(`Club ${data.status}!`, {
        icon: data.status === "approved" ? "✅" : "❌",
        style: {
          borderRadius: "12px",
          background: "#4ecdc4",
          color: "#fff",
          fontWeight: "600",
        },
      });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to update club status"
      );
    },
  });

  // Filter clubs
  const filteredClubs = clubs?.filter((club) => {
    const matchesSearch =
      club.clubName.toLowerCase().includes(search.toLowerCase()) ||
      club.location.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || club.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = (id, status) => {
    const action = status === "approved" ? "approve" : "reject";
    if (window.confirm(`Are you sure you want to ${action} this club?`)) {
      updateStatusMutation.mutate({ id, status });
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      approved: { color: "badge-success", icon: <FaCheck /> },
      pending: { color: "badge-warning", icon: <FaClock /> },
      rejected: { color: "badge-error", icon: <FaTimes /> },
    };
    return badges[status] || badges.pending;
  };

  const getStatusStats = () => {
    if (!clubs) return { approved: 0, pending: 0, rejected: 0, total: 0 };
    return {
      approved: clubs.filter((c) => c.status === "approved").length,
      pending: clubs.filter((c) => c.status === "pending").length,
      rejected: clubs.filter((c) => c.status === "rejected").length,
      total: clubs.length,
    };
  };

  const stats = getStatusStats();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-black mb-2">
          Manage <span className="text-gradient">Clubs</span>
        </h1>
        <p className="text-lg text-gray-600 font-medium">
          Review and approve club applications
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card bg-white shadow-xl border-2 border-base-200"
        >
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-4 rounded-xl">
                <FaBuilding className="text-3xl text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">
                  Total Clubs
                </p>
                <p className="text-3xl font-black">{stats.total}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card bg-white shadow-xl border-2 border-base-200"
        >
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="bg-success/10 p-4 rounded-xl">
                <FaCheck className="text-3xl text-success" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Approved</p>
                <p className="text-3xl font-black">{stats.approved}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card bg-white shadow-xl border-2 border-base-200"
        >
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="bg-warning/10 p-4 rounded-xl">
                <FaClock className="text-3xl text-warning" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Pending</p>
                <p className="text-3xl font-black">{stats.pending}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card bg-white shadow-xl border-2 border-base-200"
        >
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="bg-error/10 p-4 rounded-xl">
                <FaTimes className="text-3xl text-error" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Rejected</p>
                <p className="text-3xl font-black">{stats.rejected}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card bg-white shadow-xl border-2 border-base-200 mb-8"
      >
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-base">
                  Search Clubs
                </span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name or location..."
                  className="input input-bordered w-full pr-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <FaSearch className="absolute right-4 top-4 text-gray-400" />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-base">
                  Filter by Status
                </span>
              </label>
              <select
                className="select select-bordered w-full"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Clubs Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card bg-white shadow-xl border-2 border-base-200"
      >
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-4">
            All Clubs ({filteredClubs?.length || 0})
          </h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="bg-base-200">
                  <th className="font-bold text-base">Club</th>
                  <th className="font-bold text-base">Category</th>
                  <th className="font-bold text-base">Manager</th>
                  <th className="font-bold text-base">Fee</th>
                  <th className="font-bold text-base">Status</th>
                  <th className="font-bold text-base">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClubs?.map((club) => {
                  const badge = getStatusBadge(club.status);
                  return (
                    <tr key={club._id} className="hover:bg-base-200">
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="w-12 h-12 rounded-lg">
                              <img
                                src={
                                  club.bannerImage ||
                                  "https://via.placeholder.com/150"
                                }
                                alt={club.clubName}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{club.clubName}</div>
                            <div className="text-sm text-gray-500">
                              {club.location}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="badge badge-outline">
                          {club.category}
                        </div>
                      </td>
                      <td className="font-semibold">{club.managerEmail}</td>
                      <td>
                        <div className="flex items-center gap-1">
                          <FaDollarSign className="text-success" />
                          <span className="font-bold">
                            {club.membershipFee > 0
                              ? club.membershipFee
                              : "Free"}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div
                          className={`badge ${badge.color} badge-lg font-bold gap-2`}
                        >
                          {badge.icon}
                          {club.status}
                        </div>
                      </td>
                      <td>
                        <div className="flex gap-2">
                          {club.status === "pending" && (
                            <>
                              <button
                                onClick={() =>
                                  handleStatusUpdate(club._id, "approved")
                                }
                                className="btn btn-success btn-sm"
                                title="Approve"
                              >
                                <FaCheck />
                              </button>
                              <button
                                onClick={() =>
                                  handleStatusUpdate(club._id, "rejected")
                                }
                                className="btn btn-error btn-sm"
                                title="Reject"
                              >
                                <FaTimes />
                              </button>
                            </>
                          )}
                          {club.status === "rejected" && (
                            <button
                              onClick={() =>
                                handleStatusUpdate(club._id, "approved")
                              }
                              className="btn btn-success btn-sm"
                              title="Approve"
                            >
                              <FaCheck /> Approve
                            </button>
                          )}
                          <a
                            href={`/clubs/${club._id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-ghost btn-sm"
                            title="View Club"
                          >
                            <FaEye />
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ManageClubs;
