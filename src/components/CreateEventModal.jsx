import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaCalendar } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import api from "../utils/api";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const CreateEventModal = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const isPaid = watch("isPaid");

  // Fetch manager's clubs
  const { data: clubs } = useQuery({
    queryKey: ["managerClubs"],
    queryFn: async () => {
      const response = await api.get("/clubs");
      return response.data.filter(
        (club) =>
          club.managerEmail === user?.email && club.status === "approved"
      );
    },
    enabled: isOpen,
  });

  const createEventMutation = useMutation({
    mutationFn: async (eventData) => {
      const response = await api.post("/events", eventData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["managerEvents"]);
      queryClient.invalidateQueries(["managerStats"]);
      toast.success("Event created successfully!", {
        icon: "🎉",
        duration: 4000,
      });
      reset();
      onClose();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create event");
    },
  });

  const onSubmit = (data) => {
    const selectedClub = clubs.find((c) => c._id === data.clubId);

    createEventMutation.mutate({
      ...data,
      clubName: selectedClub?.clubName || "",
      isPaid: data.isPaid === "true",
      eventFee: data.isPaid === "true" ? parseFloat(data.eventFee) : 0,
      maxAttendees: parseInt(data.maxAttendees) || 0,
    });
  };

  if (!isOpen) return null;

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
          <div className="bg-gradient-to-r from-secondary to-accent p-6 text-white sticky top-0">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-black mb-2 flex items-center gap-2">
                  <FaCalendar />
                  Create New Event
                </h2>
                <p className="text-white/90">Fill in the event details</p>
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
            {/* Select Club */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Select Club *</span>
              </label>
              <select
                className={`select select-bordered ${
                  errors.clubId ? "select-error" : ""
                }`}
                {...register("clubId", { required: "Please select a club" })}
              >
                <option value="">Choose a club</option>
                {clubs?.map((club) => (
                  <option key={club._id} value={club._id}>
                    {club.clubName}
                  </option>
                ))}
              </select>
              {errors.clubId && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.clubId.message}
                  </span>
                </label>
              )}
            </div>

            {/* Event Title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Event Title *</span>
              </label>
              <input
                type="text"
                placeholder="Enter event title"
                className={`input input-bordered ${
                  errors.title ? "input-error" : ""
                }`}
                {...register("title", { required: "Event title is required" })}
              />
              {errors.title && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.title.message}
                  </span>
                </label>
              )}
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Description *</span>
              </label>
              <textarea
                placeholder="Describe your event..."
                className={`textarea textarea-bordered h-24 ${
                  errors.description ? "textarea-error" : ""
                }`}
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 20,
                    message: "Description must be at least 20 characters",
                  },
                })}
              />
              {errors.description && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.description.message}
                  </span>
                </label>
              )}
            </div>

            {/* Event Date & Time */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">
                  Event Date & Time *
                </span>
              </label>
              <input
                type="datetime-local"
                className={`input input-bordered ${
                  errors.eventDate ? "input-error" : ""
                }`}
                {...register("eventDate", {
                  required: "Event date is required",
                  validate: (value) =>
                    new Date(value) > new Date() ||
                    "Event must be in the future",
                })}
              />
              {errors.eventDate && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.eventDate.message}
                  </span>
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
                placeholder="Enter event location"
                className={`input input-bordered ${
                  errors.location ? "input-error" : ""
                }`}
                {...register("location", { required: "Location is required" })}
              />
              {errors.location && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.location.message}
                  </span>
                </label>
              )}
            </div>

            {/* Max Attendees */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Max Attendees *</span>
              </label>
              <input
                type="number"
                min="1"
                placeholder="50"
                className={`input input-bordered ${
                  errors.maxAttendees ? "input-error" : ""
                }`}
                {...register("maxAttendees", {
                  required: "Max attendees is required",
                  min: { value: 1, message: "Must be at least 1" },
                })}
              />
              {errors.maxAttendees && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.maxAttendees.message}
                  </span>
                </label>
              )}
            </div>

            {/* Is Paid */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Event Type *</span>
              </label>
              <select
                className="select select-bordered"
                {...register("isPaid", { required: true })}
              >
                <option value="false">Free Event</option>
                <option value="true">Paid Event</option>
              </select>
            </div>

            {/* Event Fee (conditional) */}
            {isPaid === "true" && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">
                    Event Fee (USD) *
                  </span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder="10.00"
                  className={`input input-bordered ${
                    errors.eventFee ? "input-error" : ""
                  }`}
                  {...register("eventFee", {
                    required:
                      isPaid === "true"
                        ? "Event fee is required for paid events"
                        : false,
                    min: { value: 0.01, message: "Fee must be greater than 0" },
                  })}
                />
                {errors.eventFee && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.eventFee.message}
                    </span>
                  </label>
                )}
              </div>
            )}

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
                disabled={createEventMutation.isLoading}
                className="btn btn-secondary flex-1"
              >
                {createEventMutation.isLoading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Creating...
                  </>
                ) : (
                  "Create Event"
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CreateEventModal;
