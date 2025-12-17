import { motion } from "framer-motion";
import { useAdminStats } from "../../hooks/useDashboard";
import {
  FaUsers,
  FaBuilding,
  FaCalendar,
  FaDollarSign,
  FaClock,
} from "react-icons/fa";

const AdminDashboard = () => {
  const { data: stats, isLoading } = useAdminStats();

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
        Admin Dashboard
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
            <FaUsers />
          </div>
          <div className="stat-title text-primary-content opacity-80">
            Total Users
          </div>
          <div className="stat-value">{stats?.users?.total || 0}</div>
          <div className="stat-desc text-primary-content opacity-70">
            +{stats?.users?.recent || 0} this month
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="stat bg-secondary text-secondary-content rounded-lg shadow-lg"
        >
          <div className="stat-figure text-4xl opacity-50">
            <FaBuilding />
          </div>
          <div className="stat-title text-secondary-content opacity-80">
            Total Clubs
          </div>
          <div className="stat-value">{stats?.clubs?.total || 0}</div>
          <div className="stat-desc text-secondary-content opacity-70">
            {stats?.clubs?.approved || 0} approved
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="stat bg-accent text-accent-content rounded-lg shadow-lg"
        >
          <div className="stat-figure text-4xl opacity-50">
            <FaClock />
          </div>
          <div className="stat-title text-accent-content opacity-80">
            Pending Approval
          </div>
          <div className="stat-value">{stats?.clubs?.pending || 0}</div>
          <div className="stat-desc text-accent-content opacity-70">
            Clubs awaiting review
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
            ${stats?.payments?.revenue?.toFixed(2) || 0}
          </div>
          <div className="stat-desc text-success-content opacity-70">
            {stats?.payments?.total || 0} transactions
          </div>
        </motion.div>
      </motion.div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Memberships & Events */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="card bg-base-200 shadow-xl"
        >
          <div className="card-body">
            <h2 className="card-title">Memberships & Events</h2>
            <div className="stats stats-vertical shadow">
              <div className="stat">
                <div className="stat-title">Total Memberships</div>
                <div className="stat-value text-primary">
                  {stats?.memberships?.total || 0}
                </div>
                <div className="stat-desc">
                  {stats?.memberships?.active || 0} active
                </div>
              </div>
              <div className="stat">
                <div className="stat-title">Total Events</div>
                <div className="stat-value text-secondary">
                  {stats?.events?.total || 0}
                </div>
                <div className="stat-desc">All time events</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Revenue Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="card bg-base-200 shadow-xl"
        >
          <div className="card-body">
            <h2 className="card-title">Revenue Breakdown</h2>
            <div className="space-y-4">
              {stats?.payments?.byType?.map((type) => (
                <div
                  key={type._id}
                  className="flex justify-between items-center"
                >
                  <div>
                    <div className="font-semibold capitalize">{type._id}</div>
                    <div className="text-sm text-gray-500">
                      {type.count} payments
                    </div>
                  </div>
                  <div className="text-xl font-bold">
                    ${type.revenue?.toFixed(2) || 0}
                  </div>
                </div>
              ))}
              {(!stats?.payments?.byType ||
                stats?.payments?.byType?.length === 0) && (
                <p className="text-center text-gray-500">No payment data yet</p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
