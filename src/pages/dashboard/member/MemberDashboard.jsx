import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import api from "../../../utils/api";
import {
  FaTrophy,
  FaCalendar,
  FaDollarSign,
  FaCheckCircle,
  FaStar,
  FaClock,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const MemberDashboard = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["memberStats"],
    queryFn: async () => {
      const response = await api.get("/stats/member");
      return response.data;
    },
  });

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const COLORS = {
    primary: "#ff6b6b",
    secondary: "#4ecdc4",
    accent: "#ffe66d",
    success: "#26de81",
    info: "#3b82f6",
    warning: "#fd9644",
  };

  const PIE_COLORS = [
    COLORS.primary,
    COLORS.secondary,
    COLORS.accent,
    COLORS.info,
  ];

  // Activity by month
  const activityData = [
    { month: "Jan", events: 2, clubs: 1 },
    { month: "Feb", events: 3, clubs: 1 },
    { month: "Mar", events: 4, clubs: 2 },
    { month: "Apr", events: 5, clubs: 2 },
    { month: "May", events: 6, clubs: 3 },
    { month: "Jun", events: 7, clubs: 3 },
  ];

  // Clubs by category
  const clubCategoryData = [
    { name: "Technology", value: 1 },
    { name: "Sports", value: 1 },
    { name: "Arts", value: 1 },
  ];

  // Spending breakdown
  const spendingData = [
    { category: "Memberships", amount: 150 },
    { category: "Events", amount: 75 },
    { category: "Workshops", amount: 50 },
    { category: "Materials", amount: 25 },
  ];

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

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
        <h1 className="text-4xl font-black mb-2">
          My <span className="text-gradient">Dashboard</span>
        </h1>
        <p className="text-lg text-base-content/70">
          Your activity and membership overview
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {[
          {
            title: "Clubs Joined",
            value: stats?.clubsJoined || 3,
            icon: <FaTrophy />,
            color: "primary",
            subtitle: "Active memberships",
          },
          {
            title: "Events Attended",
            value: stats?.eventsAttended || 12,
            icon: <FaCalendar />,
            color: "secondary",
            subtitle: "This year",
          },
          {
            title: "Total Spent",
            value: `$${stats?.totalSpent || "300"}`,
            icon: <FaDollarSign />,
            color: "accent",
            subtitle: "Memberships & events",
          },
          {
            title: "Achievements",
            value: stats?.achievements || 8,
            icon: <FaStar />,
            color: "success",
            subtitle: "Badges earned",
          },
        ].map((stat, index) => (
          <motion.div key={index} variants={fadeInUp}>
            <div
              className={`card bg-base-100 shadow-xl border-l-4 border-${stat.color}`}
            >
              <div className="card-body p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-base-content/70 text-sm font-semibold mb-1">
                      {stat.title}
                    </p>
                    <h3 className="text-3xl font-black">{stat.value}</h3>
                    <p className="text-base-content/60 text-xs mt-2">
                      {stat.subtitle}
                    </p>
                  </div>
                  <div
                    className={`w-16 h-16 bg-${stat.color}/20 rounded-2xl flex items-center justify-center text-${stat.color} text-2xl`}
                  >
                    {stat.icon}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title text-xl font-bold flex items-center gap-2">
                <FaCheckCircle className="text-primary" />
                My Activity
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "2px solid #ff6b6b",
                      borderRadius: "12px",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="events"
                    fill={COLORS.primary}
                    radius={[8, 8, 0, 0]}
                  />
                  <Bar
                    dataKey="clubs"
                    fill={COLORS.secondary}
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Spending Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title text-xl font-bold flex items-center gap-2">
                <FaDollarSign className="text-success" />
                Spending Breakdown
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={spendingData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, amount }) => `${name}: $${amount}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="amount"
                  >
                    {spendingData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={PIE_COLORS[index % PIE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Upcoming Events */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-xl font-bold mb-4">
              My Upcoming Events
            </h3>
            <div className="space-y-4">
              {[
                {
                  title: "Photography Workshop",
                  club: "Photography Club",
                  date: "Jan 15, 2026",
                  time: "2:00 PM",
                  status: "confirmed",
                },
                {
                  title: "Tech Meetup",
                  club: "Tech Innovators",
                  date: "Jan 18, 2026",
                  time: "6:00 PM",
                  status: "confirmed",
                },
                {
                  title: "Fitness Challenge",
                  club: "Fitness Warriors",
                  date: "Jan 22, 2026",
                  time: "7:00 AM",
                  status: "pending",
                },
              ].map((event, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-base-200 rounded-lg hover:bg-base-300 transition-colors"
                >
                  <div>
                    <h4 className="font-bold text-lg">{event.title}</h4>
                    <p className="text-sm text-base-content/70">{event.club}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <span className="flex items-center gap-1">
                        <FaCalendar className="text-secondary" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaClock className="text-accent" />
                        {event.time}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`badge ${
                      event.status === "confirmed"
                        ? "badge-success"
                        : "badge-warning"
                    } font-bold`}
                  >
                    {event.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MemberDashboard;
