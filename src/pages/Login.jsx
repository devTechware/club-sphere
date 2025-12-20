import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaEnvelope, FaLock, FaRocket } from "react-icons/fa";
import { motion } from "framer-motion";

const Login = () => {
  const { signIn, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get redirect URL from query params or state
  const searchParams = new URLSearchParams(location.search);
  const redirectUrl = searchParams.get("redirect") || "/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await signIn(data.email, data.password);
      toast.success("Welcome back!", {
        icon: "👋",
        style: {
          borderRadius: "12px",
          background: "#4ecdc4",
          color: "#fff",
          fontWeight: "600",
        },
      });
      // Navigate to dashboard (will auto-redirect to role-specific dashboard)
      navigate(redirectUrl, { replace: true });
    } catch (error) {
      toast.error(error.message || "Login failed");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      toast.success("Welcome!", {
        icon: "🎉",
        style: {
          borderRadius: "12px",
          background: "#4ecdc4",
          color: "#fff",
          fontWeight: "600",
        },
      });
      // Navigate to dashboard (will auto-redirect to role-specific dashboard)
      navigate(redirectUrl, { replace: true });
    } catch (error) {
      toast.error(error.message || "Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card w-full max-w-md bg-white shadow-2xl border-2 border-base-200"
      >
        <div className="card-body p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-primary to-secondary p-4 rounded-2xl">
              <FaRocket className="text-4xl text-white" />
            </div>
          </div>

          <h2 className="text-4xl font-black text-center mb-2">
            Welcome Back!
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Sign in to continue to ClubSphere
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold flex items-center gap-2">
                  <FaEnvelope className="text-primary" />
                  Email Address
                </span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className={`input input-bordered ${
                  errors.email ? "input-error" : "focus:input-primary"
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <label className="label">
                  <span className="label-text-alt text-error font-semibold">
                    {errors.email.message}
                  </span>
                </label>
              )}
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold flex items-center gap-2">
                  <FaLock className="text-primary" />
                  Password
                </span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className={`input input-bordered ${
                  errors.password ? "input-error" : "focus:input-primary"
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <label className="label">
                  <span className="label-text-alt text-error font-semibold">
                    {errors.password.message}
                  </span>
                </label>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full btn-lg font-bold"
            >
              Sign In
            </button>
          </form>

          <div className="divider font-semibold">OR</div>

          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline w-full btn-lg font-bold"
          >
            <FcGoogle className="text-2xl" />
            Continue with Google
          </button>

          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary hover:underline font-bold"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
