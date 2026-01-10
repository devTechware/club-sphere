import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import {
  FaEnvelope,
  FaLock,
  FaRocket,
  FaUserShield,
  FaUserTie,
  FaUser,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";

const Login = () => {
  const { signIn, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const redirectUrl = searchParams.get("redirect") || "/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
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
      navigate(redirectUrl, { replace: true });
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
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
      navigate(redirectUrl, { replace: true });
    } catch (error) {
      toast.error(error.message || "Google login failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Demo login credentials
  const demoAccounts = [
    {
      name: "Admin",
      email: "admin@clubsphere.com",
      password: "Admin123!",
      icon: <FaUserShield className="text-xl" />,
      color: "from-error to-warning",
    },
    {
      name: "Manager",
      email: "manager@clubsphere.com",
      password: "Manager123!",
      icon: <FaUserTie className="text-xl" />,
      color: "from-secondary to-info",
    },
    {
      name: "Member",
      email: "member@clubsphere.com",
      password: "Member123!",
      icon: <FaUser className="text-xl" />,
      color: "from-primary to-accent",
    },
  ];

  const handleDemoLogin = (email, password) => {
    setValue("email", email);
    setValue("password", password);
    toast.success("Demo credentials filled! Click Login to continue.", {
      icon: "✨",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary/10 via-secondary/10 to-accent/10 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card w-full max-w-md bg-base-100 shadow-2xl border-2 border-base-200"
      >
        <div className="card-body p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="bg-linear-to-br from-primary to-secondary p-4 rounded-2xl">
              <FaRocket className="text-4xl text-white" />
            </div>
          </div>

          <h2 className="text-4xl font-black text-center mb-2">
            Welcome Back!
          </h2>
          <p className="text-center text-base-content/70 mb-8">
            Sign in to continue to ClubSphere
          </p>

          {/* Demo Login Section */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-center mb-3 text-base-content/60">
              🎯 Quick Demo Login
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {demoAccounts.map((account) => (
                <motion.button
                  key={account.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    handleDemoLogin(account.email, account.password)
                  }
                  className={`btn btn-sm bg-linear-to-r ${account.color} text-white border-0 flex flex-col items-center justify-center h-auto py-3 gap-1`}
                  disabled={isLoading}
                >
                  {account.icon}
                  <span className="text-xs font-bold">{account.name}</span>
                </motion.button>
              ))}
            </div>
            <p className="text-xs text-center mt-2 text-base-content/50">
              Click to auto-fill credentials
            </p>
          </div>

          <div className="divider text-xs font-semibold text-base-content/50">
            OR SIGN IN WITH EMAIL
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <FaEnvelope className="text-primary" />
                  Email Address
                </span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className={`input input-bordered w-full text-base ${
                  errors.email ? "input-error" : ""
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
                <span className="label-text flex items-center gap-2">
                  <FaLock className="text-primary" />
                  Password
                </span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className={`input input-bordered w-full text-base ${
                  errors.password ? "input-error" : ""
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
              disabled={isLoading}
              className="btn btn-primary w-full btn-lg font-bold text-white"
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="divider font-semibold text-base-content/50">OR</div>

          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="btn btn-outline w-full btn-lg font-bold border-2 hover:bg-base-200"
          >
            <FcGoogle className="text-2xl" />
            Continue with Google
          </button>

          <p className="text-center mt-6 text-base-content/70">
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
