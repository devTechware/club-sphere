import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-20">
      <div className="footer p-10 max-w-7xl mx-auto">
        <aside>
          <h2 className="text-2xl font-bold">ClubSphere</h2>
          <p className="mt-2">
            Discover, join, and manage local clubs
            <br />
            Building communities since 2024
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <Link to="/clubs" className="link link-hover">
            Browse Clubs
          </Link>
          <Link to="/events" className="link link-hover">
            Upcoming Events
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
        </nav>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-primary"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-primary"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-primary"
            >
              <FaTwitter />
            </a>
          </div>
        </nav>
      </div>
      <div className="footer footer-center p-4 bg-base-300 text-base-content">
        <aside>
          <p>Copyright © {new Date().getFullYear()} - ClubSphere. All rights reserved.</p>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;