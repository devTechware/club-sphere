import { Link, Outlet, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
import toast from "react-hot-toast";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  // Fetch user profile to get role
  const { data: profile, isLoading } = useQuery({
    queryKey: ["userProfile", user?.email],
    queryFn: async () => {
      const response = await api.get("/users/profile");
      return response.data;
    },
    enabled: !!user,
  });

  const userRole = profile?.role;

  useEffect(() => {
    // Redirect to appropriate dashboard only on initial load
    if (userRole && window.location.pathname === "/dashboard") {
      if (userRole === "admin") {
        navigate("/dashboard/admin", { replace: true });
      } else if (userRole === "clubManager") {
        navigate("/dashboard/manager", { replace: true });
      } else if (userRole === "member") {
        navigate("/dashboard/member", { replace: true });
      }
    }
  }, [userRole, navigate]);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const adminLinks = (
    <>
      <li>
        <Link to="/dashboard/admin">Admin Overview</Link>
      </li>
      <li>
        <Link to="/dashboard/admin/users">Manage Users</Link>
      </li>
      <li>
        <Link to="/dashboard/admin/clubs">Manage Clubs</Link>
      </li>
      <li>
        <Link to="/dashboard/admin/payments">View Payments</Link>
      </li>
    </>
  );

  const managerLinks = (
    <>
      <li>
        <Link to="/dashboard/manager">Manager Overview</Link>
      </li>
      <li>
        <Link to="/dashboard/manager/clubs">My Clubs</Link>
      </li>
      <li>
        <Link to="/dashboard/manager/events">My Events</Link>
      </li>
      <li>
        <Link to="/dashboard/manager/members">Club Members</Link>
      </li>
    </>
  );

  const memberLinks = (
    <>
      <li>
        <Link to="/dashboard/member">Member Overview</Link>
      </li>
      <li>
        <Link to="/dashboard/member/clubs">My Clubs</Link>
      </li>
      <li>
        <Link to="/dashboard/member/events">My Events</Link>
      </li>
      <li>
        <Link to="/dashboard/member/payments">Payment History</Link>
      </li>
    </>
  );

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar for mobile */}
        <div className="w-full navbar bg-base-300 lg:hidden">
          <div className="flex-none">
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
          </div>
          <div className="flex-1">
            <Link to="/" className="btn btn-ghost text-xl">
              ClubSphere
            </Link>
          </div>
        </div>
        {/* Page content */}
        <div className="p-4 lg:p-8 bg-base-100 min-h-screen">
          <Outlet />
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="dashboard-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar header */}
          <div className="mb-4">
            <Link to="/" className="btn btn-ghost text-xl w-full justify-start">
              ClubSphere
            </Link>
          </div>

          {/* User info */}
          <div className="mb-4 p-4 bg-base-300 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img
                    src={user?.photoURL || "https://via.placeholder.com/150"}
                    alt={user?.displayName}
                  />
                </div>
              </div>
              <div>
                <p className="font-semibold">{user?.displayName}</p>
                <p className="text-xs text-gray-500 capitalize">{userRole}</p>
              </div>
            </div>
          </div>

          {/* Navigation links based on role */}
          <ul className="menu-compact">
            {userRole === "admin" && adminLinks}
            {userRole === "clubManager" && managerLinks}
            {userRole === "member" && memberLinks}

            <div className="divider"></div>

            <li>
              <Link to="/">Back to Home</Link>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
