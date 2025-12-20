import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import api from "../../../utils/api";
import {
  FaDollarSign,
  FaCheckCircle,
  FaCalendar,
  FaReceipt,
} from "react-icons/fa";

const MyPayments = () => {
  // Fetch user's payment history
  const { data: payments, isLoading } = useQuery({
    queryKey: ["myPayments"],
    queryFn: async () => {
      const response = await api.get("/payments/my-payments");
      return response.data;
    },
  });

  const totalSpent =
    payments?.reduce((sum, payment) => sum + payment.amount, 0) || 0;
  const membershipPayments =
    payments?.filter((p) => p.type === "membership") || [];
  const eventPayments = payments?.filter((p) => p.type === "event") || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-success"></span>
          <p className="mt-4 font-semibold">Loading payment history...</p>
        </div>
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
          Payment <span className="text-gradient">History</span>
        </h1>
        <p className="text-lg text-gray-600 font-medium">
          View all your transactions
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
              <div className="bg-success/10 p-4 rounded-xl">
                <FaDollarSign className="text-3xl text-success" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">
                  Total Spent
                </p>
                <p className="text-3xl font-black">${totalSpent.toFixed(2)}</p>
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
                <FaReceipt className="text-3xl text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">
                  Total Payments
                </p>
                <p className="text-3xl font-black">{payments?.length || 0}</p>
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
                <FaDollarSign className="text-3xl text-secondary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">
                  Memberships
                </p>
                <p className="text-3xl font-black">
                  {membershipPayments.length}
                </p>
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
                <FaDollarSign className="text-3xl text-accent" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Events</p>
                <p className="text-3xl font-black">{eventPayments.length}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Payments Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card bg-white shadow-xl border-2 border-base-200"
      >
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-4">
            All Transactions
          </h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="bg-base-200">
                  <th className="font-bold text-base">Date</th>
                  <th className="font-bold text-base">Type</th>
                  <th className="font-bold text-base">Amount</th>
                  <th className="font-bold text-base">Status</th>
                  <th className="font-bold text-base">Transaction ID</th>
                </tr>
              </thead>
              <tbody>
                {payments && payments.length > 0 ? (
                  payments.map((payment) => (
                    <tr key={payment._id} className="hover:bg-base-200">
                      <td>
                        <div className="flex items-center gap-2">
                          <FaCalendar className="text-gray-400" />
                          <span className="font-semibold">
                            {new Date(payment.createdAt).toLocaleDateString()}
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
                        <div className="text-xl font-black text-success">
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
                        <code className="text-xs bg-base-200 px-2 py-1 rounded">
                          {payment.stripePaymentIntentId?.slice(0, 20)}...
                        </code>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-12">
                      <FaDollarSign className="text-6xl text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 font-medium">
                        No payments yet
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

export default MyPayments;
