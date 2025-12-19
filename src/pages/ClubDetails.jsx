import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import { useClubDetails } from "../hooks/useClubs";
import {
  FaUsers,
  FaMapMarkerAlt,
  FaDollarSign,
  FaCalendar,
  FaArrowLeft,
  FaCheckCircle,
} from "react-icons/fa";

const ClubDetails = () => {
  const { id } = useParams();
  const { data: club, isLoading, isError } = useClubDetails(id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 font-semibold">Loading club details...</p>
        </div>
      </div>
    );
  }

  if (isError || !club) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error shadow-lg">
          <span>Club not found</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Link to="/clubs" className="btn btn-ghost gap-2">
          <FaArrowLeft />
          Back to Clubs
        </Link>
      </div>

      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-96 overflow-hidden"
      >
        <img
          src={
            club.bannerImage ||
            `https://source.unsplash.com/1600x900/?${club.category},club`
          }
          alt={club.clubName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="badge badge-primary badge-lg mb-4 font-bold">
              {club.category}
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
              {club.clubName}
            </h1>
            <div className="flex flex-wrap gap-4 text-white">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <FaUsers />
                <span className="font-semibold">
                  {club.memberCount || 0} Members
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <FaMapMarkerAlt />
                <span className="font-semibold">{club.location}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl p-8 border-2 border-base-200"
            >
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-primary rounded"></span>
                About This Club
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap mb-8">
                {club.description}
              </p>

              <div className="divider"></div>

              <h3 className="text-2xl font-bold mb-6">Club Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 bg-base-200 p-4 rounded-xl">
                  <div className="bg-primary text-white p-3 rounded-lg">
                    <FaMapMarkerAlt className="text-xl" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-600">Location</p>
                    <p className="font-semibold text-lg">{club.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-base-200 p-4 rounded-xl">
                  <div className="bg-secondary text-white p-3 rounded-lg">
                    <FaUsers className="text-xl" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-600">Members</p>
                    <p className="font-semibold text-lg">
                      {club.memberCount || 0} Active
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-base-200 p-4 rounded-xl">
                  <div className="bg-accent text-neutral p-3 rounded-lg">
                    <FaDollarSign className="text-xl" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-600">
                      Membership Fee
                    </p>
                    <p className="font-semibold text-lg">
                      {club.membershipFee > 0
                        ? `$${club.membershipFee}`
                        : "Free to Join"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-base-200 p-4 rounded-xl">
                  <div className="bg-info text-white p-3 rounded-lg">
                    <FaCalendar className="text-xl" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-600">
                      Established
                    </p>
                    <p className="font-semibold text-lg">
                      {new Date(club.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-xl p-8 sticky top-24 border-2 border-base-200"
            >
              <h3 className="text-2xl font-bold mb-6">Join This Club</h3>

              {club.membershipFee > 0 && (
                <div className="bg-primary/10 border-2 border-primary rounded-xl p-6 mb-6">
                  <div className="text-center">
                    <p className="text-sm font-semibold text-gray-600 mb-2">
                      Membership Fee
                    </p>
                    <div className="text-4xl font-black text-primary">
                      ${club.membershipFee}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      One-time payment
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <FaCheckCircle className="text-success text-lg" />
                  <span>Access to exclusive events</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <FaCheckCircle className="text-success text-lg" />
                  <span>Connect with members</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <FaCheckCircle className="text-success text-lg" />
                  <span>Participate in activities</span>
                </div>
              </div>

              <Link
                to="/login"
                className="btn btn-primary w-full btn-lg font-bold"
              >
                Join Now
              </Link>

              <div className="divider">OR</div>

              <Link to="/clubs" className="btn btn-outline w-full font-bold">
                Browse More Clubs
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubDetails;
