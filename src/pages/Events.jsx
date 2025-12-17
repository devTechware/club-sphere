import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { useEvents } from "../hooks/useEvents";
import {
  FaCalendar,
  FaMapMarkerAlt,
  FaDollarSign,
  FaSearch,
} from "react-icons/fa";

const Events = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("eventDate");

  const { data: events, isLoading, isError } = useEvents(search, sort);

  const sortOptions = [
    { value: "eventDate", label: "Event Date" },
    { value: "newest", label: "Recently Added" },
    { value: "oldest", label: "Oldest First" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-8"
      >
        Upcoming Events
      </motion.h1>

      {/* Search and Sort Section */}
      <div className="bg-base-200 p-6 rounded-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Search Events</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search events..."
                className="input input-bordered w-full pr-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <FaSearch className="absolute right-3 top-4 text-gray-400" />
            </div>
          </div>

          {/* Sort */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Sort By</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : isError ? (
        <div className="alert alert-error">
          <span>Error loading events. Please try again.</span>
        </div>
      ) : events?.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">No events found</p>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {events?.map((event) => (
            <motion.div
              key={event._id}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              className="card bg-base-100 shadow-xl"
            >
              <div className="card-body">
                <h2 className="card-title">{event.title}</h2>
                <p className="text-sm text-gray-600">
                  by <span className="font-semibold">{event.clubName}</span>
                </p>
                <p className="text-sm text-gray-600 line-clamp-2 mt-2">
                  {event.description}
                </p>

                <div className="space-y-2 mt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <FaCalendar className="text-primary" />
                    <span>
                      {new Date(event.eventDate).toLocaleDateString("en-US", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FaMapMarkerAlt className="text-primary" />
                    <span>{event.location}</span>
                  </div>
                  {event.isPaid && (
                    <div className="flex items-center gap-2 text-sm">
                      <FaDollarSign className="text-primary" />
                      <span>${event.eventFee}</span>
                    </div>
                  )}
                  {event.maxAttendees && (
                    <div className="text-sm text-gray-500">
                      {event.registrationCount || 0} / {event.maxAttendees}{" "}
                      registered
                    </div>
                  )}
                </div>

                <div className="card-actions justify-end mt-4">
                  <Link
                    to={`/events/${event._id}`}
                    className="btn btn-primary btn-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Events;
