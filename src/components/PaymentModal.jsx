import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaCheckCircle, FaCreditCard } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../utils/api";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

const PaymentModal = ({ isOpen, onClose, type, item, onSuccess }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isProcessing, setIsProcessing] = useState(false);

  // Payment mutation
  const paymentMutation = useMutation({
    mutationFn: async (paymentData) => {
      // Create membership or event registration
      if (type === "club") {
        await api.post("/memberships", { clubId: item._id });
      } else {
        await api.post("/event-registrations", { eventId: item._id });
      }

      // Record payment
      const response = await api.post("/payments", paymentData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["memberStats"]);
      queryClient.invalidateQueries(["myMemberships"]);
      queryClient.invalidateQueries(["myRegistrations"]);
      toast.success(
        `Successfully ${
          type === "club" ? "joined club" : "registered for event"
        }!`,
        {
          icon: "🎉",
          duration: 4000,
        }
      );
      if (onSuccess) onSuccess();
      onClose();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Payment failed");
      setIsProcessing(false);
    },
  });

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing (in real app, integrate Stripe/PayPal)
    setTimeout(() => {
      const paymentData = {
        type: type === "club" ? "membership" : "event",
        amount: type === "club" ? item.membershipFee : item.eventFee,
        clubId: type === "club" ? item._id : item.clubId,
        eventId: type === "event" ? item._id : undefined,
        stripePaymentIntentId: `pi_${Math.random().toString(36).substr(2, 9)}`,
      };

      paymentMutation.mutate(paymentData);
    }, 2000);
  };

  const amount = type === "club" ? item.membershipFee : item.eventFee;
  const isFree = amount === 0;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="bg-linear-to-r from-primary to-secondary p-6 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-black mb-2">
                  {isFree ? "Confirm Registration" : "Complete Payment"}
                </h2>
                <p className="text-white/90">
                  {type === "club" ? "Join Club" : "Register for Event"}
                </p>
              </div>
              <button
                onClick={onClose}
                className="btn btn-ghost btn-sm btn-circle text-white hover:bg-white/20"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Item Details */}
            <div className="bg-base-200 p-4 rounded-xl mb-6">
              <h3 className="font-bold text-lg mb-2">
                {type === "club" ? item.clubName : item.title}
              </h3>
              {type === "event" && (
                <p className="text-sm text-gray-600">
                  {new Date(item.eventDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              )}
            </div>

            {/* User Info */}
            <div className="mb-6">
              <label className="label">
                <span className="label-text font-bold">Your Email</span>
              </label>
              <input
                type="email"
                value={user?.email}
                disabled
                className="input input-bordered w-full bg-base-200"
              />
            </div>

            {/* Amount */}
            <div className="bg-primary/10 border-2 border-primary rounded-xl p-6 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-600">
                  {type === "club" ? "Membership Fee" : "Registration Fee"}
                </span>
                <span className="text-3xl font-black text-primary">
                  {isFree ? "FREE" : `$${amount}`}
                </span>
              </div>
              {!isFree && (
                <p className="text-sm text-gray-600">One-time payment</p>
              )}
            </div>

            {/* Payment Form (only if not free) */}
            {!isFree && (
              <form onSubmit={handlePayment} className="space-y-4">
                <div>
                  <label className="label">
                    <span className="label-text font-bold flex items-center gap-2">
                      <FaCreditCard className="text-primary" />
                      Card Number
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="input input-bordered w-full"
                    required
                    maxLength="19"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">
                      <span className="label-text font-bold">Expiry</span>
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="input input-bordered w-full"
                      required
                      maxLength="5"
                    />
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text font-bold">CVV</span>
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="input input-bordered w-full"
                      required
                      maxLength="3"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="btn btn-primary w-full btn-lg font-bold"
                >
                  {isProcessing ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FaCheckCircle />
                      Pay ${amount}
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Free Join/Register */}
            {isFree && (
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="btn btn-primary w-full btn-lg font-bold"
              >
                {isProcessing ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Processing...
                  </>
                ) : (
                  <>
                    <FaCheckCircle />
                    {type === "club" ? "Join Club" : "Register for Event"}
                  </>
                )}
              </button>
            )}

            {/* Security Notice */}
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>🔒 Secure payment processing</p>
              <p className="text-xs mt-1">
                Your payment information is encrypted
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PaymentModal;
