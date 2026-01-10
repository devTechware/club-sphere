import { Link } from "react-router";
import { motion } from "framer-motion";
import { useFeaturedClubs } from "../hooks/useClubs";
import { useEvents } from "../hooks/useEvents";
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
  FaShieldAlt,
  FaGlobe,
  FaClock,
  FaCheckCircle,
  FaQuoteLeft,
  FaEnvelope,
  FaQuestion,
} from "react-icons/fa";
import { useState } from "react";

const Home = () => {
  const { data: featuredClubs, isLoading: clubsLoading } = useFeaturedClubs();
  const { data: upcomingEvents, isLoading: eventsLoading } = useEvents();
  const [email, setEmail] = useState("");

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const features = [
    {
      icon: <FaRocket />,
      title: "Launch Your Journey",
      description:
        "Start exploring clubs that match your passions and interests",
      color: "primary",
    },
    {
      icon: <FaUsers />,
      title: "Build Connections",
      description: "Meet amazing people and create lasting friendships",
      color: "secondary",
    },
    {
      icon: <FaTrophy />,
      title: "Achieve Goals",
      description: "Grow your skills and accomplish your dreams together",
      color: "accent",
    },
    {
      icon: <FaFire />,
      title: "Stay Active",
      description: "Participate in exciting events and never miss out",
      color: "error",
    },
  ];

  const categories = [
    { name: "Technology", icon: "💻", count: 25, color: "primary" },
    { name: "Sports", icon: "⚽", count: 18, color: "secondary" },
    { name: "Arts", icon: "🎨", count: 15, color: "accent" },
    { name: "Music", icon: "🎵", count: 12, color: "info" },
    { name: "Gaming", icon: "🎮", count: 20, color: "success" },
    { name: "Photography", icon: "📷", count: 10, color: "warning" },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Photography Club Member",
      image:
        "https://ui-avatars.com/api/?name=Sarah+Johnson&background=ff6b6b&color=fff",
      text: "ClubSphere helped me find my passion for photography. The community is amazing and the events are always top-notch!",
      rating: 5,
    },
    {
      name: "Mike Chen",
      role: "Tech Club Manager",
      image:
        "https://ui-avatars.com/api/?name=Mike+Chen&background=4ecdc4&color=fff",
      text: "Managing my tech club has never been easier. The platform provides all the tools I need to organize events and engage members.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Sports Enthusiast",
      image:
        "https://ui-avatars.com/api/?name=Emily+Rodriguez&background=ffe66d&color=333",
      text: "I've met so many incredible people through ClubSphere. It's the perfect place to explore new interests and make friends!",
      rating: 5,
    },
  ];

  const stats = [
    {
      number: "1000+",
      label: "Active Members",
      icon: <FaUsers />,
      color: "primary",
    },
    {
      number: "150+",
      label: "Clubs",
      icon: <FaBuilding />,
      color: "secondary",
    },
    {
      number: "500+",
      label: "Events Hosted",
      icon: <FaCalendar />,
      color: "accent",
    },
    {
      number: "98%",
      label: "Satisfaction Rate",
      icon: <FaStar />,
      color: "warning",
    },
  ];

  const faqs = [
    {
      question: "How do I join a club?",
      answer:
        "Simply browse our clubs, find one that interests you, and click the 'Join' button. Some clubs are free while others may require a membership fee.",
    },
    {
      question: "Can I create my own club?",
      answer:
        "Yes! Register as a club manager and you'll be able to create and manage your own clubs after admin approval.",
    },
    {
      question: "Are events free to attend?",
      answer:
        "It varies by event. Some are completely free while others may have a registration fee. Check each event's details for specific pricing.",
    },
    {
      question: "How do payments work?",
      answer:
        "We use Stripe for secure payment processing. All transactions are encrypted and your financial information is never stored on our servers.",
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* 1. HERO SECTION - 60-70% viewport height */}
      <section className="relative min-h-[60vh] max-h-[70vh] h-[65vh] flex items-center overflow-hidden bg-linear-to-br from-primary/20 via-secondary/20 to-accent/20">
        {/* Animated background */}
        <div className="absolute inset-0 animated-gradient opacity-50"></div>

        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-20 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {/* Badge */}
              <motion.div variants={fadeInUp} className="mb-1">
                <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg">
                  <FaBolt className="text-accent text-xl" />
                  <span className="text-sm font-bold text-base-content">
                    Join 1000+ Active Members Today
                  </span>
                </div>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-black mb-2 leading-tight"
              >
                Discover Your
                <br />
                <span className="text-gradient">Perfect Community</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={fadeInUp}
                className="text-lg md:text-xl text-base-content/80 mb-2 max-w-2xl mx-auto leading-relaxed"
              >
                Connect with local clubs, attend amazing events, and build
                <span className="font-bold text-primary">
                  {" "}
                  unforgettable experiences
                </span>{" "}
                together
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-0"
              >
                <Link
                  to="/clubs"
                  className="btn btn-primary btn-lg font-bold text-white gap-2 px-8 shadow-xl group"
                >
                  <FaRocket />
                  Explore Clubs
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/events"
                  className="btn btn-outline btn-lg font-bold gap-2 px-8 border-2"
                >
                  <FaCalendar />
                  View Events
                </Link>
              </motion.div>

              {/* Quick Stats */}
              {/* <motion.div
                variants={fadeInUp}
                className="flex flex-wrap justify-center gap-6 mt-8"
              >
                {[
                  {
                    icon: <FaUsers className="text-lg" />,
                    text: "1000+ Members",
                  },
                  {
                    icon: <FaBuilding className="text-lg" />,
                    text: "150+ Clubs",
                  },
                  { icon: <FaFire className="text-lg" />, text: "500+ Events" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md"
                  >
                    <span className="text-primary">{stat.icon}</span>
                    <span className="text-sm font-bold text-base-content">
                      {stat.text}
                    </span>
                  </div>
                ))}
              </motion.div> */}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-base-content/30 rounded-full flex items-start justify-center p-1"
          >
            <div className="w-1 h-3 bg-primary rounded-full"></div>
          </motion.div>
        </motion.div> */}
      </section>

      {/* 2. FEATURES SECTION */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Why <span className="text-gradient">ClubSphere</span>?
            </h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Everything you need to build and grow your community
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
                whileHover={{ y: -8, scale: 1.02 }}
                className="card bg-base-100 shadow-xl border-2 border-base-200 card-hover"
              >
                <div className="card-body items-center text-center p-8">
                  <div
                    className={`w-20 h-20 bg-${feature.color} rounded-2xl flex items-center justify-center text-white text-3xl mb-4 shadow-lg`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-base-content/70 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. STATISTICS SECTION */}
      <section className="py-16 bg-linear-to-r from-primary via-secondary to-accent">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center text-white"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
                  <span className="text-3xl">{stat.icon}</span>
                </div>
                <div className="text-4xl md:text-5xl font-black mb-2">
                  {stat.number}
                </div>
                <div className="text-base font-semibold opacity-90">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. CATEGORIES SECTION */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Explore <span className="text-gradient">Categories</span>
            </h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Find clubs that match your interests
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          >
            {categories.map((category, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.05 }}
              >
                <Link
                  to={`/clubs?category=${category.name}`}
                  className="card bg-base-100 shadow-lg border-2 border-base-200 card-hover h-full"
                >
                  <div className="card-body items-center text-center p-6">
                    <div className="text-5xl mb-3">{category.icon}</div>
                    <h3 className="font-bold text-base">{category.name}</h3>
                    <p className="text-xs text-base-content/70">
                      {category.count} clubs
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. FEATURED CLUBS SECTION */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="badge badge-primary badge-lg mb-3 font-bold">
                <FaStar className="mr-2" /> FEATURED
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-2">
                Popular <span className="text-gradient">Clubs</span>
              </h2>
              <p className="text-lg text-base-content/70">
                Join the most active communities
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link
                to="/clubs"
                className="btn btn-primary btn-lg gap-2 shadow-xl font-bold"
              >
                View All Clubs
                <FaArrowRight />
              </Link>
            </motion.div>
          </div>

          {clubsLoading ? (
            <div className="flex justify-center py-20">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {featuredClubs?.slice(0, 6).map((club) => (
                <motion.div
                  key={club._id}
                  variants={fadeInUp}
                  whileHover={{ y: -10 }}
                >
                  <Link to={`/clubs/${club._id}`}>
                    <div className="card bg-base-100 shadow-xl border-2 border-base-200 overflow-hidden card-hover h-full">
                      <figure className="h-48 overflow-hidden">
                        <img
                          src={
                            club.bannerImage ||
                            `https://ui-avatars.com/api/?name=${club.clubName}&size=600&background=random`
                          }
                          alt={club.clubName}
                          className="w-full h-full object-cover"
                        />
                      </figure>
                      <div className="card-body p-6">
                        <div className="badge badge-primary font-bold mb-2">
                          {club.category}
                        </div>
                        <h3 className="card-title text-xl font-bold mb-2">
                          {club.clubName}
                        </h3>
                        <p className="text-base-content/70 text-sm line-clamp-2 mb-4">
                          {club.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FaUsers className="text-secondary" />
                            <span className="text-sm font-bold">
                              {club.memberCount || 0} members
                            </span>
                          </div>
                          <div className="badge badge-accent font-bold">
                            {club.membershipFee === 0
                              ? "FREE"
                              : `$${club.membershipFee}`}
                          </div>
                        </div>
                        <button className="btn btn-primary btn-sm w-full mt-4 font-bold group">
                          Join Club
                          <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
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

      {/* 6. UPCOMING EVENTS SECTION */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="badge badge-secondary badge-lg mb-3 font-bold">
                <FaCalendar className="mr-2" /> HAPPENING SOON
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-2">
                Upcoming <span className="text-gradient">Events</span>
              </h2>
              <p className="text-lg text-base-content/70">
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
                className="btn btn-secondary btn-lg gap-2 shadow-xl font-bold"
              >
                View All Events
                <FaArrowRight />
              </Link>
            </motion.div>
          </div>

          {eventsLoading ? (
            <div className="flex justify-center py-20">
              <span className="loading loading-spinner loading-lg text-secondary"></span>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {upcomingEvents?.slice(0, 6).map((event) => (
                <motion.div
                  key={event._id}
                  variants={fadeInUp}
                  whileHover={{ y: -10 }}
                >
                  <Link to={`/events/${event._id}`}>
                    <div className="card bg-base-100 shadow-xl border-2 border-base-200 card-hover h-full">
                      <div className="card-body p-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className="badge badge-secondary font-bold text-xs">
                            {event.clubName}
                          </div>
                          {event.isPaid && (
                            <div className="badge badge-accent font-bold">
                              ${event.eventFee}
                            </div>
                          )}
                        </div>
                        <h3 className="card-title text-xl font-bold mb-2">
                          {event.title}
                        </h3>
                        <p className="text-base-content/70 text-sm line-clamp-2 mb-4">
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
                            <FaMapMarkerAlt className="text-primary flex-shrink-0" />
                            <span className="truncate">{event.location}</span>
                          </div>
                        </div>
                        <button className="btn btn-secondary btn-sm w-full mt-4 font-bold group">
                          Register Now
                          <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
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

      {/* 7. HOW IT WORKS SECTION */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Getting started is easy - just follow these simple steps
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                step: "01",
                title: "Create Account",
                description: "Sign up in seconds with email or Google",
                icon: <FaRocket />,
                color: "primary",
              },
              {
                step: "02",
                title: "Find Your Club",
                description: "Browse categories and discover perfect matches",
                icon: <FaBuilding />,
                color: "secondary",
              },
              {
                step: "03",
                title: "Start Connecting",
                description: "Join clubs, attend events, and make friends",
                icon: <FaUsers />,
                color: "accent",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
              >
                <div className="card bg-base-100 shadow-xl border-2 border-base-200 h-full">
                  <div className="card-body items-center text-center p-8">
                    <div className="text-7xl font-black text-base-content/10 mb-4">
                      {item.step}
                    </div>
                    <div
                      className={`w-16 h-16 bg-${item.color} rounded-2xl flex items-center justify-center text-white text-2xl mb-4`}
                    >
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-base-content/70 text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 8. TESTIMONIALS SECTION */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              What Our <span className="text-gradient">Members Say</span>
            </h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Real stories from real people in our community
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
              >
                <div className="card bg-base-100 shadow-xl border-2 border-base-200 h-full">
                  <div className="card-body p-8">
                    <FaQuoteLeft className="text-3xl text-primary mb-3" />
                    <p className="text-base-content/80 mb-6 leading-relaxed italic text-sm">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="text-accent text-sm" />
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-12 rounded-full">
                          <img src={testimonial.image} alt={testimonial.name} />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">
                          {testimonial.name}
                        </h4>
                        <p className="text-xs text-base-content/70">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 9. WHY CHOOSE US SECTION */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Why Choose <span className="text-gradient">ClubSphere</span>
            </h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              The best platform for building and managing communities
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: <FaShieldAlt />,
                title: "Secure & Safe",
                description:
                  "Your data is protected with industry-standard security",
              },
              {
                icon: <FaBolt />,
                title: "Lightning Fast",
                description: "Optimized performance for the best experience",
              },
              {
                icon: <FaGlobe />,
                title: "Global Reach",
                description: "Connect with clubs and events worldwide",
              },
              {
                icon: <FaHeart />,
                title: "Community First",
                description: "Built with love for bringing people together",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
              >
                <div className="card bg-base-100 shadow-xl border-2 border-base-200 h-full">
                  <div className="card-body items-center text-center p-6">
                    <div className="text-4xl text-primary mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                    <p className="text-base-content/70 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 10. FAQ SECTION */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <p className="text-lg text-base-content/70">
              Common questions answered
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <div className="collapse collapse-plus bg-base-100 border-2 border-base-300 shadow-md">
                  <input type="radio" name="faq-accordion" />
                  <div className="collapse-title text-lg font-bold flex items-center gap-3">
                    <FaQuestion className="text-primary flex-shrink-0" />
                    <span>{faq.question}</span>
                  </div>
                  <div className="collapse-content">
                    <p className="text-base-content/70 leading-relaxed pt-2">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 11. NEWSLETTER SECTION */}
      <section className="py-20 bg-linear-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FaEnvelope className="text-3xl text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Stay <span className="text-gradient">Updated</span>
            </h2>
            <p className="text-lg text-base-content/70 mb-8">
              Subscribe to our newsletter for the latest clubs, events, and
              community news
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered input-lg flex-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="btn btn-primary btn-lg font-bold px-8">
                <FaEnvelope />
                Subscribe
              </button>
            </div>
            <p className="text-sm text-base-content/60 mt-4 flex items-center justify-center gap-2">
              <FaCheckCircle className="text-success" />
              No spam, unsubscribe anytime
            </p>
          </motion.div>
        </div>
      </section>

      {/* 12. FINAL CTA SECTION */}
      <section className="py-24 bg-linear-to-r from-primary via-secondary to-accent relative overflow-hidden">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360, scale: [1.1, 1, 1.1] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
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
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-6"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                <FaRocket className="text-3xl text-primary" />
              </div>
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Ready to Start Your
              <br />
              <span className="text-white/90">Amazing Journey?</span>
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Join thousands of members discovering their passions and building
              incredible communities on ClubSphere.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="btn btn-lg bg-white text-primary hover:bg-white/90 border-0 shadow-xl px-10 font-bold"
              >
                <FaBolt className="text-xl" />
                Get Started Free
              </Link>
              <Link
                to="/login"
                className="btn btn-lg btn-outline text-white border-2 border-white hover:bg-white hover:text-primary px-10 font-bold"
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
