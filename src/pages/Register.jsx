import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaUser, FaEnvelope, FaLock, FaImage, FaRocket } from "react-icons/fa";
import { motion } from "framer-motion";

const Register = () => {
  const { createUser, updateUserProfile, googleSignIn, saveUserToDatabase } =
    useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // 1. Create user in Firebase
      const result = await createUser(data.email, data.password);

      // 2. Update profile in Firebase
      await updateUserProfile(
        data.name,
        data.photoURL ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}`
      );

      // 3. Manually save to database with complete info
      await saveUserToDatabase({
        name: data.name,
        email: data.email,
        photoURL:
          data.photoURL ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}`,
      });

      toast.success("Account created successfully!", {
        icon: "🎉",
        style: {
          borderRadius: "12px",
          background: "#4ecdc4",
          color: "#fff",
          fontWeight: "600",
        },
      });

      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.message || "Registration failed");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      // Note: Google sign-in automatically triggers onAuthStateChanged
      // which saves the user to database
      toast.success("Welcome to ClubSphere!", {
        icon: "🎉",
        style: {
          borderRadius: "12px",
          background: "#4ecdc4",
          color: "#fff",
          fontWeight: "600",
        },
      });
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Google sign-in failed");
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
            Join ClubSphere
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Create your account and start connecting
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold flex items-center gap-2">
                  <FaUser className="text-primary" />
                  Full Name
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className={`input input-bordered ${
                  errors.name ? "input-error" : "focus:input-primary"
                }`}
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                })}
              />
              {errors.name && (
                <label className="label">
                  <span className="label-text-alt text-error font-semibold">
                    {errors.name.message}
                  </span>
                </label>
              )}
            </div>

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

            {/* Photo URL */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold flex items-center gap-2">
                  <FaImage className="text-primary" />
                  Photo URL (Optional)
                </span>
              </label>
              <input
                type="url"
                placeholder="https://example.com/photo.jpg"
                className={`input input-bordered ${
                  errors.photoURL ? "input-error" : "focus:input-primary"
                }`}
                {...register("photoURL", {
                  pattern: {
                    value: /^https?:\/\/.+/i,
                    message: "Invalid URL",
                  },
                })}
              />
              {errors.photoURL && (
                <label className="label">
                  <span className="label-text-alt text-error font-semibold">
                    {errors.photoURL.message}
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
                placeholder="Create a password"
                className={`input input-bordered ${
                  errors.password ? "input-error" : "focus:input-primary"
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                    message:
                      "Password must contain uppercase and lowercase letters",
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

            {/* Confirm Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold flex items-center gap-2">
                  <FaLock className="text-primary" />
                  Confirm Password
                </span>
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                className={`input input-bordered ${
                  errors.confirmPassword ? "input-error" : "focus:input-primary"
                }`}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === getValues("password") || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <label className="label">
                  <span className="label-text-alt text-error font-semibold">
                    {errors.confirmPassword.message}
                  </span>
                </label>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full btn-lg font-bold"
            >
              Create Account
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
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary hover:underline font-bold"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
