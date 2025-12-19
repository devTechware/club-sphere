import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "react-router";
import api from "../../utils/api";
import {
  FaCalendar,
  FaMapMarkerAlt,
  FaDollarSign,
  FaClock,
  FaEye,
} from "react-icons/fa";

const MyEvents = () => {
  // Fetch user's event registrations
  const { data: registrations, isLoading } = useQuery({
    queryKey: ["myRegistrations"],
    queryFn: async () => {
      const response = await api.get("/event-registrations/my-registrations");
      return response.data;
    },
  });

  // Fetch event details for each registration
  const { data: events } = useQuery({
    queryKey: ["myEventsDetails", registrations],
    queryFn: async () => {
      if (!registrations || registrations.length === 0) return [];

      const eventPromises = registrations.map((registration) =>
        api.get(`/events/${registration.eventId}`).then((res) => res.data)
      );
      return Promise.all(eventPromises);
    },
    enabled: !!registrations && registrations.length > 0,
  });

  // Separate upcoming and past events
  const upcomingEvents =
    events?.filter((event) => new Date(event.eventDate) > new Date()) || [];
  const pastEvents =
    events?.filter((event) => new Date(event.eventDate) <= new Date()) || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-secondary"></span>
          <p className="mt-4 font-semibold">Loading your events...</p>
        </div>
      </div>
    );
  }

  const EventCard = ({ event, isPast }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="card bg-white shadow-xl border-2 border-base-200 hover:border-secondary transition-all"
    >
      <div className="card-body">
        <div className="flex gap-3 mb-3">
          <div className="badge badge-secondary font-bold">
            {event.clubName}
          </div>
          {isPast ? (
            <div className="badge badge-neutral font-bold">Past</div>
          ) : (
            <div className="badge badge-success font-bold">Upcoming</div>
          )}
        </div>

        <h2 className="card-title text-xl font-black">{event.title}</h2>
        <p className="text-gray-600 line-clamp-2">{event.description}</p>

        <div className="divider my-2"></div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <FaCalendar className="text-secondary" />
            <span className="font-semibold">
              {new Date(event.eventDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaClock className="text-primary" />
            <span className="font-semibold">
              {new Date(event.eventDate).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-error" />
            <span className="font-semibold truncate">{event.location}</span>
          </div>
          {event.isPaid && (
            <div className="flex items-center gap-2">
              <FaDollarSign className="text-success" />
              <span className="font-semibold">${event.eventFee}</span>
            </div>
          )}
        </div>

        <div className="card-actions mt-4">
          <Link
            to={`/events/${event._id}`}
            className="btn btn-secondary btn-sm w-full font-bold"
          >
            <FaEye />
            View Event
          </Link>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-black mb-2">
          My <span className="text-gradient">Events</span>
        </h1>
        <p className="text-lg text-gray-600 font-medium">
          Events you're registered for
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card bg-white shadow-xl border-2 border-base-200"
        >
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="bg-secondary/10 p-4 rounded-xl">
                <FaCalendar className="text-3xl text-secondary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">
                  Total Events
                </p>
                <p className="text-3xl font-black">{events?.length || 0}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card bg-white shadow-xl border-2 border-base-200"
        >
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="bg-success/10 p-4 rounded-xl">
                <FaCalendar className="text-3xl text-success" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Upcoming</p>
                <p className="text-3xl font-black">{upcomingEvents.length}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card bg-white shadow-xl border-2 border-base-200"
        >
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="bg-neutral/10 p-4 rounded-xl">
                <FaCalendar className="text-3xl text-neutral" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Past</p>
                <p className="text-3xl font-black">{pastEvents.length}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <span className="w-2 h-8 bg-secondary rounded"></span>
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event._id} event={event} isPast={false} />
            ))}
          </div>
        </div>
      )}

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <span className="w-2 h-8 bg-neutral rounded"></span>
            Past Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <EventCard key={event._id} event={event} isPast={true} />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {(!events || events.length === 0) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card bg-white shadow-xl border-2 border-base-200"
        >
          <div className="card-body text-center py-12">
            <FaCalendar className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">No Events Yet</h3>
            <p className="text-gray-600 mb-6">
              You haven't registered for any events. Check out upcoming events!
            </p>
            <Link to="/events" className="btn btn-secondary font-bold">
              Browse Events
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MyEvents;
