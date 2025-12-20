import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "react-router";
import api from "../../../utils/api";
import useAuth from "../../../hooks/useAuth";
import {
  FaBuilding,
  FaUsers,
  FaDollarSign,
  FaCalendar,
  FaEye,
  FaEdit,
  FaPlus,
  FaClock,
} from "react-icons/fa";

const MyClubs = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch clubs managed by current user
  const { data: clubs, isLoading } = useQuery({
    queryKey: ["managerClubs"],
    queryFn: async () => {
      const response = await api.get("/clubs");
      // Filter clubs managed by this user
      return response.data.filter((club) => club.managerEmail === user?.email);
    },
  });

  const approvedClubs = clubs?.filter((c) => c.status === "approved") || [];
  const pendingClubs = clubs?.filter((c) => c.status === "pending") || [];
  const rejectedClubs = clubs?.filter((c) => c.status === "rejected") || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 font-semibold">Loading your clubs...</p>
        </div>
      </div>
    );
  }

  const ClubCard = ({ club }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="card bg-white shadow-xl border-2 border-base-200 hover:border-primary transition-all"
    >
      <figure className="h-48 overflow-hidden">
        <img
          src={
            club.bannerImage ||
            `https://source.unsplash.com/800x600/?${club.category}`
          }
          alt={club.clubName}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body">
        <div className="flex gap-2 mb-2">
          <div className="badge badge-primary font-bold">{club.category}</div>
          {club.status === "approved" && (
            <div className="badge badge-success font-bold">Approved</div>
          )}
          {club.status === "pending" && (
            <div className="badge badge-warning font-bold">Pending</div>
          )}
          {club.status === "rejected" && (
            <div className="badge badge-error font-bold">Rejected</div>
          )}
        </div>

        <h2 className="card-title text-xl font-black">{club.clubName}</h2>
        <p className="text-gray-600 line-clamp-2">{club.description}</p>

        <div className="divider my-2"></div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <FaUsers className="text-primary" />
            <span className="font-semibold">
              {club.memberCount || 0} Members
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaDollarSign className="text-success" />
            <span className="font-semibold">
              {club.membershipFee > 0 ? `$${club.membershipFee}` : "Free"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaCalendar className="text-secondary" />
            <span className="font-semibold">
              Created {new Date(club.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="card-actions mt-4 gap-2">
          <Link
            to={`/clubs/${club._id}`}
            className="btn btn-primary btn-sm flex-1 font-bold"
          >
            <FaEye />
            View
          </Link>
          <button className="btn btn-secondary btn-sm flex-1 font-bold">
            <FaEdit />
            Edit
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl md:text-5xl font-black mb-2">
              My <span className="text-gradient">Clubs</span>
            </h1>
            <p className="text-lg text-gray-600 font-medium">
              Clubs you manage
            </p>
          </div>
          <button className="btn btn-primary font-bold gap-2">
            <FaPlus />
            Create Club
          </button>
        </div>
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
                <p className="text-3xl font-black">{clubs?.length || 0}</p>
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
                <FaBuilding className="text-3xl text-success" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Approved</p>
                <p className="text-3xl font-black">{approvedClubs.length}</p>
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
                <p className="text-3xl font-black">{pendingClubs.length}</p>
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
                <FaBuilding className="text-3xl text-error" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Rejected</p>
                <p className="text-3xl font-black">{rejectedClubs.length}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Clubs Grid */}
      {clubs && clubs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club) => (
            <ClubCard key={club._id} club={club} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card bg-white shadow-xl border-2 border-base-200"
        >
          <div className="card-body text-center py-12">
            <FaBuilding className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">No Clubs Yet</h3>
            <p className="text-gray-600 mb-6">
              You haven't created any clubs. Start by creating your first club!
            </p>
            <button className="btn btn-primary font-bold">
              <FaPlus />
              Create Your First Club
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MyClubs;
