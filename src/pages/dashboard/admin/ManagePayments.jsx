import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import api from "../../../utils/api";
import {
  FaDollarSign,
  FaSearch,
  FaCheckCircle,
  FaCalendar,
  FaUsers,
  FaBuilding,
} from "react-icons/fa";

const ManagePayments = () => {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Fetch all payments
  const { data: payments, isLoading } = useQuery({
    queryKey: ["allPayments"],
    queryFn: async () => {
      const response = await api.get("/payments/all");
      return response.data;
    },
  });

  // Filter payments
  const filteredPayments = payments?.filter((payment) => {
    const matchesSearch = payment.userEmail
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesType = filterType === "all" || payment.type === filterType;
    return matchesSearch && matchesType;
  });

  const getPaymentStats = () => {
    if (!payments) return { total: 0, membership: 0, event: 0, revenue: 0 };
    return {
      total: payments.length,
      membership: payments.filter((p) => p.type === "membership").length,
      event: payments.filter((p) => p.type === "event").length,
      revenue: payments.reduce((sum, p) => sum + p.amount, 0),
    };
  };

  const stats = getPaymentStats();

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
          Manage <span className="text-gradient">Payments</span>
        </h1>
        <p className="text-lg text-gray-600 font-medium">
          View and track all payment transactions
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card bg-white shadow-xl border-2 border-base-200"
        >
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-4 rounded-xl">
                <FaDollarSign className="text-3xl text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">
                  Total Revenue
                </p>
                <p className="text-3xl font-black">
                  ${stats.revenue.toFixed(2)}
                </p>
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
              <div className="bg-success/10 p-4 rounded-xl">
                <FaCheckCircle className="text-3xl text-success" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">
                  Total Payments
                </p>
                <p className="text-3xl font-black">{stats.total}</p>
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
                <FaBuilding className="text-3xl text-secondary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">
                  Memberships
                </p>
                <p className="text-3xl font-black">{stats.membership}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card bg-white shadow-xl border-2 border-base-200"
        >
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="bg-accent/10 p-4 rounded-xl">
                <FaCalendar className="text-3xl text-accent" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">
                  Event Payments
                </p>
                <p className="text-3xl font-black">{stats.event}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card bg-white shadow-xl border-2 border-base-200 mb-8"
      >
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-base">
                  Search by Email
                </span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search user email..."
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
                  Filter by Type
                </span>
              </label>
              <select
                className="select select-bordered w-full"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="membership">Membership</option>
                <option value="event">Event</option>
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Payments Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card bg-white shadow-xl border-2 border-base-200"
      >
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-4">
            All Payments ({filteredPayments?.length || 0})
          </h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="bg-base-200">
                  <th className="font-bold text-base">User</th>
                  <th className="font-bold text-base">Type</th>
                  <th className="font-bold text-base">Amount</th>
                  <th className="font-bold text-base">Status</th>
                  <th className="font-bold text-base">Date</th>
                  <th className="font-bold text-base">Transaction ID</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments?.length > 0 ? (
                  filteredPayments.map((payment) => (
                    <tr key={payment._id} className="hover:bg-base-200">
                      <td>
                        <div className="flex items-center gap-2">
                          <FaUsers className="text-primary" />
                          <span className="font-semibold">
                            {payment.userEmail}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div
                          className={`badge ${
                            payment.type === "membership"
                              ? "badge-secondary"
                              : "badge-accent"
                          } font-bold capitalize`}
                        >
                          {payment.type}
                        </div>
                      </td>
                      <td>
                        <div className="text-lg font-black text-success">
                          ${payment.amount.toFixed(2)}
                        </div>
                      </td>
                      <td>
                        <div
                          className={`badge ${
                            payment.status === "completed"
                              ? "badge-success"
                              : "badge-warning"
                          } badge-lg font-bold capitalize gap-2`}
                        >
                          <FaCheckCircle />
                          {payment.status}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <FaCalendar className="text-gray-400" />
                          <span>
                            {new Date(payment.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                      <td>
                        <code className="text-xs bg-base-200 px-2 py-1 rounded">
                          {payment.stripePaymentIntentId?.slice(0, 20)}...
                        </code>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-12">
                      <FaDollarSign className="text-6xl text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 font-medium">
                        No payments found
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ManagePayments;
