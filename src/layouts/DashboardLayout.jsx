import { Outlet, Link, Navigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import api from "../utils/api";
import {
  FaHome,
  FaUsers,
  FaBuilding,
  FaCalendar,
  FaDollarSign,
  FaUserShield,
  FaSignOutAlt,
} from "react-icons/fa";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();

  // Fetch user profile to get role
  const { data: profile, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const response = await api.get("/users/profile");
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!profile) {
    return <Navigate to="/login" />;
  }

  // Redirect to appropriate dashboard based on role
  const currentPath = window.location.pathname;
  if (currentPath === "/dashboard" || currentPath === "/dashboard/") {
    if (profile.role === "admin") return <Navigate to="/dashboard/admin" />;
    if (profile.role === "clubManager")
      return <Navigate to="/dashboard/manager" />;
    return <Navigate to="/dashboard/member" />;
  }

  const handleLogout = async () => {
    await logOut();
  };

  const getNavItems = () => {
    if (profile.role === "admin") {
      return [
        { path: "/dashboard/admin", icon: <FaHome />, label: "Overview" },
        {
          path: "/dashboard/admin/users",
          icon: <FaUsers />,
          label: "Manage Users",
        },
        {
          path: "/dashboard/admin/clubs",
          icon: <FaBuilding />,
          label: "Manage Clubs",
        },
        {
          path: "/dashboard/admin/payments",
          icon: <FaDollarSign />,
          label: "Payments",
        },
      ];
    }

    if (profile.role === "clubManager") {
      return [
        { path: "/dashboard/manager", icon: <FaHome />, label: "Overview" },
        {
          path: "/dashboard/manager/clubs",
          icon: <FaBuilding />,
          label: "My Clubs",
        },
        {
          path: "/dashboard/manager/events",
          icon: <FaCalendar />,
          label: "Events",
        },
        {
          path: "/dashboard/manager/members",
          icon: <FaUsers />,
          label: "Members",
        },
      ];
    }

    return [
      { path: "/dashboard/member", icon: <FaHome />, label: "Overview" },
      {
        path: "/dashboard/member/clubs",
        icon: <FaBuilding />,
        label: "My Clubs",
      },
      {
        path: "/dashboard/member/events",
        icon: <FaCalendar />,
        label: "My Events",
      },
      {
        path: "/dashboard/member/payments",
        icon: <FaDollarSign />,
        label: "Payment History",
      },
    ];
  };

  const navItems = getNavItems();

  const getRoleBadge = () => {
    const badges = {
      admin: { color: "badge-error", label: "Admin" },
      clubManager: { color: "badge-primary", label: "Manager" },
      member: { color: "badge-secondary", label: "Member" },
    };
    return badges[profile.role] || badges.member;
  };

  const roleBadge = getRoleBadge();

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-base-100">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b-2 border-base-200 px-4 py-4 flex items-center justify-between">
          <label
            htmlFor="dashboard-drawer"
            className="btn btn-square btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>

        {/* Main Content */}
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <div className="menu p-4 w-80 min-h-full bg-white border-r-2 border-base-200">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 px-4 py-6 mb-4">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-white font-black text-xl">C</span>
            </div>
            <span className="text-2xl font-black">ClubSphere</span>
          </Link>

          {/* User Info */}
          <div className="bg-linear-to-r from-primary/10 to-secondary/10 rounded-2xl p-4 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="avatar">
                <div className="w-12 rounded-full ring ring-primary ring-offset-2">
                  <img
                    src={
                      user?.photoURL ||
                      `https://ui-avatars.com/api/?name=${user?.displayName}`
                    }
                    alt={user?.displayName}
                  />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-sm truncate">
                  {user?.displayName}
                </p>
                <p className="text-xs text-gray-600 truncate">{user?.email}</p>
              </div>
            </div>
            <div
              className={`badge ${roleBadge.color} badge-sm font-bold w-full justify-center`}
            >
              <FaUserShield className="mr-1" />
              {roleBadge.label}
            </div>
          </div>

          {/* Navigation */}
          <ul className="space-y-2 mb-6">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold hover:bg-primary hover:text-white transition-all"
                >
                  <span className="text-xl">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="divider"></div>

          {/* Back to Home */}
          <Link to="/" className="btn btn-outline w-full mb-3 font-bold">
            <FaHome />
            Back to Home
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="btn btn-error text-white w-full font-bold"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
