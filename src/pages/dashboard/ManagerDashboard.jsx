import { motion } from "framer-motion";
import { useManagerStats } from "../../hooks/useDashboard";
import {
  FaBuilding,
  FaUsers,
  FaCalendar,
  FaDollarSign,
  FaChartBar,
  FaTrophy,
} from "react-icons/fa";

const ManagerDashboard = () => {
  const { data: stats, isLoading } = useManagerStats();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-secondary"></span>
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
      title: "My Clubs",
      value: stats?.clubs?.total || 0,
      change: `${stats?.clubs?.approved || 0} approved`,
      icon: <FaBuilding className="text-4xl" />,
      gradient: "from-primary to-secondary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Total Members",
      value: stats?.members?.total || 0,
      change: "Across all clubs",
      icon: <FaUsers className="text-4xl" />,
      gradient: "from-secondary to-accent",
      bgColor: "bg-secondary/10",
    },
    {
      title: "Total Events",
      value: stats?.events?.total || 0,
      change: `${stats?.events?.upcoming || 0} upcoming`,
      icon: <FaCalendar className="text-4xl" />,
      gradient: "from-accent to-warning",
      bgColor: "bg-accent/10",
    },
    {
      title: "Total Revenue",
      value: `$${stats?.revenue?.total?.toFixed(2) || 0}`,
      change: `${stats?.revenue?.payments || 0} payments`,
      icon: <FaDollarSign className="text-4xl" />,
      gradient: "from-success to-info",
      bgColor: "bg-success/10",
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
          Manager <span className="text-gradient">Dashboard</span>
        </h1>
        <p className="text-lg text-gray-600 font-medium">
          Manage your clubs and track performance
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
            className="card bg-white shadow-xl border-2 border-base-200 hover:border-secondary transition-all"
          >
            <div className="card-body">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-4 rounded-2xl ${card.bgColor}`}>
                  <div
                    className={`bg-gradient-to-br ${card.gradient} bg-clip-text text-transparent`}
                  >
                    {card.icon}
                  </div>
                </div>
              </div>
              <h2 className="card-title text-sm font-bold text-gray-600 mb-2">
                {card.title}
              </h2>
              <p className="text-4xl font-black mb-2">{card.value}</p>
              <p className="text-sm text-gray-500 font-medium">{card.change}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Club Details Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card bg-white shadow-xl border-2 border-base-200 mb-8"
      >
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-6 flex items-center gap-2">
            <FaChartBar className="text-secondary" />
            Your Clubs Performance
          </h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="bg-base-200">
                  <th className="font-bold text-base">Club Name</th>
                  <th className="font-bold text-base">Members</th>
                  <th className="font-bold text-base">Status</th>
                </tr>
              </thead>
              <tbody>
                {stats?.members?.byClub && stats.members.byClub.length > 0 ? (
                  stats.members.byClub.map((club, index) => (
                    <tr key={club.clubId} className="hover:bg-base-200">
                      <td className="font-semibold">{club.clubName}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="bg-secondary/10 p-2 rounded-lg">
                            <FaUsers className="text-secondary" />
                          </div>
                          <span className="font-bold">{club.memberCount}</span>
                        </div>
                      </td>
                      <td>
                        <div className="badge badge-success badge-lg font-bold">
                          Active
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-12">
                      <FaBuilding className="text-6xl text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 font-medium">No clubs yet</p>
                      <p className="text-sm text-gray-400">
                        Create your first club to get started
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card bg-gradient-to-r from-secondary to-accent shadow-xl"
      >
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <FaTrophy />
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="btn btn-lg bg-white text-secondary hover:bg-white/90 font-bold">
              Create New Club
            </button>
            <button className="btn btn-lg bg-white text-secondary hover:bg-white/90 font-bold">
              Create Event
            </button>
            <button className="btn btn-lg bg-white text-secondary hover:bg-white/90 font-bold">
              View Members
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ManagerDashboard;
