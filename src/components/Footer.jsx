import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaRocket,
  FaHeart,
  FaFire,
} from "react-icons/fa";
import { Link } from "react-router";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    explore: [
      { to: "/clubs", label: "Browse Clubs" },
      { to: "/events", label: "Upcoming Events" },
      { to: "/register", label: "Join Now" },
    ],
    company: [
      { to: "/about", label: "About Us" },
      { to: "/contact", label: "Contact" },
      { to: "/privacy", label: "Privacy Policy" },
    ],
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: <FaGithub />,
      url: "https://github.com",
      color: "hover:text-neutral",
      bg: "hover:bg-neutral/10",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin />,
      url: "https://linkedin.com",
      color: "hover:text-info",
      bg: "hover:bg-info/10",
    },
    {
      name: "Twitter",
      icon: <FaTwitter />,
      url: "https://twitter.com",
      color: "hover:text-secondary",
      bg: "hover:bg-secondary/10",
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-neutral via-neutral to-neutral/90 text-white mt-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="footer p-10 lg:p-16">
          {/* Brand Section */}
          <aside>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-primary to-secondary p-4 rounded-2xl shadow-2xl w-fit mb-4"
            >
              <FaRocket className="text-5xl text-white" />
            </motion.div>
            <h2 className="text-3xl font-black mb-3">
              <span className="text-gradient">ClubSphere</span>
            </h2>
            <p className="text-white/80 max-w-xs leading-relaxed font-medium">
              Connecting communities, creating experiences, and building lasting
              friendships since {currentYear}.
            </p>
            <div className="flex items-center gap-2 mt-4 text-accent">
              <FaFire className="text-xl" />
              <span className="font-bold">500+ Active Members</span>
            </div>
          </aside>

          {/* Explore Links */}
          <nav>
            <h6 className="footer-title text-accent font-black text-lg mb-4 flex items-center gap-2">
              <FaRocket className="text-xl" />
              Explore
            </h6>
            {footerLinks.explore.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="link link-hover text-white/80 hover:text-accent font-semibold transition-all hover:translate-x-2 flex items-center gap-2"
              >
                <span className="w-2 h-2 bg-accent rounded-full"></span>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Company Links */}
          <nav>
            <h6 className="footer-title text-secondary font-black text-lg mb-4 flex items-center gap-2">
              <FaHeart className="text-xl" />
              Company
            </h6>
            {footerLinks.company.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="link link-hover text-white/80 hover:text-secondary font-semibold transition-all hover:translate-x-2 flex items-center gap-2"
              >
                <span className="w-2 h-2 bg-secondary rounded-full"></span>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social Section */}
          <nav>
            <h6 className="footer-title text-primary font-black text-lg mb-4">
              Connect With Us
            </h6>
            <p className="text-white/80 mb-4 font-medium">
              Follow us on social media for updates!
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`btn btn-circle bg-white/10 border-2 border-white/20 ${social.bg} ${social.color} backdrop-blur-sm text-white hover:border-white text-xl shadow-lg`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <p className="text-white/80 mb-3 font-semibold">
                Subscribe to our newsletter
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="input input-bordered bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-accent rounded-xl font-medium flex-1"
                />
                <button className="btn bg-gradient-to-r from-primary to-secondary text-white border-0 hover:from-primary/90 hover:to-secondary/90 rounded-xl font-bold shadow-lg">
                  Subscribe
                </button>
              </div>
            </div>
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="border-t-2 border-white/20 py-6 px-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white/80 font-medium text-center md:text-left"
            >
              © {currentYear}{" "}
              <span className="font-bold text-accent">ClubSphere</span>. All
              rights reserved. Made with{" "}
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block text-error"
              >
                <FaHeart className="inline" />
              </motion.span>{" "}
              for communities.
            </motion.p>
            <div className="flex gap-4 text-sm font-semibold">
              <Link
                to="/terms"
                className="link link-hover text-white/80 hover:text-accent transition-colors"
              >
                Terms of Service
              </Link>
              <span className="text-white/40">•</span>
              <Link
                to="/privacy"
                className="link link-hover text-white/80 hover:text-accent transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
