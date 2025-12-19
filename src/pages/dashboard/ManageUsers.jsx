import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import api from "../../utils/api";
import toast from "react-hot-toast";
import {
  FaUsers,
  FaUserShield,
  FaUserTie,
  FaSearch,
  FaEdit,
} from "react-icons/fa";

const ManageUsers = () => {
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const queryClient = useQueryClient();

  // Fetch all users
  const { data: users, isLoading } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const response = await api.get("/users");
      return response.data;
    },
  });

  // Update user role mutation
  const updateRoleMutation = useMutation({
    mutationFn: async ({ email, role }) => {
      const response = await api.patch(`/users/role/${email}`, { role });
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["allUsers"]);
      toast.success(`Role updated to ${data.newRole}`, {
        icon: "✅",
        style: {
          borderRadius: "12px",
          background: "#4ecdc4",
          color: "#fff",
          fontWeight: "600",
        },
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update role");
    },
  });

  // Filter users
  const filteredUsers = users?.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleRoleChange = (email, newRole) => {
    if (
      window.confirm(
        `Are you sure you want to change this user's role to ${newRole}?`
      )
    ) {
      updateRoleMutation.mutate({ email, role: newRole });
    }
  };

  const getRoleBadge = (role) => {
    const badges = {
      admin: { color: "badge-error", icon: <FaUserShield /> },
      clubManager: { color: "badge-primary", icon: <FaUserTie /> },
      member: { color: "badge-secondary", icon: <FaUsers /> },
    };
    return badges[role] || badges.member;
  };

  const getRoleStats = () => {
    if (!users) return { admin: 0, clubManager: 0, member: 0 };
    return {
      admin: users.filter((u) => u.role === "admin").length,
      clubManager: users.filter((u) => u.role === "clubManager").length,
      member: users.filter((u) => u.role === "member").length,
    };
  };

  const stats = getRoleStats();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-black mb-2">
          Manage <span className="text-gradient">Users</span>
        </h1>
        <p className="text-lg text-gray-600 font-medium">
          View and manage user roles across the platform
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card bg-white shadow-xl border-2 border-base-200"
        >
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="bg-error/10 p-4 rounded-xl">
                <FaUserShield className="text-3xl text-error" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Admins</p>
                <p className="text-3xl font-black">{stats.admin}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card bg-white shadow-xl border-2 border-base-200"
        >
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-4 rounded-xl">
                <FaUserTie className="text-3xl text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">
                  Club Managers
                </p>
                <p className="text-3xl font-black">{stats.clubManager}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card bg-white shadow-xl border-2 border-base-200"
        >
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="bg-secondary/10 p-4 rounded-xl">
                <FaUsers className="text-3xl text-secondary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Members</p>
                <p className="text-3xl font-black">{stats.member}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card bg-white shadow-xl border-2 border-base-200 mb-8"
      >
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-base">
                  Search Users
                </span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  className="input input-bordered w-full pr-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <FaSearch className="absolute right-4 top-4 text-gray-400" />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-base">
                  Filter by Role
                </span>
              </label>
              <select
                className="select select-bordered w-full"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="clubManager">Club Manager</option>
                <option value="member">Member</option>
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card bg-white shadow-xl border-2 border-base-200"
      >
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-4">
            All Users ({filteredUsers?.length || 0})
          </h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="bg-base-200">
                  <th className="font-bold text-base">User</th>
                  <th className="font-bold text-base">Email</th>
                  <th className="font-bold text-base">Current Role</th>
                  <th className="font-bold text-base">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers?.map((user) => {
                  const badge = getRoleBadge(user.role);
                  return (
                    <tr key={user.email} className="hover:bg-base-200">
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="w-12 rounded-full">
                              <img
                                src={
                                  user.photoURL ||
                                  `https://ui-avatars.com/api/?name=${user.name}`
                                }
                                alt={user.name}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{user.name}</div>
                            <div className="text-sm text-gray-500">
                              Joined{" "}
                              {new Date(user.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="font-semibold">{user.email}</td>
                      <td>
                        <div
                          className={`badge ${badge.color} badge-lg font-bold gap-2`}
                        >
                          {badge.icon}
                          {user.role}
                        </div>
                      </td>
                      <td>
                        <div className="dropdown dropdown-end">
                          <label tabIndex={0} className="btn btn-sm btn-ghost">
                            <FaEdit /> Change Role
                          </label>
                          <ul
                            tabIndex={0}
                            className="dropdown-content menu p-2 shadow-xl bg-base-100 rounded-box w-52 border-2 border-base-200"
                          >
                            <li>
                              <a
                                onClick={() =>
                                  handleRoleChange(user.email, "member")
                                }
                                className={
                                  user.role === "member" ? "active" : ""
                                }
                              >
                                <FaUsers /> Member
                              </a>
                            </li>
                            <li>
                              <a
                                onClick={() =>
                                  handleRoleChange(user.email, "clubManager")
                                }
                                className={
                                  user.role === "clubManager" ? "active" : ""
                                }
                              >
                                <FaUserTie /> Club Manager
                              </a>
                            </li>
                            <li>
                              <a
                                onClick={() =>
                                  handleRoleChange(user.email, "admin")
                                }
                                className={
                                  user.role === "admin" ? "active" : ""
                                }
                              >
                                <FaUserShield /> Admin
                              </a>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ManageUsers;
