import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import { useEventDetails } from "../hooks/useEvents";
import {
  FaCalendar,
  FaMapMarkerAlt,
  FaDollarSign,
  FaUsers,
  FaClock,
  FaArrowLeft,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

const EventDetails = () => {
  const { id } = useParams();
  const { data: event, isLoading, isError } = useEventDetails(id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-secondary"></span>
          <p className="mt-4 font-semibold">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (isError || !event) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error shadow-lg">
          <span>Event not found</span>
        </div>
      </div>
    );
  }

  const eventDate = new Date(event.eventDate);
  console.log(eventDate);

  const isUpcoming = eventDate > new Date();
  const spotsLeft = event.maxAttendees
    ? event.maxAttendees - (event.registrationCount || 0)
    : null;

  return (
    <div className="min-h-screen bg-base-100">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Link to="/events" className="btn btn-ghost gap-2">
          <FaArrowLeft />
          Back to Events
        </Link>
      </div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-linear-to-r from-secondary to-accent py-16"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl"
          >
            <div className="flex flex-wrap gap-3 mb-4">
              <div className="badge badge-lg bg-white text-secondary font-bold border-0">
                {event.clubName}
              </div>
              {isUpcoming ? (
                <div className="badge badge-lg badge-success font-bold">
                  Upcoming
                </div>
              ) : (
                <div className="badge badge-lg badge-neutral font-bold">
                  Past Event
                </div>
              )}
              {event.isPaid && (
                <div className="badge badge-lg badge-accent font-bold">
                  ${event.eventFee}
                </div>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              {event.title}
            </h1>

            <div className="flex flex-wrap gap-4 text-white">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <FaCalendar />
                <span className="font-semibold">
                  {eventDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <FaClock />
                <span className="font-semibold">
                  {eventDate.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl p-8 border-2 border-base-200 mb-8"
            >
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-secondary rounded"></span>
                About This Event
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                {event.description}
              </p>
            </motion.div>

            {/* Event Information Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-8 border-2 border-base-200"
            >
              <h3 className="text-2xl font-bold mb-6">Event Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 bg-secondary/10 p-4 rounded-xl">
                  <div className="bg-secondary text-white p-3 rounded-lg">
                    <FaCalendar className="text-xl" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-600">
                      Date & Time
                    </p>
                    <p className="font-semibold text-base">
                      {eventDate.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-sm text-gray-600">
                      {eventDate.toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-primary/10 p-4 rounded-xl">
                  <div className="bg-primary text-white p-3 rounded-lg">
                    <FaMapMarkerAlt className="text-xl" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-sm text-gray-600">Location</p>
                    <p className="font-semibold text-base break-words">
                      {event.location}
                    </p>
                  </div>
                </div>

                {event.isPaid && (
                  <div className="flex items-start gap-4 bg-accent/10 p-4 rounded-xl">
                    <div className="bg-accent text-neutral p-3 rounded-lg">
                      <FaDollarSign className="text-xl" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-600">
                        Registration Fee
                      </p>
                      <p className="font-semibold text-base">
                        ${event.eventFee}
                      </p>
                    </div>
                  </div>
                )}

                {event.maxAttendees && (
                  <div className="flex items-start gap-4 bg-info/10 p-4 rounded-xl">
                    <div className="bg-info text-white p-3 rounded-lg">
                      <FaUsers className="text-xl" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-600">
                        Attendees
                      </p>
                      <p className="font-semibold text-base">
                        {event.registrationCount || 0} / {event.maxAttendees}
                      </p>
                      {spotsLeft !== null && spotsLeft > 0 && (
                        <p className="text-sm text-success font-semibold">
                          {spotsLeft} spots left
                        </p>
                      )}
                      {spotsLeft === 0 && (
                        <p className="text-sm text-error font-semibold">
                          Event is full
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Organized By */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-6 border-2 border-base-200 mt-8"
            >
              <p className="text-sm text-gray-600 mb-2">Organized by</p>
              <Link
                to={`/clubs/${event.clubId}`}
                className="text-xl font-bold text-secondary hover:underline"
              >
                {event.clubName}
              </Link>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-xl p-8 sticky top-24 border-2 border-base-200"
            >
              <h3 className="text-2xl font-bold mb-6">Register for Event</h3>

              {!isUpcoming ? (
                <div className="alert alert-warning mb-6">
                  <FaExclamationTriangle />
                  <span>This event has already passed</span>
                </div>
              ) : spotsLeft === 0 ? (
                <div className="alert alert-error mb-6">
                  <FaExclamationTriangle />
                  <span>Event is full</span>
                </div>
              ) : (
                <>
                  {event.isPaid && (
                    <div className="bg-accent/10 border-2 border-accent rounded-xl p-6 mb-6">
                      <div className="text-center">
                        <p className="text-sm font-semibold text-gray-600 mb-2">
                          Registration Fee
                        </p>
                        <div className="text-4xl font-black text-accent">
                          ${event.eventFee}
                        </div>
                        <p className="text-sm text-gray-600 mt-2">Per person</p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm">
                      <FaCheckCircle className="text-success text-lg" />
                      <span>Instant confirmation</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <FaCheckCircle className="text-success text-lg" />
                      <span>Email reminders</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <FaCheckCircle className="text-success text-lg" />
                      <span>Connect with attendees</span>
                    </div>
                    {spotsLeft && spotsLeft <= 10 && (
                      <div className="flex items-center gap-3 text-sm text-warning font-bold">
                        <FaExclamationTriangle />
                        <span>Only {spotsLeft} spots left!</span>
                      </div>
                    )}
                  </div>

                  <Link
                    to="/login"
                    className="btn btn-secondary w-full btn-lg font-bold"
                  >
                    Register Now
                  </Link>
                </>
              )}

              <div className="divider">OR</div>

              <Link to="/events" className="btn btn-outline w-full font-bold">
                Browse More Events
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
