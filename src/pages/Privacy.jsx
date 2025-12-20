import { motion } from "framer-motion";
import { FaShieldAlt } from "react-icons/fa";

const Privacy = () => {
  const sections = [
    {
      title: "1. Information We Collect",
      content:
        "We collect information you provide directly to us, including: name, email address, profile photo, and payment information. We also collect information about your use of the platform, such as clubs joined, events attended, and interactions with other users.",
    },
    {
      title: "2. How We Use Your Information",
      content:
        "We use the information we collect to: provide and maintain our services; process transactions; send you updates and notifications; improve our platform; ensure security; and comply with legal obligations.",
    },
    {
      title: "3. Information Sharing",
      content:
        "We do not sell your personal information. We may share your information with: service providers (like Stripe for payments); other users (profile information visible to club members); legal authorities when required by law.",
    },
    {
      title: "4. Data Security",
      content:
        "We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure. We use industry-standard encryption for sensitive data.",
    },
    {
      title: "5. Cookies and Tracking",
      content:
        "We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.",
    },
    {
      title: "6. Your Rights",
      content:
        "You have the right to: access your personal data; correct inaccurate data; request deletion of your data; object to processing; export your data; withdraw consent at any time.",
    },
    {
      title: "7. Data Retention",
      content:
        "We retain your personal information for as long as necessary to provide our services and comply with legal obligations. You can request deletion of your account at any time.",
    },
    {
      title: "8. Third-Party Services",
      content:
        "Our platform integrates with third-party services (Firebase for authentication, Stripe for payments, MongoDB for data storage). These services have their own privacy policies.",
    },
    {
      title: "9. Children's Privacy",
      content:
        "ClubSphere is not intended for users under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us.",
    },
    {
      title: "10. International Data Transfers",
      content:
        "Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place for such transfers.",
    },
    {
      title: "11. Changes to Privacy Policy",
      content:
        "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'Last updated' date.",
    },
    {
      title: "12. Contact Us",
      content:
        "If you have questions about this Privacy Policy, please contact us at: privacy@clubsphere.com",
    },
  ];

  return (
    <div className="min-h-screen bg-base-100">
      <div className="bg-gradient-to-r from-secondary to-accent py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white max-w-3xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-6 rounded-3xl">
                <FaShieldAlt className="text-6xl" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-4">
              Privacy Policy
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
                At ClubSphere, we take your privacy seriously. This Privacy
                Policy explains how we collect, use, disclose, and safeguard
                your information when you use our platform.
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
                <h2 className="text-2xl font-bold text-secondary mb-3">
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

export default Privacy;
