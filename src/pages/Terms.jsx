import { motion } from "framer-motion";
import { FaGavel } from "react-icons/fa";

const Terms = () => {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content:
        "By accessing and using ClubSphere, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our service.",
    },
    {
      title: "2. Use License",
      content:
        "Permission is granted to temporarily use ClubSphere for personal, non-commercial use only. This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials; use the materials for any commercial purpose; attempt to decompile or reverse engineer any software contained on ClubSphere; remove any copyright or other proprietary notations from the materials; or transfer the materials to another person.",
    },
    {
      title: "3. User Accounts",
      content:
        "When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms. You are responsible for safeguarding the password and for all activities that occur under your account.",
    },
    {
      title: "4. Club and Event Management",
      content:
        "Club managers are responsible for the accuracy of information posted about their clubs and events. ClubSphere reserves the right to remove any content that violates these terms or is deemed inappropriate.",
    },
    {
      title: "5. Payment Terms",
      content:
        "All payments for club memberships and event registrations are processed through Stripe. By making a payment, you agree to Stripe's terms of service. All fees are non-refundable unless otherwise stated by the club manager.",
    },
    {
      title: "6. Prohibited Activities",
      content:
        "You may not use ClubSphere to: violate any laws; infringe on intellectual property rights; upload malicious code; spam or harass other users; impersonate others; or collect user information without consent.",
    },
    {
      title: "7. Content Ownership",
      content:
        "Content you create and upload remains yours. However, by posting content on ClubSphere, you grant us a license to use, modify, and display that content in connection with our service.",
    },
    {
      title: "8. Termination",
      content:
        "We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.",
    },
    {
      title: "9. Disclaimer",
      content:
        "ClubSphere is provided 'as is' without any warranties, expressed or implied. We do not guarantee that the service will be uninterrupted, secure, or error-free.",
    },
    {
      title: "10. Limitation of Liability",
      content:
        "In no event shall ClubSphere, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.",
    },
    {
      title: "11. Changes to Terms",
      content:
        "We reserve the right to modify or replace these Terms at any time. We will provide notice of any significant changes. Continued use of the service after changes constitutes acceptance of the new terms.",
    },
    {
      title: "12. Contact Information",
      content:
        "If you have any questions about these Terms, please contact us at legal@clubsphere.com.",
    },
  ];

  return (
    <div className="min-h-screen bg-base-100">
      <div className="bg-gradient-to-r from-primary to-secondary py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white max-w-3xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-6 rounded-3xl">
                <FaGavel className="text-6xl" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-4">
              Terms of Service
            </h1>
            <p className="text-xl">Last updated: December 20, 2025</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-lg max-w-none"
        >
          <div className="card bg-white shadow-xl border-2 border-base-200 mb-8">
            <div className="card-body">
              <p className="text-lg text-gray-700 leading-relaxed">
                Please read these Terms of Service carefully before using
                ClubSphere. These terms govern your access to and use of our
                platform.
              </p>
            </div>
          </div>

          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card bg-white shadow-xl border-2 border-base-200 mb-6"
            >
              <div className="card-body">
                <h2 className="text-2xl font-bold text-primary mb-3">
                  {section.title}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {section.content}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;
