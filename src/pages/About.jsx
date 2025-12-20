import { motion } from "framer-motion";
import {
  FaRocket,
  FaUsers,
  FaCalendar,
  FaHeart,
  FaLightbulb,
  FaHandshake,
} from "react-icons/fa";

const About = () => {
  const values = [
    {
      icon: <FaUsers className="text-4xl" />,
      title: "Community First",
      description:
        "We believe in the power of bringing people together and creating meaningful connections.",
      color: "from-primary to-secondary",
    },
    {
      icon: <FaLightbulb className="text-4xl" />,
      title: "Innovation",
      description:
        "Constantly evolving to provide the best club management experience possible.",
      color: "from-secondary to-accent",
    },
    {
      icon: <FaHandshake className="text-4xl" />,
      title: "Inclusivity",
      description:
        "Creating a welcoming space where everyone can find their community and belong.",
      color: "from-accent to-primary",
    },
  ];

  const stats = [
    { number: "1000+", label: "Active Members" },
    { number: "150+", label: "Clubs" },
    { number: "500+", label: "Events Hosted" },
    { number: "50+", label: "Universities" },
  ];

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary via-secondary to-accent py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              About ClubSphere
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed">
              Empowering communities to connect, collaborate, and create
              unforgettable experiences together.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-primary to-secondary p-6 rounded-3xl">
              <FaRocket className="text-6xl text-white" />
            </div>
          </div>
          <h2 className="text-4xl font-black mb-6">Our Mission</h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            ClubSphere was founded with a simple yet powerful vision: to make
            club and event management effortless while fostering genuine
            connections. We believe that when communities thrive, amazing things
            happen. Our platform removes the barriers to organization and
            participation, letting you focus on what matters most—building
            relationships and creating memories.
          </p>
        </motion.div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-4xl font-black text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="card bg-white shadow-xl border-2 border-base-200"
              >
                <div className="card-body items-center text-center">
                  <div
                    className={`bg-gradient-to-br ${value.color} p-6 rounded-2xl text-white mb-4`}
                  >
                    {value.icon}
                  </div>
                  <h3 className="card-title text-2xl font-bold mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card bg-gradient-to-r from-primary to-secondary shadow-xl mb-20"
        >
          <div className="card-body">
            <h2 className="text-4xl font-black text-white text-center mb-12">
              ClubSphere by the Numbers
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-5xl font-black text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-white/90 font-semibold">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-black text-center mb-12">Our Story</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              ClubSphere began in a college dorm room, where a group of students
              struggled to manage their club activities across scattered
              spreadsheets, group chats, and email threads. They knew there had
              to be a better way.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              After months of development and testing with real student
              organizations, ClubSphere was born. What started as a simple club
              management tool has evolved into a comprehensive platform that
              serves communities worldwide.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Today, ClubSphere powers thousands of clubs, from small hobbyist
              groups to large university organizations. Every feature we build,
              every update we release, is driven by feedback from our amazing
              community of users. This is just the beginning—together, we're
              building the future of community engagement.
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <h2 className="text-3xl font-black mb-6">Ready to Join Us?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Be part of a community that's changing how people connect.
          </p>
          <motion.a
            href="/register"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary btn-lg font-bold text-white"
          >
            <FaHeart />
            Get Started Today
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
