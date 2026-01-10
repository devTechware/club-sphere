import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import api from "../utils/api";
import toast from "react-hot-toast";
import {
  FaUser,
  FaEnvelope,
  FaImage,
  FaLock,
  FaSave,
  FaCamera,
  FaEdit,
  FaKey,
} from "react-icons/fa";

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const queryClient = useQueryClient();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Fetch user profile from database
  const { data: profile, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const response = await api.get("/users/profile");
      return response.data;
    },
  });

  // Profile update form
  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors },
    reset: resetProfile,
  } = useForm({
    values: {
      name: user?.displayName || "",
      photoURL: user?.photoURL || "",
    },
  });

  // Password change form
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
    reset: resetPassword,
    watch,
  } = useForm();

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (data) => {
      await updateUserProfile(data.name, data.photoURL);
      const response = await api.patch("/users/profile", {
        name: data.name,
        photoURL: data.photoURL,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["userProfile"]);
      toast.success("Profile updated successfully!", {
        icon: "✅",
      });
      setIsEditingProfile(false);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update profile");
    },
  });

  // Change password mutation
  const changePasswordMutation = useMutation({
    mutationFn: async (data) => {
      // Firebase password change
      const {
        updatePassword,
        EmailAuthProvider,
        reauthenticateWithCredential,
      } = await import("firebase/auth");
      const { auth } = await import("../firebase/firebase.config");

      const credential = EmailAuthProvider.credential(
        user.email,
        data.currentPassword
      );

      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, data.newPassword);
    },
    onSuccess: () => {
      toast.success("Password changed successfully!", {
        icon: "🔒",
      });
      setIsChangingPassword(false);
      resetPassword();
    },
    onError: (error) => {
      if (error.code === "auth/wrong-password") {
        toast.error("Current password is incorrect");
      } else if (error.code === "auth/weak-password") {
        toast.error("New password is too weak");
      } else {
        toast.error(error.message || "Failed to change password");
      }
    },
  });

  const onSubmitProfile = (data) => {
    updateProfileMutation.mutate(data);
  };

  const onSubmitPassword = (data) => {
    changePasswordMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 font-semibold">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black mb-2">
            My <span className="text-gradient">Profile</span>
          </h1>
          <p className="text-lg text-base-content/70">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Overview Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="card bg-base-100 shadow-xl border-2 border-base-200">
              <div className="card-body items-center text-center">
                {/* Avatar */}
                <div className="relative">
                  <div className="avatar">
                    <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img
                        src={
                          user?.photoURL ||
                          `https://ui-avatars.com/api/?name=${user?.displayName}`
                        }
                        alt={user?.displayName}
                      />
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full">
                    <FaCamera />
                  </div>
                </div>

                {/* User Info */}
                <h2 className="text-2xl font-bold mt-4">{user?.displayName}</h2>
                <p className="text-base-content/70">{user?.email}</p>

                {/* Role Badge */}
                <div className="badge badge-lg badge-primary font-bold mt-2">
                  {profile?.role === "admin" && "Administrator"}
                  {profile?.role === "clubManager" && "Club Manager"}
                  {profile?.role === "member" && "Member"}
                </div>

                {/* Stats */}
                <div className="stats stats-vertical shadow mt-6 w-full">
                  <div className="stat">
                    <div className="stat-title">Member Since</div>
                    <div className="stat-value text-lg">
                      {new Date(profile?.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Profile Details & Settings */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Edit Profile Section */}
            <div className="card bg-base-100 shadow-xl border-2 border-base-200">
              <div className="card-body">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    <FaUser className="text-primary" />
                    Profile Information
                  </h3>
                  {!isEditingProfile && (
                    <button
                      onClick={() => setIsEditingProfile(true)}
                      className="btn btn-sm btn-primary"
                    >
                      <FaEdit />
                      Edit
                    </button>
                  )}
                </div>

                {isEditingProfile ? (
                  <form
                    onSubmit={handleSubmitProfile(onSubmitProfile)}
                    className="space-y-4"
                  >
                    {/* Name */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-bold">Full Name</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        className={`input input-bordered ${
                          profileErrors.name ? "input-error" : ""
                        }`}
                        {...registerProfile("name", {
                          required: "Name is required",
                          minLength: {
                            value: 3,
                            message: "Name must be at least 3 characters",
                          },
                        })}
                      />
                      {profileErrors.name && (
                        <label className="label">
                          <span className="label-text-alt text-error">
                            {profileErrors.name.message}
                          </span>
                        </label>
                      )}
                    </div>

                    {/* Photo URL */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-bold">Photo URL</span>
                      </label>
                      <input
                        type="url"
                        placeholder="https://example.com/photo.jpg"
                        className={`input input-bordered ${
                          profileErrors.photoURL ? "input-error" : ""
                        }`}
                        {...registerProfile("photoURL", {
                          pattern: {
                            value: /^https?:\/\/.+/i,
                            message: "Invalid URL format",
                          },
                        })}
                      />
                      {profileErrors.photoURL && (
                        <label className="label">
                          <span className="label-text-alt text-error">
                            {profileErrors.photoURL.message}
                          </span>
                        </label>
                      )}
                    </div>

                    {/* Email (Read-only) */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-bold">
                          Email Address
                        </span>
                      </label>
                      <input
                        type="email"
                        value={user?.email}
                        disabled
                        className="input input-bordered bg-base-200 cursor-not-allowed"
                      />
                      <label className="label">
                        <span className="label-text-alt">
                          Email cannot be changed
                        </span>
                      </label>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditingProfile(false);
                          resetProfile();
                        }}
                        className="btn btn-outline flex-1"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={updateProfileMutation.isLoading}
                        className="btn btn-primary flex-1"
                      >
                        {updateProfileMutation.isLoading ? (
                          <>
                            <span className="loading loading-spinner"></span>
                            Saving...
                          </>
                        ) : (
                          <>
                            <FaSave />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-base-200 rounded-lg">
                      <FaUser className="text-2xl text-primary" />
                      <div>
                        <p className="text-sm text-base-content/70">
                          Full Name
                        </p>
                        <p className="font-bold">{user?.displayName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-base-200 rounded-lg">
                      <FaEnvelope className="text-2xl text-secondary" />
                      <div>
                        <p className="text-sm text-base-content/70">
                          Email Address
                        </p>
                        <p className="font-bold">{user?.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-base-200 rounded-lg">
                      <FaImage className="text-2xl text-accent" />
                      <div className="flex-1 overflow-hidden">
                        <p className="text-sm text-base-content/70">
                          Profile Photo
                        </p>
                        <p className="font-bold text-sm truncate">
                          {user?.photoURL || "Default Avatar"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Change Password Section */}
            <div className="card bg-base-100 shadow-xl border-2 border-base-200">
              <div className="card-body">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    <FaLock className="text-primary" />
                    Change Password
                  </h3>
                  {!isChangingPassword && (
                    <button
                      onClick={() => setIsChangingPassword(true)}
                      className="btn btn-sm btn-primary"
                    >
                      <FaKey />
                      Change
                    </button>
                  )}
                </div>

                {isChangingPassword ? (
                  <form
                    onSubmit={handleSubmitPassword(onSubmitPassword)}
                    className="space-y-4"
                  >
                    {/* Current Password */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-bold">
                          Current Password
                        </span>
                      </label>
                      <input
                        type="password"
                        placeholder="Enter current password"
                        className={`input input-bordered ${
                          passwordErrors.currentPassword ? "input-error" : ""
                        }`}
                        {...registerPassword("currentPassword", {
                          required: "Current password is required",
                        })}
                      />
                      {passwordErrors.currentPassword && (
                        <label className="label">
                          <span className="label-text-alt text-error">
                            {passwordErrors.currentPassword.message}
                          </span>
                        </label>
                      )}
                    </div>

                    {/* New Password */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-bold">
                          New Password
                        </span>
                      </label>
                      <input
                        type="password"
                        placeholder="Enter new password"
                        className={`input input-bordered ${
                          passwordErrors.newPassword ? "input-error" : ""
                        }`}
                        {...registerPassword("newPassword", {
                          required: "New password is required",
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
                      {passwordErrors.newPassword && (
                        <label className="label">
                          <span className="label-text-alt text-error">
                            {passwordErrors.newPassword.message}
                          </span>
                        </label>
                      )}
                    </div>

                    {/* Confirm New Password */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-bold">
                          Confirm New Password
                        </span>
                      </label>
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        className={`input input-bordered ${
                          passwordErrors.confirmPassword ? "input-error" : ""
                        }`}
                        {...registerPassword("confirmPassword", {
                          required: "Please confirm your new password",
                          validate: (value) =>
                            value === watch("newPassword") ||
                            "Passwords do not match",
                        })}
                      />
                      {passwordErrors.confirmPassword && (
                        <label className="label">
                          <span className="label-text-alt text-error">
                            {passwordErrors.confirmPassword.message}
                          </span>
                        </label>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setIsChangingPassword(false);
                          resetPassword();
                        }}
                        className="btn btn-outline flex-1"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={changePasswordMutation.isLoading}
                        className="btn btn-primary flex-1"
                      >
                        {changePasswordMutation.isLoading ? (
                          <>
                            <span className="loading loading-spinner"></span>
                            Changing...
                          </>
                        ) : (
                          <>
                            <FaKey />
                            Change Password
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="alert alert-info">
                    <FaLock className="text-xl" />
                    <div>
                      <p className="font-semibold">Password is secured</p>
                      <p className="text-sm">
                        Click "Change" to update your password
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
