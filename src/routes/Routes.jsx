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
import PrivateRoute from "../components/PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import AdminDashboard from "../pages/dashboard/admin/AdminDashboard";
import ManagerDashboard from "../pages/dashboard/manager/ManagerDashboard";
import MemberDashboard from "../pages/dashboard/member/MemberDashboard";
import ManageUsers from "../pages/dashboard/admin/ManageUsers";
import ManageClubs from "../pages/dashboard/admin/ManageClubs";
import ManagePayments from "../pages/dashboard/admin/ManagePayments";
import MyClubs from "../pages/dashboard/member/MyClubs";
import MyEvents from "../pages/dashboard/member/MyEvents";
import MyPayments from "../pages/dashboard/member/MyPayments";
import ManagerMyClubs from "../pages/dashboard/manager/MyClubs";
import ManagerMyEvents from "../pages/dashboard/manager/MyEvents";
import MyMembers from "../pages/dashboard/manager/MyMembers";

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
        element: <MyClubs />,
      },
      {
        path: "member/events",
        element: <MyEvents />,
      },
      {
        path: "member/payments",
        element: <MyPayments />,
      },
    ],
  },
]);

export default router;
