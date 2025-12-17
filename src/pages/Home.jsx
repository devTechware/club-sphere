import { Link } from "react-router";
import { motion } from "framer-motion";
import { useFeaturedClubs } from "../hooks/useClubs";
import { useUpcomingEvents } from "../hooks/useEvents";
import { FaUsers, FaCalendar, FaMapMarkerAlt } from "react-icons/fa";

const Home = () => {
  const { data: featuredClubs, isLoading: clubsLoading } = useFeaturedClubs();
  const { data: upcomingEvents, isLoading: eventsLoading } = useUpcomingEvents();

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
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="hero min-h-[60vh] bg-linear-to-r from-primary to-secondary rounded-lg mb-16"
      >
        <div className="hero-content text-center text-white">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              Welcome to ClubSphere
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl mb-8"
            >
              Discover, join, and manage local clubs. Connect with people who
              share your interests and passions.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex gap-4 justify-center"
            >
              <Link to="/clubs" className="btn btn-lg bg-white text-primary hover:bg-gray-100">
                Browse Clubs
              </Link>
              <Link to="/events" className="btn btn-lg btn-outline text-white border-white hover:bg-white hover:text-primary">
                View Events
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Featured Clubs Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold">Featured Clubs</h2>
          <Link to="/clubs" className="btn btn-primary btn-outline">
            View All
          </Link>
        </div>

        {clubsLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {featuredClubs?.slice(0, 6).map((club) => (
              <motion.div
                key={club._id}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                className="card bg-base-100 shadow-xl"
              >
                <figure className="h-48">
                  <img
                    src={club.bannerImage || "https://via.placeholder.com/400x300"}
                    alt={club.clubName}
                    className="w-full h-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{club.clubName}</h2>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {club.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FaUsers />
                    <span>{club.memberCount || 0} members</span>
                  </div>
                  <div className="card-actions justify-end mt-4">
                    <Link
                      to={`/clubs/${club._id}`}
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
      </section>

      {/* Upcoming Events Section */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold">Upcoming Events</h2>
          <Link to="/events" className="btn btn-primary btn-outline">
            View All
          </Link>
        </div>

        {eventsLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {upcomingEvents?.slice(0, 6).map((event) => (
              <motion.div
                key={event._id}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                className="card bg-base-100 shadow-xl"
              >
                <div className="card-body">
                  <h2 className="card-title">{event.title}</h2>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {event.description}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-500">
                      <FaCalendar />
                      <span>
                        {new Date(event.eventDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <FaMapMarkerAlt />
                      <span>{event.location}</span>
                    </div>
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
      </section>
    </div>
  );
};

export default Home;