import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "react-router";
import api from "../../utils/api";
import {
  FaBuilding,
  FaUsers,
  FaDollarSign,
  FaCalendar,
  FaEye,
} from "react-icons/fa";

const MyClubs = () => {
  // Fetch user's memberships
  const { data: memberships, isLoading } = useQuery({
    queryKey: ["myMemberships"],
    queryFn: async () => {
      const response = await api.get("/memberships/my-memberships");
      return response.data;
    },
  });

  // Fetch club details for each membership
  const { data: clubs } = useQuery({
    queryKey: ["myClubsDetails", memberships],
    queryFn: async () => {
      if (!memberships || memberships.length === 0) return [];

      const clubPromises = memberships.map((membership) =>
        api.get(`/clubs/${membership.clubId}`).then((res) => res.data)
      );
      return Promise.all(clubPromises);
    },
    enabled: !!memberships && memberships.length > 0,
  });

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

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-black mb-2">
          My <span className="text-gradient">Clubs</span>
        </h1>
        <p className="text-lg text-gray-600 font-medium">
          Clubs you're a member of
        </p>
      </motion.div>

      {/* Stats Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-white shadow-xl border-2 border-base-200 mb-8"
      >
        <div className="card-body">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-4 rounded-xl">
              <FaBuilding className="text-4xl text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">
                Total Clubs Joined
              </p>
              <p className="text-4xl font-black">{clubs?.length || 0}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Clubs Grid */}
      {clubs && clubs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club, index) => (
            <motion.div
              key={club._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
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
                <div className="badge badge-primary font-bold mb-2">
                  {club.category}
                </div>
                <h2 className="card-title text-xl font-black">
                  {club.clubName}
                </h2>
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
                      {club.membershipFee > 0
                        ? `$${club.membershipFee}`
                        : "Free"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCalendar className="text-secondary" />
                    <span className="font-semibold">
                      Joined{" "}
                      {new Date(
                        memberships.find((m) => m.clubId === club._id)?.joinedAt
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="card-actions mt-4">
                  <Link
                    to={`/clubs/${club._id}`}
                    className="btn btn-primary btn-sm w-full font-bold"
                  >
                    <FaEye />
                    View Club
                  </Link>
                </div>
              </div>
            </motion.div>
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
              You haven't joined any clubs. Start exploring!
            </p>
            <Link to="/clubs" className="btn btn-primary font-bold">
              Browse Clubs
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MyClubs;
