import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaBuilding } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import api from "../utils/api";
import toast from "react-hot-toast";

const CreateClubModal = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const createClubMutation = useMutation({
    mutationFn: async (clubData) => {
      const response = await api.post("/clubs", clubData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["managerClubs"]);
      queryClient.invalidateQueries(["managerStats"]);
      toast.success("Club created successfully! Waiting for admin approval.", {
        icon: "🎉",
        duration: 4000,
      });
      reset();
      onClose();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create club");
    },
  });

  const onSubmit = (data) => {
    createClubMutation.mutate({
      ...data,
      membershipFee: parseFloat(data.membershipFee) || 0,
    });
  };

  if (!isOpen) return null;

  const categories = [
    "Technology",
    "Sports",
    "Arts",
    "Music",
    "Gaming",
    "Photography",
    "Reading",
    "Fitness",
    "Other",
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white sticky top-0">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-black mb-2 flex items-center gap-2">
                  <FaBuilding />
                  Create New Club
                </h2>
                <p className="text-white/90">Fill in the details below</p>
              </div>
              <button
                onClick={onClose}
                className="btn btn-ghost btn-sm btn-circle text-white hover:bg-white/20"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
            {/* Club Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Club Name *</span>
              </label>
              <input
                type="text"
                placeholder="Enter club name"
                className={`input input-bordered ${errors.clubName ? "input-error" : ""}`}
                {...register("clubName", { required: "Club name is required" })}
              />
              {errors.clubName && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.clubName.message}</span>
                </label>
              )}
            </div>

            {/* Category */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Category *</span>
              </label>
              <select
                className={`select select-bordered ${errors.category ? "select-error" : ""}`}
                {...register("category", { required: "Category is required" })}
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.category.message}</span>
                </label>
              )}
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Description *</span>
              </label>
              <textarea
                placeholder="Describe your club..."
                className={`textarea textarea-bordered h-24 ${errors.description ? "textarea-error" : ""}`}
                {...register("description", { 
                  required: "Description is required",
                  minLength: { value: 20, message: "Description must be at least 20 characters" }
                })}
              />
              {errors.description && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.description.message}</span>
                </label>
              )}
            </div>

            {/* Location */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Location *</span>
              </label>
              <input
                type="text"
                placeholder="Enter location"
                className={`input input-bordered ${errors.location ? "input-error" : ""}`}
                {...register("location", { required: "Location is required" })}
              />
              {errors.location && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.location.message}</span>
                </label>
              )}
            </div>

            {/* Banner Image URL */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Banner Image URL (Optional)</span>
              </label>
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                className="input input-bordered"
                {...register("bannerImage", {
                  pattern: {
                    value: /^https?:\/\/.+/i,
                    message: "Invalid URL format"
                  }
                })}
              />
              {errors.bannerImage && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.bannerImage.message}</span>
                </label>
              )}
            </div>

            {/* Membership Fee */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Membership Fee (USD) *</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                className={`input input-bordered ${errors.membershipFee ? "input-error" : ""}`}
                {...register("membershipFee", { 
                  required: "Membership fee is required",
                  min: { value: 0, message: "Fee cannot be negative" }
                })}
              />
              {errors.membershipFee && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.membershipFee.message}</span>
                </label>
              )}
              <label className="label">
                <span className="label-text-alt">Enter 0 for free membership</span>
              </label>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-outline flex-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={createClubMutation.isLoading}
                className="btn btn-primary flex-1"
              >
                {createClubMutation.isLoading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Creating...
                  </>
                ) : (
                  "Create Club"
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CreateClubModal;