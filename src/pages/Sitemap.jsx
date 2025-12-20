import { motion } from "framer-motion";
import { Link } from "react-router";
import {
  FaHome,
  FaBuilding,
  FaCalendar,
  FaInfoCircle,
  FaEnvelope,
  FaGavel,
  FaShieldAlt,
  FaSitemap,
} from "react-icons/fa";

const Sitemap = () => {
  const sections = [
    {
      title: "Main Pages",
      icon: <FaHome />,
      links: [
        { to: "/", label: "Home" },
        { to: "/clubs", label: "Browse Clubs" },
        { to: "/events", label: "Browse Events" },
      ],
    },
    {
      title: "About",
      icon: <FaInfoCircle />,
      links: [
        { to: "/about", label: "About Us" },
        { to: "/contact", label: "Contact" },
      ],
    },
    {
      title: "Account",
      icon: <FaBuilding />,
      links: [
        { to: "/login", label: "Login" },
        { to: "/register", label: "Sign Up" },
        { to: "/dashboard", label: "Dashboard" },
      ],
    },
    {
      title: "Legal",
      icon: <FaGavel />,
      links: [
        { to: "/terms", label: "Terms of Service" },
        { to: "/privacy", label: "Privacy Policy" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-base-100">
      <div className="bg-gradient-to-r from-accent to-primary py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white max-w-3xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-6 rounded-3xl">
                <FaSitemap className="text-6xl" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-4">Sitemap</h1>
            <p className="text-xl">
              Quick navigation to all pages on ClubSphere
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card bg-white shadow-xl border-2 border-base-200"
            >
              <div className="card-body">
                <h2 className="card-title text-2xl font-black mb-4 flex items-center gap-2">
                  <div className="text-primary">{section.icon}</div>
                  {section.title}
                </h2>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        to={link.to}
                        className="text-gray-700 hover:text-primary font-semibold transition-colors flex items-center gap-2 py-1"
                      >
                        <span className="text-primary">→</span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card bg-gradient-to-r from-primary to-secondary shadow-xl mt-12"
        >
          <div className="card-body text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Can't find what you're looking for?
            </h3>
            <p className="text-white/90 mb-6">
              Get in touch with us and we'll help you out!
            </p>
            <Link
              to="/contact"
              className="btn btn-lg bg-white text-primary hover:bg-white/90 font-bold mx-auto"
            >
              <FaEnvelope />
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Sitemap;
