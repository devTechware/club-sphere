import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { useEvents } from "../hooks/useEvents";
import {
  FaCalendar,
  FaMapMarkerAlt,
  FaDollarSign,
  FaSearch,
  FaFilter,
  FaArrowRight,
  FaClock,
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

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header Section */}
      <section className="bg-linear-to-r from-secondary to-accent py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl md:text-6xl font-black mb-4">
              Upcoming Events
            </h1>
            <p className="text-xl md:text-2xl font-medium max-w-2xl mx-auto">
              Join exciting activities and make unforgettable memories
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-xl rounded-2xl p-6 mb-12 border-2 border-base-200"
        >
          <div className="flex items-center gap-2 mb-6">
            <FaFilter className="text-2xl text-secondary" />
            <h2 className="text-2xl font-bold">Search & Sort</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Search */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-base">
                  Search Events
                </span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by title..."
                  className="input input-bordered w-full pr-10 focus:input-secondary"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <FaSearch className="absolute right-4 top-4 text-gray-400" />
              </div>
            </div>

            {/* Sort */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-base">Sort By</span>
              </label>
              <select
                className="select select-bordered w-full focus:select-secondary"
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
        </motion.div>

        {/* Results Count */}
        {!isLoading && events && (
          <div className="flex items-center justify-between mb-8">
            <p className="text-lg font-semibold text-gray-600">
              Found{" "}
              <span className="text-secondary font-bold">{events.length}</span>{" "}
              events
            </p>
          </div>
        )}

        {/* Events Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-24">
            <div className="text-center">
              <span className="loading loading-spinner loading-lg text-secondary"></span>
              <p className="mt-4 text-gray-600 font-medium">
                Loading exciting events...
              </p>
            </div>
          </div>
        ) : isError ? (
          <div className="alert alert-error shadow-lg">
            <span>Error loading events. Please try again.</span>
          </div>
        ) : events?.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">📅</div>
            <p className="text-2xl font-bold text-gray-600 mb-2">
              No events found
            </p>
            <p className="text-gray-500">Check back soon for new events!</p>
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {events?.map((event) => (
              <motion.div
                key={event._id}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
              >
                <Link to={`/events/${event._id}`}>
                  <div className="card bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-secondary h-full">
                    <div className="card-body">
                      <div className="flex items-center justify-between mb-3">
                        <div className="badge badge-secondary badge-lg font-bold">
                          {event.clubName}
                        </div>
                        {event.isPaid && (
                          <div className="badge badge-accent font-bold">
                            ${event.eventFee}
                          </div>
                        )}
                      </div>

                      <h2 className="card-title text-xl font-bold line-clamp-2">
                        {event.title}
                      </h2>

                      <p className="text-gray-600 line-clamp-3 flex-grow">
                        {event.description}
                      </p>

                      <div className="divider my-2"></div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-3 bg-secondary/10 p-3 rounded-xl">
                          <FaCalendar className="text-secondary text-lg flex-shrink-0" />
                          <div>
                            <p className="text-xs text-gray-600 font-semibold">
                              Date
                            </p>
                            <p className="font-bold text-sm">
                              {new Date(event.eventDate).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 bg-primary/10 p-3 rounded-xl">
                          <FaMapMarkerAlt className="text-primary text-lg flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs text-gray-600 font-semibold">
                              Location
                            </p>
                            <p className="font-bold text-sm truncate">
                              {event.location}
                            </p>
                          </div>
                        </div>

                        {event.maxAttendees && (
                          <div className="flex items-center gap-3 bg-accent/10 p-3 rounded-xl">
                            <FaClock className="text-accent text-lg flex-shrink-0" />
                            <div>
                              <p className="text-xs text-gray-600 font-semibold">
                                Spots
                              </p>
                              <p className="font-bold text-sm">
                                {event.registrationCount || 0} /{" "}
                                {event.maxAttendees}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      <button className="btn btn-secondary w-full mt-4 font-bold group">
                        View Details
                        <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Events;
