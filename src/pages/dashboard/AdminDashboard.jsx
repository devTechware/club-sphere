import { motion } from "framer-motion";
import { useAdminStats } from "../../hooks/useDashboard";
import { Link } from "react-router";
import {
  FaUsers,
  FaBuilding,
  FaCalendar,
  FaDollarSign,
  FaClock,
  FaChartLine,
  FaTrophy,
  FaArrowRight,
} from "react-icons/fa";

const AdminDashboard = () => {
  const { data: stats, isLoading } = useAdminStats();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 font-semibold">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const statCards = [
    {
      title: "Total Users",
      value: stats?.users?.total || 0,
      change: `+${stats?.users?.recent || 0} this month`,
      icon: <FaUsers className="text-4xl" />,
      gradient: "from-primary to-secondary",
      bgColor: "bg-primary/10",
      link: "/dashboard/admin/users",
    },
    {
      title: "Total Clubs",
      value: stats?.clubs?.total || 0,
      change: `${stats?.clubs?.approved || 0} approved`,
      icon: <FaBuilding className="text-4xl" />,
      gradient: "from-secondary to-accent",
      bgColor: "bg-secondary/10",
      link: "/dashboard/admin/clubs",
    },
    {
      title: "Pending Approval",
      value: stats?.clubs?.pending || 0,
      change: "Clubs awaiting review",
      icon: <FaClock className="text-4xl" />,
      gradient: "from-accent to-warning",
      bgColor: "bg-accent/10",
      link: "/dashboard/admin/clubs",
    },
    {
      title: "Total Revenue",
      value: `$${stats?.payments?.revenue?.toFixed(2) || 0}`,
      change: `${stats?.payments?.total || 0} transactions`,
      icon: <FaDollarSign className="text-4xl" />,
      gradient: "from-success to-info",
      bgColor: "bg-success/10",
      link: "/dashboard/admin/payments",
    },
  ];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-black mb-2">
          Admin <span className="text-gradient">Dashboard</span>
        </h1>
        <p className="text-lg text-gray-600 font-medium">
          Overview of platform statistics and performance
        </p>
      </motion.div>

      {/* Main Stats Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {statCards.map((card, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <Link to={card.link}>
              <div className="card bg-white shadow-xl border-2 border-base-200 hover:border-primary transition-all cursor-pointer h-full">
                <div className="card-body">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-4 rounded-2xl ${card.bgColor}`}>
                      <div
                        className={`bg-gradient-to-br ${card.gradient} bg-clip-text text-transparent`}
                      >
                        {card.icon}
                      </div>
                    </div>
                    <FaArrowRight className="text-gray-400" />
                  </div>
                  <h2 className="card-title text-sm font-bold text-gray-600 mb-2">
                    {card.title}
                  </h2>
                  <p className="text-4xl font-black mb-2">{card.value}</p>
                  <p className="text-sm text-gray-500 font-medium">
                    {card.change}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Secondary Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Memberships & Events */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="card bg-white shadow-xl border-2 border-base-200"
        >
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold mb-6 flex items-center gap-2">
              <FaChartLine className="text-primary" />
              Activity Overview
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-primary/10 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="bg-primary text-white p-3 rounded-lg">
                    <FaUsers className="text-xl" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">
                      Total Memberships
                    </p>
                    <p className="text-2xl font-black text-primary">
                      {stats?.memberships?.total || 0}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-success">
                    {stats?.memberships?.active || 0} active
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-secondary/10 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="bg-secondary text-white p-3 rounded-lg">
                    <FaCalendar className="text-xl" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">
                      Total Events
                    </p>
                    <p className="text-2xl font-black text-secondary">
                      {stats?.events?.total || 0}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-info">All time</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Revenue Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="card bg-white shadow-xl border-2 border-base-200"
        >
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold mb-6 flex items-center gap-2">
              <FaTrophy className="text-accent" />
              Revenue Breakdown
            </h2>
            {stats?.payments?.byType && stats.payments.byType.length > 0 ? (
              <div className="space-y-4">
                {stats.payments.byType.map((type, index) => (
                  <div
                    key={type._id}
                    className={`flex justify-between items-center p-4 rounded-xl ${
                      index % 2 === 0 ? "bg-accent/10" : "bg-success/10"
                    }`}
                  >
                    <div>
                      <p className="font-bold text-lg capitalize mb-1">
                        {type._id}
                      </p>
                      <p className="text-sm text-gray-600 font-medium">
                        {type.count} payment{type.count !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-primary">
                        ${type.revenue?.toFixed(2) || 0}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <FaDollarSign className="text-6xl text-gray-300 mb-4" />
                <p className="text-center text-gray-500 font-medium">
                  No payment data yet
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card bg-gradient-to-r from-primary to-secondary shadow-xl"
      >
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/dashboard/admin/clubs"
              className="btn btn-lg bg-white text-primary hover:bg-white/90 font-bold"
            >
              Approve Clubs
            </Link>
            <Link
              to="/dashboard/admin/users"
              className="btn btn-lg bg-white text-primary hover:bg-white/90 font-bold"
            >
              Manage Users
            </Link>
            <Link
              to="/dashboard/admin/payments"
              className="btn btn-lg bg-white text-primary hover:bg-white/90 font-bold"
            >
              View Payments
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;