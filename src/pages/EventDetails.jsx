import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import { useEventDetails } from "../hooks/useEvents";
import {
  FaCalendar,
  FaMapMarkerAlt,
  FaDollarSign,
  FaUsers,
  FaClock,
} from "react-icons/fa";

const EventDetails = () => {
  const { id } = useParams();
  const { data: event, isLoading, isError } = useEventDetails(id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError || !event) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">
          <span>Event not found</span>
        </div>
      </div>
    );
  }

  const eventDate = new Date(event.eventDate);
  const isUpcoming = eventDate > new Date();
  const spotsLeft = event.maxAttendees
    ? event.maxAttendees - (event.registrationCount || 0)
    : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold mb-4">{event.title}</h1>

            <div className="flex items-center gap-2 mb-6">
              <span className="text-gray-600">Organized by</span>
              <Link
                to={`/clubs/${event.clubId}`}
                className="font-semibold text-primary hover:underline"
              >
                {event.clubName}
              </Link>
            </div>

            {isUpcoming ? (
              <div className="badge badge-success badge-lg mb-4">Upcoming</div>
            ) : (
              <div className="badge badge-neutral badge-lg mb-4">
                Past Event
              </div>
            )}

            <div className="divider"></div>

            <h2 className="text-2xl font-bold mb-4">About This Event</h2>
            <p className="text-lg text-gray-700 mb-6 whitespace-pre-wrap">
              {event.description}
            </p>

            <div className="divider"></div>

            <h2 className="text-2xl font-bold mb-4">Event Details</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaCalendar className="text-primary text-xl mt-1" />
                <div>
                  <div className="font-semibold">Date & Time</div>
                  <div className="text-gray-600">
                    {eventDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div className="text-gray-600">
                    {eventDate.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-primary text-xl mt-1" />
                <div>
                  <div className="font-semibold">Location</div>
                  <div className="text-gray-600">{event.location}</div>
                </div>
              </div>

              {event.isPaid && (
                <div className="flex items-start gap-3">
                  <FaDollarSign className="text-primary text-xl mt-1" />
                  <div>
                    <div className="font-semibold">Registration Fee</div>
                    <div className="text-gray-600">${event.eventFee}</div>
                  </div>
                </div>
              )}

              {event.maxAttendees && (
                <div className="flex items-start gap-3">
                  <FaUsers className="text-primary text-xl mt-1" />
                  <div>
                    <div className="font-semibold">Attendees</div>
                    <div className="text-gray-600">
                      {event.registrationCount || 0} / {event.maxAttendees}{" "}
                      registered
                    </div>
                    {spotsLeft !== null && spotsLeft > 0 && (
                      <div className="text-sm text-success">
                        {spotsLeft} spots remaining
                      </div>
                    )}
                    {spotsLeft === 0 && (
                      <div className="text-sm text-error">Event is full</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card bg-base-200 shadow-xl sticky top-4">
              <div className="card-body">
                <h3 className="card-title">Register for Event</h3>

                {!isUpcoming ? (
                  <div className="alert alert-warning">
                    <span>This event has already passed</span>
                  </div>
                ) : spotsLeft === 0 ? (
                  <div className="alert alert-error">
                    <span>Event is full</span>
                  </div>
                ) : (
                  <>
                    {event.isPaid && (
                      <div className="alert alert-info">
                        <div>
                          <div className="text-lg font-bold">
                            ${event.eventFee}
                          </div>
                          <div className="text-xs">Registration fee</div>
                        </div>
                      </div>
                    )}

                    <Link
                      to="/login"
                      className="btn btn-primary w-full"
                      disabled={!isUpcoming || spotsLeft === 0}
                    >
                      Register Now
                    </Link>
                  </>
                )}

                <div className="divider">OR</div>

                <Link to="/events" className="btn btn-outline w-full">
                  Browse More Events
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EventDetails;
