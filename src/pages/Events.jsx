import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { useEvents } from "../hooks/useEvents";
import EventCardSkeleton from "../components/skeletons/EventCardSkeleton";
import {
  FaSearch,
  FaFilter,
  FaCalendar,
  FaMapMarkerAlt,
  FaClock,
  FaUsers,
  FaArrowRight,
} from "react-icons/fa";

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  const { data: events, isLoading } = useEvents({
    search: searchTerm,
    type: filterType,
    sort: sortBy,
  });

  const filterOptions = [
    { value: "all", label: "All Events" },
    { value: "free", label: "Free Events" },
    { value: "paid", label: "Paid Events" },
    { value: "upcoming", label: "Upcoming" },
    { value: "past", label: "Past Events" },
  ];

  const sortOptions = [
    { value: "date", label: "Date (Nearest First)" },
    { value: "date-desc", label: "Date (Latest First)" },
    { value: "name", label: "Name (A-Z)" },
    { value: "fee-low", label: "Fee (Low to High)" },
    { value: "fee-high", label: "Fee (High to Low)" },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const isUpcoming = (eventDate) => {
    return new Date(eventDate) >= new Date();
  };

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header Section */}
      <section className="bg-linear-to-r from-secondary/20 via-accent/20 to-primary/20 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-black mb-4">
              Upcoming <span className="text-gradient">Events</span>
            </h1>
            <p className="text-lg md:text-xl text-base-content/70 mb-8">
              Discover and register for exciting events in your community
            </p>

            <div className="relative max-w-2xl mx-auto">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50 text-xl" />
              <input
                type="text"
                placeholder="Search events by title or description..."
                className="input input-bordered input-lg w-full pl-12 pr-4 shadow-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-base-200 border-y-2 border-base-300 sticky top-[73px] z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilterType(option.value)}
                  className={`btn btn-sm ${
                    filterType === option.value
                      ? "btn-secondary"
                      : "btn-outline"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <FaFilter className="text-base-content/70" />
              <select
                className="select select-bordered select-sm font-semibold"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
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
      </section>

      {/* Events Grid Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {!isLoading && (
            <div className="mb-8">
              <p className="text-base-content/70 font-semibold">
                {events?.length || 0} events found
                {searchTerm && <span> for "{searchTerm}"</span>}
              </p>
            </div>
          )}

          {/* Skeleton Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <EventCardSkeleton key={index} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && events?.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-2xl font-bold mb-2">No events found</h3>
              <p className="text-base-content/70 mb-6">
                Try adjusting your search or filters
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterType("all");
                  setSortBy("date");
                }}
                className="btn btn-secondary"
              >
                Clear Filters
              </button>
            </motion.div>
          )}

          {/* Events Grid */}
          {!isLoading && events && events.length > 0 && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {events.map((event) => (
                <motion.div key={event._id} variants={fadeInUp}>
                  <Link to={`/events/${event._id}`}>
                    <div className="card bg-base-100 shadow-xl border-2 border-base-200 card-hover h-full">
                      <div className="card-body p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div className="badge badge-secondary font-bold text-xs">
                            {event.clubName}
                          </div>
                          {event.isPaid ? (
                            <div className="badge badge-accent font-bold text-xs">
                              ${event.eventFee}
                            </div>
                          ) : (
                            <div className="badge badge-success font-bold text-xs">
                              FREE
                            </div>
                          )}
                        </div>

                        <h3 className="card-title text-lg font-bold line-clamp-2 mb-2">
                          {event.title}
                        </h3>

                        <p className="text-base-content/70 text-sm line-clamp-2 leading-relaxed mb-3">
                          {event.description}
                        </p>

                        <div className="divider my-2"></div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <FaCalendar className="text-secondary flex-shrink-0" />
                            <span className="font-semibold">
                              {new Date(event.eventDate).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-sm">
                            <FaClock className="text-accent flex-shrink-0" />
                            <span className="font-semibold">
                              {new Date(event.eventDate).toLocaleTimeString(
                                "en-US",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-sm">
                            <FaMapMarkerAlt className="text-primary flex-shrink-0" />
                            <span className="truncate font-semibold">
                              {event.location}
                            </span>
                          </div>

                          {event.maxParticipants && (
                            <div className="flex items-center gap-2 text-sm">
                              <FaUsers className="text-info flex-shrink-0" />
                              <span className="font-semibold">
                                {event.registeredCount || 0} /{" "}
                                {event.maxParticipants} spots
                              </span>
                            </div>
                          )}
                        </div>

                        <button
                          className={`btn btn-sm w-full mt-4 font-bold group ${
                            isUpcoming(event.eventDate)
                              ? "btn-secondary"
                              : "btn-disabled"
                          }`}
                          disabled={!isUpcoming(event.eventDate)}
                        >
                          {isUpcoming(event.eventDate) ? (
                            <>
                              Register Now
                              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </>
                          ) : (
                            "Event Ended"
                          )}
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Events;
