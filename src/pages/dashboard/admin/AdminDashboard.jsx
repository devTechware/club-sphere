import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import api from "../../../utils/api";
import {
  FaUsers,
  FaBuilding,
  FaCalendar,
  FaDollarSign,
  FaChartLine,
  FaTrophy,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  // Fetch dashboard stats
  const { data: stats, isLoading } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const response = await api.get("/stats/admin");
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

  // Chart colors
  const COLORS = {
    primary: "#ff6b6b",
    secondary: "#4ecdc4",
    accent: "#ffe66d",
    success: "#26de81",
    warning: "#fd9644",
    error: "#fc5c65",
    info: "#3b82f6",
  };

  const PIE_COLORS = [
    COLORS.primary,
    COLORS.secondary,
    COLORS.accent,
    COLORS.warning,
    COLORS.info,
    COLORS.success,
  ];

  // Mock data for charts (replace with real data from stats)
  const userGrowthData = [
    { month: "Jan", users: 120 },
    { month: "Feb", users: 180 },
    { month: "Mar", users: 250 },
    { month: "Apr", users: 320 },
    { month: "May", users: 450 },
    { month: "Jun", users: 600 },
  ];

  const clubCategoryData = [
    { name: "Technology", value: 25 },
    { name: "Sports", value: 18 },
    { name: "Arts", value: 15 },
    { name: "Music", value: 12 },
    { name: "Gaming", value: 20 },
    { name: "Other", value: 10 },
  ];

  const revenueData = [
    { month: "Jan", memberships: 1200, events: 800 },
    { month: "Feb", memberships: 1500, events: 1000 },
    { month: "Mar", memberships: 1800, events: 1200 },
    { month: "Apr", memberships: 2200, events: 1500 },
    { month: "May", memberships: 2600, events: 1800 },
    { month: "Jun", memberships: 3000, events: 2200 },
  ];

  const eventRegistrationsData = [
    { month: "Jan", registrations: 45 },
    { month: "Feb", registrations: 62 },
    { month: "Mar", registrations: 78 },
    { month: "Apr", registrations: 95 },
    { month: "May", registrations: 112 },
    { month: "Jun", registrations: 145 },
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
          Admin <span className="text-gradient">Dashboard</span>
        </h1>
        <p className="text-lg text-base-content/70">
          Platform overview and analytics
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
            title: "Total Users",
            value: stats?.totalUsers || 1247,
            icon: <FaUsers />,
            color: "primary",
            change: "+12%",
          },
          {
            title: "Active Clubs",
            value: stats?.totalClubs || 156,
            icon: <FaBuilding />,
            color: "secondary",
            change: "+8%",
          },
          {
            title: "Total Events",
            value: stats?.totalEvents || 543,
            icon: <FaCalendar />,
            color: "accent",
            change: "+23%",
          },
          {
            title: "Total Revenue",
            value: `$${stats?.totalRevenue || "12,450"}`,
            icon: <FaDollarSign />,
            color: "success",
            change: "+15%",
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
                    <p className="text-success text-sm font-bold mt-2">
                      {stat.change} this month
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

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title text-xl font-bold flex items-center gap-2">
                <FaChartLine className="text-primary" />
                User Growth Trend
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={userGrowthData}>
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
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke={COLORS.primary}
                    strokeWidth={3}
                    dot={{ fill: COLORS.primary, r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Clubs by Category */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title text-xl font-bold flex items-center gap-2">
                <FaTrophy className="text-secondary" />
                Clubs by Category
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={clubCategoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {clubCategoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={PIE_COLORS[index % PIE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title text-xl font-bold flex items-center gap-2">
                <FaDollarSign className="text-success" />
                Revenue by Type
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "2px solid #4ecdc4",
                      borderRadius: "12px",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="memberships"
                    fill={COLORS.secondary}
                    radius={[8, 8, 0, 0]}
                  />
                  <Bar
                    dataKey="events"
                    fill={COLORS.accent}
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Event Registrations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title text-xl font-bold flex items-center gap-2">
                <FaCalendar className="text-accent" />
                Event Registrations
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={eventRegistrationsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "2px solid #ffe66d",
                      borderRadius: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="registrations"
                    stroke={COLORS.accent}
                    fill={COLORS.accent}
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-xl font-bold mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {[
                {
                  icon: <FaCheckCircle className="text-success" />,
                  text: "New club 'Tech Innovators' approved",
                  time: "2 minutes ago",
                },
                {
                  icon: <FaUsers className="text-primary" />,
                  text: "15 new users registered today",
                  time: "1 hour ago",
                },
                {
                  icon: <FaCalendar className="text-secondary" />,
                  text: "Event 'Coding Workshop' reached capacity",
                  time: "3 hours ago",
                },
                {
                  icon: <FaDollarSign className="text-accent" />,
                  text: "Payment received: $250 from membership fees",
                  time: "5 hours ago",
                },
                {
                  icon: <FaClock className="text-warning" />,
                  text: "3 clubs pending approval",
                  time: "1 day ago",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-base-200 rounded-lg hover:bg-base-300 transition-colors"
                >
                  <div className="text-2xl">{activity.icon}</div>
                  <div className="flex-1">
                    <p className="font-semibold">{activity.text}</p>
                    <p className="text-sm text-base-content/70">
                      {activity.time}
                    </p>
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

export default AdminDashboard;
