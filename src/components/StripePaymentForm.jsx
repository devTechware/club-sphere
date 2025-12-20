import { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { FaLock } from "react-icons/fa";

const StripePaymentForm = ({ amount, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      if (error) {
        setErrorMessage(error.message);
        if (onError) onError(error);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        if (onSuccess) onSuccess(paymentIntent);
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred.");
      if (onError) onError(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />

      {errorMessage && (
        <div className="alert alert-error">
          <span>{errorMessage}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="btn btn-primary w-full btn-lg font-bold"
      >
        {isProcessing ? (
          <>
            <span className="loading loading-spinner"></span>
            Processing...
          </>
        ) : (
          <>
            <FaLock />
            Pay ${amount.toFixed(2)}
          </>
        )}
      </button>

      <div className="text-center text-sm text-gray-500">
        <p>🔒 Secure payment processing by Stripe</p>
        <p className="text-xs mt-1">Your payment information is encrypted</p>
      </div>
    </form>
  );
};

export default StripePaymentForm;
