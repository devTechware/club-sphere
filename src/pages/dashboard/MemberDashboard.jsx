import { motion } from "framer-motion";
import { useMemberStats } from "../../hooks/useDashboard";
import { FaBuilding, FaCalendar, FaDollarSign } from "react-icons/fa";
import { Link } from "react-router";

const MemberDashboard = () => {
  const { data: stats, isLoading } = useMemberStats();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-8"
      >
        Member Dashboard
      </motion.h1>

      {/* Main Stats */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        <motion.div
          variants={itemVariants}
          className="stat bg-primary text-primary-content rounded-lg shadow-lg"
        >
          <div className="stat-figure text-4xl opacity-50">
            <FaBuilding />
          </div>
          <div className="stat-title text-primary-content opacity-80">
            Clubs Joined
          </div>
          <div className="stat-value">{stats?.clubs?.joined || 0}</div>
          <div className="stat-desc text-primary-content opacity-70">
            Active memberships
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="stat bg-secondary text-secondary-content rounded-lg shadow-lg"
        >
          <div className="stat-figure text-4xl opacity-50">
            <FaCalendar />
          </div>
          <div className="stat-title text-secondary-content opacity-80">
            Events Registered
          </div>
          <div className="stat-value">{stats?.events?.registered || 0}</div>
          <div className="stat-desc text-secondary-content opacity-70">
            Upcoming events
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="stat bg-accent text-accent-content rounded-lg shadow-lg"
        >
          <div className="stat-figure text-4xl opacity-50">
            <FaDollarSign />
          </div>
          <div className="stat-title text-accent-content opacity-80">
            Total Spent
          </div>
          <div className="stat-value">
            ${stats?.payments?.totalSpent?.toFixed(2) || 0}
          </div>
          <div className="stat-desc text-accent-content opacity-70">
            {stats?.payments?.totalPayments || 0} payments
          </div>
        </motion.div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Quick Actions</h2>
            <div className="space-y-3">
              <Link to="/clubs" className="btn btn-primary w-full">
                Browse Clubs
              </Link>
              <Link to="/events" className="btn btn-secondary w-full">
                View Events
              </Link>
            </div>
          </div>
        </div>

        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Your Activity</h2>
            <div className="space-y-2">
              <p className="text-sm">
                You're currently a member of{" "}
                <span className="font-bold">{stats?.clubs?.joined || 0}</span>{" "}
                club
                {stats?.clubs?.joined !== 1 ? "s" : ""}.
              </p>
              <p className="text-sm">
                You have{" "}
                <span className="font-bold">
                  {stats?.events?.registered || 0}
                </span>{" "}
                upcoming event{stats?.events?.registered !== 1 ? "s" : ""}.
              </p>
              {stats?.payments?.totalSpent > 0 && (
                <p className="text-sm">
                  Total invested in memberships and events:{" "}
                  <span className="font-bold">
                    ${stats?.payments?.totalSpent?.toFixed(2)}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MemberDashboard;
