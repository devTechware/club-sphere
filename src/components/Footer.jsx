import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaRocket,
  FaHeart,
  FaPaperPlane,
} from "react-icons/fa";
import { Link } from "react-router";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "GitHub", icon: <FaGithub />, url: "https://github.com" },
    { name: "LinkedIn", icon: <FaLinkedin />, url: "https://linkedin.com" },
    { name: "Twitter", icon: <FaTwitter />, url: "https://twitter.com" },
  ];

  return (
    <footer className="bg-gradient-to-r from-neutral to-neutral/90 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content - 5 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Column 1: Brand/Logo */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-lg">
                <FaRocket className="text-xl text-white" />
              </div>
              <h2 className="text-xl font-black">
                Club<span className="text-primary">Sphere</span>
              </h2>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Connecting communities and creating memorable experiences.
            </p>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h6 className="font-bold text-base mb-4 text-primary">Explore</h6>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/clubs"
                  className="text-white/70 hover:text-primary transition-colors text-sm block"
                >
                  Browse Clubs
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="text-white/70 hover:text-primary transition-colors text-sm block"
                >
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-white/70 hover:text-primary transition-colors text-sm block"
                >
                  Join Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h6 className="font-bold text-base mb-4 text-secondary">Company</h6>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-white/70 hover:text-secondary transition-colors text-sm block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-white/70 hover:text-secondary transition-colors text-sm block"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-white/70 hover:text-secondary transition-colors text-sm block"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-white/70 hover:text-secondary transition-colors text-sm block"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Social */}
          <div>
            <h6 className="font-bold text-base mb-4 text-accent">Connect</h6>
            <p className="text-white/70 text-sm mb-4">
              Follow us on social media
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-circle btn-sm bg-white/10 border-white/20 hover:bg-primary hover:border-primary text-white"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 5: Newsletter */}
          <div>
            <h6 className="font-bold text-base mb-4">Newsletter</h6>
            <p className="text-white/70 text-sm mb-4">Get updates on events</p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="input input-sm bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-primary rounded-lg"
              />
              <button className="btn btn-sm btn-primary rounded-lg font-semibold gap-2">
                <FaPaperPlane />
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/70 text-sm text-center md:text-left">
              © {currentYear}{" "}
              <span className="font-bold text-white">ClubSphere</span>. All
              rights reserved. Made with{" "}
              <FaHeart className="inline text-error mx-1" /> for communities.
            </p>
            <div className="flex gap-4 text-sm">
              <Link
                to="/terms"
                className="text-white/70 hover:text-white transition-colors"
              >
                Terms
              </Link>
              <span className="text-white/30">•</span>
              <Link
                to="/privacy"
                className="text-white/70 hover:text-white transition-colors"
              >
                Privacy
              </Link>
              <span className="text-white/30">•</span>
              <Link
                to="/sitemap"
                className="text-white/70 hover:text-white transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
