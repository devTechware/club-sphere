import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import Clubs from "../pages/Clubs";
import ClubDetails from "../pages/ClubDetails";
import Events from "../pages/Events";
import EventDetails from "../pages/EventDetails";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Terms from "../pages/Terms";
import Privacy from "../pages/Privacy";
import Sitemap from "../pages/Sitemap";
import Profile from "../pages/Profile";
import PrivateRoute from "../components/PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";

// Admin Dashboard Pages
import AdminDashboard from "../pages/dashboard/admin/AdminDashboard";
import ManageUsers from "../pages/dashboard/admin/ManageUsers";
import ManageClubs from "../pages/dashboard/admin/ManageClubs";
import ManagePayments from "../pages/dashboard/admin/ManagePayments";

// Manager Dashboard Pages
import ManagerDashboard from "../pages/dashboard/manager/ManagerDashboard";
import ManagerMyClubs from "../pages/dashboard/manager/MyClubs";
import ManagerMyEvents from "../pages/dashboard/manager/MyEvents";
import MyMembers from "../pages/dashboard/manager/MyMembers";

// Member Dashboard Pages
import MemberDashboard from "../pages/dashboard/member/MemberDashboard";
import MemberMyClubs from "../pages/dashboard/member/MyClubs";
import MemberMyEvents from "../pages/dashboard/member/MyEvents";
import MyPayments from "../pages/dashboard/member/MyPayments";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/clubs",
        element: <Clubs />,
      },
      {
        path: "/clubs/:id",
        element: <ClubDetails />,
      },
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/events/:id",
        element: <EventDetails />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/terms",
        element: <Terms />,
      },
      {
        path: "/privacy",
        element: <Privacy />,
      },
      {
        path: "/sitemap",
        element: <Sitemap />,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // Admin routes
      {
        path: "admin",
        element: <AdminDashboard />,
      },
      {
        path: "admin/users",
        element: <ManageUsers />,
      },
      {
        path: "admin/clubs",
        element: <ManageClubs />,
      },
      {
        path: "admin/payments",
        element: <ManagePayments />,
      },
      // Manager routes
      {
        path: "manager",
        element: <ManagerDashboard />,
      },
      {
        path: "manager/clubs",
        element: <ManagerMyClubs />,
      },
      {
        path: "manager/events",
        element: <ManagerMyEvents />,
      },
      {
        path: "manager/members",
        element: <MyMembers />,
      },
      // Member routes
      {
        path: "member",
        element: <MemberDashboard />,
      },
      {
        path: "member/clubs",
        element: <MemberMyClubs />,
      },
      {
        path: "member/events",
        element: <MemberMyEvents />,
      },
      {
        path: "member/payments",
        element: <MyPayments />,
      },
    ],
  },
]);

export default router;
