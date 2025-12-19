import { Link } from "react-router";
import { motion } from "framer-motion";
import { useFeaturedClubs } from "../hooks/useClubs";
import { useEvents, useUpcomingEvents } from "../hooks/useEvents";
import {
  FaUsers,
  FaCalendar,
  FaMapMarkerAlt,
  FaRocket,
  FaHeart,
  FaStar,
  FaArrowRight,
  FaTrophy,
  FaFire,
  FaBolt,
  FaBuilding,
} from "react-icons/fa";

const Home = () => {
  const { data: featuredClubs, isLoading: clubsLoading } = useFeaturedClubs();
  // const { data: upcomingEvents, isLoading: eventsLoading } =
  //   useUpcomingEvents();
  const { data: upcomingEvents, isLoading: eventsLoading } = useEvents();
  //console.log(upcomingEvents);
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const features = [
    {
      icon: <FaRocket className="text-5xl" />,
      title: "Launch Your Journey",
      description:
        "Start exploring clubs that match your passions and interests",
      color: "from-error to-warning",
    },
    {
      icon: <FaUsers className="text-5xl" />,
      title: "Build Connections",
      description: "Meet amazing people and create lasting friendships",
      color: "from-secondary to-info",
    },
    {
      icon: <FaTrophy className="text-5xl" />,
      title: "Achieve Goals",
      description: "Grow your skills and accomplish your dreams together",
      color: "from-accent to-warning",
    },
    {
      icon: <FaFire className="text-5xl" />,
      title: "Stay Active",
      description: "Participate in exciting events and never miss out",
      color: "from-error to-secondary",
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section - Super Vibrant */}
      <section className="relative animated-gradient py-24 md:py-36">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="inline-block mb-6"
              >
                <div className="badge badge-lg glass text-white border-white/30 backdrop-blur-md px-6 py-4 badge-glow">
                  <FaBolt className="mr-2 text-accent" />
                  <span className="font-bold">Join 500+ Active Members</span>
                </div>
              </motion.div>

              <motion.h1
                className="text-6xl md:text-8xl font-black text-white mb-8 leading-tight drop-shadow-2xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Discover Your
                <br />
                <span className="inline-block bg-white text-primary px-6 py-2 rounded-2xl transform -rotate-2 shadow-2xl">
                  Next Passion
                </span>
              </motion.h1>

              <motion.p
                className="text-xl md:text-3xl text-white font-medium mb-12 leading-relaxed max-w-3xl mx-auto drop-shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Connect with local clubs, attend amazing events, and build
                <span className="font-bold text-accent">
                  {" "}
                  unforgettable experiences
                </span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              >
                <Link
                  to="/clubs"
                  className="btn btn-lg bg-white text-primary hover:bg-accent hover:text-neutral border-0 shadow-2xl px-10 group text-lg font-bold"
                >
                  <FaRocket className="mr-2" />
                  Explore Clubs
                  <FaArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                </Link>
                <Link
                  to="/events"
                  className="btn btn-lg glass text-white border-2 border-white hover:bg-white hover:text-primary px-10 text-lg font-bold"
                >
                  <FaCalendar className="mr-2" />
                  View Events
                </Link>
              </motion.div>

              {/* Stats Pills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex flex-wrap gap-4 justify-center mt-16"
              >
                {[
                  { icon: <FaUsers />, text: "500+ Members" },
                  { icon: <FaBuilding />, text: "50+ Clubs" },
                  { icon: <FaFire />, text: "200+ Events" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="glass px-6 py-3 rounded-full text-white font-semibold flex items-center gap-2 backdrop-blur-md"
                  >
                    {stat.icon}
                    {stat.text}
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section - Card Grid */}
      <section className="py-24 bg-linear-to-b from-base-100 to-base-200 relative">
        <div className="pattern-dots absolute inset-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              Why <span className="text-gradient">ClubSphere</span>?
            </h2>
            <p className="text-2xl text-gray-600 font-medium max-w-3xl mx-auto">
              Everything you need to thrive in your community
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.03 }}
                className="card-hover bg-white shadow-2xl border-4 border-transparent hover:border-primary h-full"
              >
                <div className="card-body items-center text-center p-8">
                  <div
                    className={`bg-linear-to-br ${feature.color} p-6 rounded-3xl text-white mb-6 shadow-xl`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="card-title text-2xl font-bold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Clubs - Modern Grid */}
      <section className="py-24 bg-base-200 relative overflow-hidden">
        <div className="pattern-grid absolute inset-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-16 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="badge badge-error badge-lg mb-4 font-bold">
                <FaFire className="mr-2" /> TRENDING NOW
              </div>
              <h2 className="text-5xl md:text-6xl font-black mb-3">
                Featured <span className="text-gradient">Clubs</span>
              </h2>
              <p className="text-xl text-gray-600 font-medium">
                Join the hottest communities
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link
                to="/clubs"
                className="btn btn-primary btn-lg gap-3 shadow-xl text-lg font-bold px-8"
              >
                View All Clubs
                <FaArrowRight className="text-xl" />
              </Link>
            </motion.div>
          </div>

          {clubsLoading ? (
            <div className="flex justify-center py-24">
              <span className="loading loading-spinner loading-lg text-primary w-16 h-16"></span>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              {featuredClubs?.slice(0, 6).map((club, index) => (
                <motion.div
                  key={club._id}
                  variants={fadeInUp}
                  whileHover={{ y: -12 }}
                >
                  <Link to={`/clubs/${club._id}`}>
                    <div className="card-hover bg-white shadow-2xl overflow-hidden h-full border-4 border-transparent">
                      <figure className="relative h-64 overflow-hidden">
                        <img
                          src={
                            club.bannerImage ||
                            `https://source.unsplash.com/800x600/?club,${club.category}`
                          }
                          alt={club.clubName}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                        <div className="absolute top-4 right-4">
                          <div className="badge badge-primary badge-lg font-bold shadow-2xl text-base px-4 py-3">
                            {club.category}
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                          <FaStar className="text-accent text-xl" />
                          <span className="font-bold text-lg">Featured</span>
                        </div>
                      </figure>
                      <div className="card-body p-6">
                        <h3 className="card-title text-2xl font-bold mb-2">
                          {club.clubName}
                        </h3>
                        <p className="text-gray-600 line-clamp-2 mb-4 leading-relaxed">
                          {club.description}
                        </p>
                        <div
                          className="section-divider my-3"
                          style={{ margin: "1rem 0", height: "2px" }}
                        ></div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="avatar-group -space-x-3">
                              <div className="avatar placeholder">
                                <div className="w-8 bg-primary text-white rounded-full">
                                  <FaUsers />
                                </div>
                              </div>
                            </div>
                            <span className="font-bold text-lg">
                              {club.memberCount || 0}
                            </span>
                          </div>
                          <div className="text-2xl font-black text-primary">
                            {club.membershipFee > 0
                              ? `$${club.membershipFee}`
                              : "FREE"}
                          </div>
                        </div>
                        <button className="btn btn-primary w-full mt-4 text-base font-bold group">
                          Join Club
                          <FaArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
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

      {/* Upcoming Events - Timeline Style */}
      <section className="py-24 bg-linear-to-b from-base-100 to-base-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-16 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="badge badge-secondary badge-lg mb-4 font-bold">
                <FaCalendar className="mr-2" /> HAPPENING SOON
              </div>
              <h2 className="text-5xl md:text-6xl font-black mb-3">
                Upcoming <span className="text-gradient">Events</span>
              </h2>
              <p className="text-xl text-gray-600 font-medium">
                Don't miss these amazing activities
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link
                to="/events"
                className="btn btn-secondary btn-lg gap-3 shadow-xl text-lg font-bold px-8"
              >
                View All Events
                <FaArrowRight className="text-xl" />
              </Link>
            </motion.div>
          </div>

          {eventsLoading ? (
            <div className="flex justify-center py-24">
              <span className="loading loading-spinner loading-lg text-secondary w-16 h-16"></span>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              {upcomingEvents?.slice(0, 6).map((event) => (
                <motion.div
                  key={event._id}
                  variants={fadeInUp}
                  whileHover={{ y: -12 }}
                >
                  <Link to={`/events/${event._id}`}>
                    <div className="card-hover bg-white shadow-2xl h-full border-4 border-transparent">
                      <div className="card-body p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="badge badge-secondary badge-lg font-bold">
                            {event.clubName}
                          </div>
                          {event.isPaid && (
                            <div className="badge badge-accent badge-lg font-bold">
                              ${event.eventFee}
                            </div>
                          )}
                        </div>
                        <h3 className="card-title text-2xl font-bold mb-3">
                          {event.title}
                        </h3>
                        <p className="text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                          {event.description}
                        </p>
                        <div
                          className="section-divider my-3"
                          style={{ margin: "1rem 0", height: "2px" }}
                        ></div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 bg-secondary/10 p-3 rounded-xl">
                            <FaCalendar className="text-secondary text-xl flex-shrink-0" />
                            <span className="font-bold">
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
                          <div className="flex items-center gap-3 bg-primary/10 p-3 rounded-xl">
                            <FaMapMarkerAlt className="text-primary text-xl flex-shrink-0" />
                            <span className="truncate font-semibold">
                              {event.location}
                            </span>
                          </div>
                        </div>
                        <button className="btn btn-secondary w-full mt-4 text-base font-bold group">
                          Register Now
                          <FaArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
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

      {/* CTA Section - Bold & Vibrant */}
      <section className="py-32 gradient-dark relative overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1.1, 1, 1.1],
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-3xl"
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-8"
            >
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto shadow-2xl">
                <FaRocket className="text-4xl text-neutral" />
              </div>
            </motion.div>

            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
              Ready to Start Your
              <br />
              <span className="text-accent">Adventure?</span>
            </h2>
            <p className="text-2xl text-white/90 mb-12 font-medium leading-relaxed">
              Join thousands of members discovering their passions and building
              incredible communities on ClubSphere.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/register"
                className="btn btn-lg bg-accent text-neutral hover:bg-accent/90 border-0 shadow-2xl px-12 text-xl font-bold"
              >
                <FaBolt className="mr-2 text-2xl" />
                Get Started Free
              </Link>
              <Link
                to="/login"
                className="btn btn-lg glass text-white border-2 border-white hover:bg-white hover:text-neutral px-12 text-xl font-bold"
              >
                Sign In
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
