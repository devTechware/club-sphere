import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import { useClubDetails } from "../hooks/useClubs";
import { FaUsers, FaMapMarkerAlt, FaDollarSign, FaCalendar } from "react-icons/fa";

const ClubDetails = () => {
  const { id } = useParams();
  const { data: club, isLoading, isError } = useClubDetails(id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError || !club) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">
          <span>Club not found</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto"
      >
        {/* Banner Image */}
        <div className="h-80 rounded-lg overflow-hidden mb-8">
          <img
            src={club.bannerImage || "https://via.placeholder.com/1200x400"}
            alt={club.clubName}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold mb-4">{club.clubName}</h1>
            
            <div className="badge badge-primary badge-lg mb-4">
              {club.category}
            </div>

            <p className="text-lg text-gray-700 mb-6 whitespace-pre-wrap">
              {club.description}
            </p>

            <div className="divider"></div>

            <h2 className="text-2xl font-bold mb-4">About This Club</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-primary" />
                <span>{club.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaUsers className="text-primary" />
                <span>{club.memberCount || 0} members</span>
              </div>
              <div className="flex items-center gap-3">
                <FaDollarSign className="text-primary" />
                <span>
                  {club.membershipFee > 0
                    ? `$${club.membershipFee} membership fee`
                    : "Free to join"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FaCalendar className="text-primary" />
                <span>
                  Created {new Date(club.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card bg-base-200 shadow-xl sticky top-4">
              <div className="card-body">
                <h3 className="card-title">Join This Club</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Become a member and connect with others who share your
                  interests.
                </p>

                {club.membershipFee > 0 && (
                  <div className="alert alert-info">
                    <div>
                      <div className="text-lg font-bold">
                        ${club.membershipFee}
                      </div>
                      <div className="text-xs">One-time membership fee</div>
                    </div>
                  </div>
                )}

                <Link to="/login" className="btn btn-primary w-full">
                  Join Now
                </Link>

                <div className="divider">OR</div>

                <Link to="/clubs" className="btn btn-outline w-full">
                  Browse More Clubs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ClubDetails;