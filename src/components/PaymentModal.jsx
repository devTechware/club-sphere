import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaCheckCircle } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import api from "../utils/api";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import StripePaymentForm from "./StripePaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentModal = ({ isOpen, onClose, type, item, onSuccess }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [clientSecret, setClientSecret] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCreatingIntent, setIsCreatingIntent] = useState(false);

  const amount = type === "club" ? item.membershipFee : item.eventFee;
  const isFree = amount === 0;

  // Create payment intent when modal opens
  useEffect(() => {
    if (isOpen && !isFree && !clientSecret) {
      createPaymentIntent();
    }
  }, [isOpen, isFree]);

  const createPaymentIntent = async () => {
    setIsCreatingIntent(true);
    try {
      const endpoint =
        type === "club"
          ? "/stripe/create-payment-intent"
          : "/stripe/create-event-payment-intent";

      const payload =
        type === "club"
          ? { clubId: item._id, amount }
          : { eventId: item._id, amount };

      const response = await api.post(endpoint, payload);
      setClientSecret(response.data.clientSecret);
    } catch (error) {
      console.error("Error creating payment intent:", error);
      toast.error("Failed to initialize payment");
      onClose();
    } finally {
      setIsCreatingIntent(false);
    }
  };

  // Payment mutation for free items or after successful payment
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
      toast.error(error.response?.data?.message || "Operation failed");
      setIsProcessing(false);
    },
  });

  const handleFreeJoin = async () => {
    setIsProcessing(true);
    const paymentData = {
      type: type === "club" ? "membership" : "event",
      amount: 0,
      clubId: type === "club" ? item._id : item.clubId,
      eventId: type === "event" ? item._id : undefined,
      stripePaymentIntentId: `free_${Date.now()}`,
    };

    paymentMutation.mutate(paymentData);
  };

  const handlePaymentSuccess = (paymentIntent) => {
    setIsProcessing(true);
    const paymentData = {
      type: type === "club" ? "membership" : "event",
      amount,
      clubId: type === "club" ? item._id : item.clubId,
      eventId: type === "event" ? item._id : undefined,
      stripePaymentIntentId: paymentIntent.id,
    };

    paymentMutation.mutate(paymentData);
  };

  const handlePaymentError = (error) => {
    console.error("Payment error:", error);
    toast.error(error.message || "Payment failed");
  };

  if (!isOpen) return null;

  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#ff6b6b",
    },
  };

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
          <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
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

            {/* Payment Form or Free Join */}
            {isFree ? (
              <button
                onClick={handleFreeJoin}
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
            ) : isCreatingIntent ? (
              <div className="flex justify-center py-8">
                <span className="loading loading-spinner loading-lg text-primary"></span>
              </div>
            ) : clientSecret ? (
              <Elements
                stripe={stripePromise}
                options={{ clientSecret, appearance }}
              >
                <StripePaymentForm
                  amount={amount}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />
              </Elements>
            ) : null}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PaymentModal;
