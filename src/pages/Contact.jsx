import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    toast.success("Message sent successfully! We'll get back to you soon.", {
      icon: "✉️",
      duration: 4000,
    });
    reset();
  };

  const contactInfo = [
    {
      icon: <FaEnvelope className="text-3xl" />,
      title: "Email",
      content: "support@clubsphere.com",
      link: "mailto:support@clubsphere.com",
    },
    {
      icon: <FaPhone className="text-3xl" />,
      title: "Phone",
      content: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
    {
      icon: <FaMapMarkerAlt className="text-3xl" />,
      title: "Office",
      content: "123 Innovation Drive, Tech City, TC 12345",
      link: null,
    },
  ];

  const socialLinks = [
    { name: "GitHub", icon: <FaGithub />, url: "https://github.com" },
    { name: "LinkedIn", icon: <FaLinkedin />, url: "https://linkedin.com" },
    { name: "Twitter", icon: <FaTwitter />, url: "https://twitter.com" },
  ];

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary to-secondary py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-black mb-4">
              Get in Touch
            </h1>
            <p className="text-xl">
              We'd love to hear from you. Send us a message and we'll respond as
              soon as possible.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="card bg-white shadow-xl border-2 border-base-200">
              <div className="card-body">
                <h2 className="card-title text-3xl font-black mb-6">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold">Your Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className={`input input-bordered ${
                        errors.name ? "input-error" : ""
                      }`}
                      {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && (
                      <label className="label">
                        <span className="label-text-alt text-error">
                          {errors.name.message}
                        </span>
                      </label>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold">
                        Email Address
                      </span>
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className={`input input-bordered ${
                        errors.email ? "input-error" : ""
                      }`}
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    {errors.email && (
                      <label className="label">
                        <span className="label-text-alt text-error">
                          {errors.email.message}
                        </span>
                      </label>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold">Subject</span>
                    </label>
                    <input
                      type="text"
                      placeholder="What's this about?"
                      className={`input input-bordered ${
                        errors.subject ? "input-error" : ""
                      }`}
                      {...register("subject", {
                        required: "Subject is required",
                      })}
                    />
                    {errors.subject && (
                      <label className="label">
                        <span className="label-text-alt text-error">
                          {errors.subject.message}
                        </span>
                      </label>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold">Message</span>
                    </label>
                    <textarea
                      placeholder="Tell us what's on your mind..."
                      className={`textarea textarea-bordered h-32 ${
                        errors.message ? "textarea-error" : ""
                      }`}
                      {...register("message", {
                        required: "Message is required",
                        minLength: {
                          value: 10,
                          message: "Message must be at least 10 characters",
                        },
                      })}
                    />
                    {errors.message && (
                      <label className="label">
                        <span className="label-text-alt text-error">
                          {errors.message.message}
                        </span>
                      </label>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-full btn-lg font-bold text-white"
                  >
                    <FaPaperPlane />
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-black mb-6">Contact Information</h2>

            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                whileHover={{ x: 5 }}
                className="card bg-white shadow-xl border-2 border-base-200"
              >
                <div className="card-body flex-row items-center gap-4">
                  <div className="bg-primary/10 p-4 rounded-xl text-primary">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{info.title}</h3>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-gray-600 hover:text-primary transition-colors"
                      >
                        {info.content}
                      </a>
                    ) : (
                      <p className="text-gray-600">{info.content}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Social Links */}
            <div className="card bg-gradient-to-r from-primary to-secondary shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-white mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className="btn btn-circle bg-white text-primary hover:bg-white/90 border-0"
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="card bg-white shadow-xl border-2 border-base-200">
              <div className="card-body p-0">
                <div className="h-64 bg-gradient-to-br from-base-200 to-base-300 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <FaMapMarkerAlt className="text-6xl text-primary mx-auto mb-4" />
                    <p className="text-gray-600 font-semibold">
                      Map Integration Coming Soon
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
