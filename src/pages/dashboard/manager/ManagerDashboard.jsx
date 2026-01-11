import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import api from "../../../utils/api";
import {
  FaUsers,
  FaCalendar,
  FaTrophy,
  FaChartLine,
  FaDollarSign,
  FaStar,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const ManagerDashboard = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["managerStats"],
    queryFn: async () => {
      const response = await api.get("/stats/manager");
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
  };

  // Member growth data
  const memberGrowthData = [
    { month: "Jan", members: 15 },
    { month: "Feb", members: 28 },
    { month: "Mar", members: 42 },
    { month: "Apr", members: 56 },
    { month: "May", members: 73 },
    { month: "Jun", members: 95 },
  ];

  // Event attendance data
  const eventAttendanceData = [
    { event: "Workshop 1", attended: 45, registered: 50 },
    { event: "Meetup 2", attended: 38, registered: 42 },
    { event: "Conference", attended: 85, registered: 90 },
    { event: "Webinar", attended: 62, registered: 70 },
    { event: "Training", attended: 55, registered: 60 },
  ];

  // Revenue trend
  const revenueData = [
    { month: "Jan", revenue: 250 },
    { month: "Feb", revenue: 380 },
    { month: "Mar", revenue: 520 },
    { month: "Apr", revenue: 680 },
    { month: "May", revenue: 850 },
    { month: "Jun", revenue: 1020 },
  ];

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

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
        <h1 className="text-4xl font-black mb-2">
          Manager <span className="text-gradient">Dashboard</span>
        </h1>
        <p className="text-lg text-base-content/70">
          Your clubs and events performance
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
            title: "My Clubs",
            value: stats?.myClubs || 3,
            icon: <FaTrophy />,
            color: "primary",
            subtitle: "Active clubs",
          },
          {
            title: "Total Members",
            value: stats?.totalMembers || 95,
            icon: <FaUsers />,
            color: "secondary",
            subtitle: "Across all clubs",
          },
          {
            title: "Events Hosted",
            value: stats?.eventsHosted || 12,
            icon: <FaCalendar />,
            color: "accent",
            subtitle: "This month",
          },
          {
            title: "Revenue",
            value: `$${stats?.revenue || "1,020"}`,
            icon: <FaDollarSign />,
            color: "success",
            subtitle: "Total earnings",
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

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Member Growth */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title text-xl font-bold flex items-center gap-2">
                <FaChartLine className="text-secondary" />
                Member Growth
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={memberGrowthData}>
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
                  <Line
                    type="monotone"
                    dataKey="members"
                    stroke={COLORS.secondary}
                    strokeWidth={3}
                    dot={{ fill: COLORS.secondary, r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Event Attendance */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title text-xl font-bold flex items-center gap-2">
                <FaCalendar className="text-accent" />
                Event Attendance
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={eventAttendanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="event" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "2px solid #ffe66d",
                      borderRadius: "12px",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="registered"
                    fill={COLORS.accent}
                    radius={[8, 8, 0, 0]}
                  />
                  <Bar
                    dataKey="attended"
                    fill={COLORS.success}
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </div>

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
              Revenue Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "2px solid #26de81",
                    borderRadius: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke={COLORS.success}
                  fill={COLORS.success}
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* My Clubs Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-xl font-bold mb-4">
              My Clubs Performance
            </h3>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Club Name</th>
                    <th>Members</th>
                    <th>Events</th>
                    <th>Revenue</th>
                    <th>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      name: "Tech Innovators",
                      members: 45,
                      events: 5,
                      revenue: "$520",
                      rating: 4.8,
                    },
                    {
                      name: "Photography Club",
                      members: 32,
                      events: 3,
                      revenue: "$280",
                      rating: 4.6,
                    },
                    {
                      name: "Fitness Warriors",
                      members: 18,
                      events: 4,
                      revenue: "$220",
                      rating: 4.9,
                    },
                  ].map((club, index) => (
                    <tr key={index} className="hover">
                      <td className="font-bold">{club.name}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <FaUsers className="text-secondary" />
                          {club.members}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <FaCalendar className="text-accent" />
                          {club.events}
                        </div>
                      </td>
                      <td className="font-bold text-success">{club.revenue}</td>
                      <td>
                        <div className="flex items-center gap-1">
                          <FaStar className="text-warning" />
                          <span className="font-bold">{club.rating}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ManagerDashboard;
