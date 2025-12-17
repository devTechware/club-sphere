import { motion } from "framer-motion";
import { useManagerStats } from "../../hooks/useDashboard";
import { FaBuilding, FaUsers, FaCalendar, FaDollarSign } from "react-icons/fa";

const ManagerDashboard = () => {
  const { data: stats, isLoading } = useManagerStats();

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
        Manager Dashboard
      </motion.h1>

      {/* Main Stats */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <motion.div
          variants={itemVariants}
          className="stat bg-primary text-primary-content rounded-lg shadow-lg"
        >
          <div className="stat-figure text-4xl opacity-50">
            <FaBuilding />
          </div>
          <div className="stat-title text-primary-content opacity-80">
            My Clubs
          </div>
          <div className="stat-value">{stats?.clubs?.total || 0}</div>
          <div className="stat-desc text-primary-content opacity-70">
            {stats?.clubs?.approved || 0} approved
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="stat bg-secondary text-secondary-content rounded-lg shadow-lg"
        >
          <div className="stat-figure text-4xl opacity-50">
            <FaUsers />
          </div>
          <div className="stat-title text-secondary-content opacity-80">
            Total Members
          </div>
          <div className="stat-value">{stats?.members?.total || 0}</div>
          <div className="stat-desc text-secondary-content opacity-70">
            Across all clubs
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="stat bg-accent text-accent-content rounded-lg shadow-lg"
        >
          <div className="stat-figure text-4xl opacity-50">
            <FaCalendar />
          </div>
          <div className="stat-title text-accent-content opacity-80">
            Total Events
          </div>
          <div className="stat-value">{stats?.events?.total || 0}</div>
          <div className="stat-desc text-accent-content opacity-70">
            {stats?.events?.upcoming || 0} upcoming
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="stat bg-success text-success-content rounded-lg shadow-lg"
        >
          <div className="stat-figure text-4xl opacity-50">
            <FaDollarSign />
          </div>
          <div className="stat-title text-success-content opacity-80">
            Total Revenue
          </div>
          <div className="stat-value">
            ${stats?.revenue?.total?.toFixed(2) || 0}
          </div>
          <div className="stat-desc text-success-content opacity-70">
            {stats?.revenue?.payments || 0} payments
          </div>
        </motion.div>
      </motion.div>

      {/* Club Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card bg-base-200 shadow-xl"
      >
        <div className="card-body">
          <h2 className="card-title mb-4">Your Clubs</h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Club Name</th>
                  <th>Members</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {stats?.members?.byClub?.map((club) => (
                  <tr key={club.clubId}>
                    <td className="font-semibold">{club.clubName}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <FaUsers className="text-primary" />
                        {club.memberCount}
                      </div>
                    </td>
                    <td>
                      <div className="badge badge-success">Active</div>
                    </td>
                  </tr>
                ))}
                {(!stats?.members?.byClub ||
                  stats?.members?.byClub?.length === 0) && (
                  <tr>
                    <td colSpan="3" className="text-center text-gray-500">
                      No clubs yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ManagerDashboard;
