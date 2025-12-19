import { motion } from "framer-motion";
import { useMemberStats } from "../../hooks/useDashboard";
import {
  FaBuilding,
  FaCalendar,
  FaDollarSign,
  FaRocket,
  FaHeart,
  FaStar,
} from "react-icons/fa";
import { Link } from "react-router";

const MemberDashboard = () => {
  const { data: stats, isLoading } = useMemberStats();

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
      title: "Clubs Joined",
      value: stats?.clubs?.joined || 0,
      change: "Active memberships",
      icon: <FaBuilding className="text-4xl" />,
      gradient: "from-primary to-secondary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Events Registered",
      value: stats?.events?.registered || 0,
      change: "Upcoming events",
      icon: <FaCalendar className="text-4xl" />,
      gradient: "from-secondary to-accent",
      bgColor: "bg-secondary/10",
    },
    {
      title: "Total Spent",
      value: `$${stats?.payments?.totalSpent?.toFixed(2) || 0}`,
      change: `${stats?.payments?.totalPayments || 0} payments`,
      icon: <FaDollarSign className="text-4xl" />,
      gradient: "from-accent to-success",
      bgColor: "bg-accent/10",
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
          My <span className="text-gradient">Dashboard</span>
        </h1>
        <p className="text-lg text-gray-600 font-medium">
          Track your clubs, events, and activities
        </p>
      </motion.div>

      {/* Main Stats Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        {statCards.map((card, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            whileHover={{ y: -5, scale: 1.02 }}
            className="card bg-white shadow-xl border-2 border-base-200 hover:border-primary transition-all"
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Activity Summary */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="card bg-white shadow-xl border-2 border-base-200"
        >
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold mb-6 flex items-center gap-2">
              <FaStar className="text-accent" />
              Your Activity
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-primary/10 rounded-xl">
                <div className="bg-primary text-white p-3 rounded-lg">
                  <FaBuilding className="text-xl" />
                </div>
                <div>
                  <p className="font-bold text-lg mb-1">Club Memberships</p>
                  <p className="text-sm text-gray-600">
                    You're currently a member of{" "}
                    <span className="font-bold text-primary">
                      {stats?.clubs?.joined || 0}
                    </span>{" "}
                    club{stats?.clubs?.joined !== 1 ? "s" : ""}.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-secondary/10 rounded-xl">
                <div className="bg-secondary text-white p-3 rounded-lg">
                  <FaCalendar className="text-xl" />
                </div>
                <div>
                  <p className="font-bold text-lg mb-1">Event Registrations</p>
                  <p className="text-sm text-gray-600">
                    You have{" "}
                    <span className="font-bold text-secondary">
                      {stats?.events?.registered || 0}
                    </span>{" "}
                    upcoming event{stats?.events?.registered !== 1 ? "s" : ""}.
                  </p>
                </div>
              </div>

              {stats?.payments?.totalSpent > 0 && (
                <div className="flex items-start gap-4 p-4 bg-accent/10 rounded-xl">
                  <div className="bg-accent text-neutral p-3 rounded-lg">
                    <FaDollarSign className="text-xl" />
                  </div>
                  <div>
                    <p className="font-bold text-lg mb-1">Investment</p>
                    <p className="text-sm text-gray-600">
                      Total invested in memberships and events:{" "}
                      <span className="font-bold text-accent">
                        ${stats?.payments?.totalSpent?.toFixed(2)}
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="card bg-white shadow-xl border-2 border-base-200"
        >
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold mb-6 flex items-center gap-2">
              <FaRocket className="text-primary" />
              Quick Actions
            </h2>
            <div className="space-y-4">
              <Link
                to="/clubs"
                className="btn btn-primary w-full btn-lg font-bold justify-start gap-3"
              >
                <FaBuilding className="text-xl" />
                Browse Clubs
              </Link>
              <Link
                to="/events"
                className="btn btn-secondary w-full btn-lg font-bold justify-start gap-3"
              >
                <FaCalendar className="text-xl" />
                View Events
              </Link>
              <button className="btn btn-outline w-full btn-lg font-bold justify-start gap-3">
                <FaHeart className="text-xl" />
                My Favorites
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Motivational Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card bg-gradient-to-r from-primary via-secondary to-accent shadow-xl"
      >
        <div className="card-body text-center">
          <h2 className="text-3xl font-black text-white mb-3">
            Ready for More Adventures?
          </h2>
          <p className="text-xl text-white/90 font-medium mb-6">
            Discover new clubs and events that match your interests!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/clubs"
              className="btn btn-lg bg-white text-primary hover:bg-white/90 font-bold"
            >
              Explore Clubs
            </Link>
            <Link
              to="/events"
              className="btn btn-lg btn-outline text-white border-white hover:bg-white hover:text-primary font-bold"
            >
              Find Events
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MemberDashboard;
