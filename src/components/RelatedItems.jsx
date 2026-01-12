import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaUsers, FaArrowRight, FaCalendar, FaMapMarkerAlt } from "react-icons/fa";

const RelatedItems = ({ items = [], type = "clubs", currentItemId }) => {
  // Filter out current item and limit to 4
  const relatedItems = items
    .filter(item => item._id !== currentItemId)
    .slice(0, 4);

  if (relatedItems.length === 0) return null;

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black mb-2">
            {type === "clubs" ? "Similar Clubs" : "Related Events"}
          </h2>
          <p className="text-base-content/70">
            You might also be interested in these
          </p>
        </div>
        <Link
          to={type === "clubs" ? "/clubs" : "/events"}
          className="btn btn-primary btn-outline gap-2"
        >
          View All
          <FaArrowRight />
        </Link>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {relatedItems.map((item) => (
          <motion.div key={item._id} variants={fadeInUp}>
            <Link to={`/${type}/${item._id}`}>
              {type === "clubs" ? (
                // Club Card
                <div className="card bg-base-100 shadow-xl border-2 border-base-200 overflow-hidden card-hover h-full">
                  <figure className="h-40 overflow-hidden">
                    <img
                      src={
                        item.bannerImage ||
                        `https://ui-avatars.com/api/?name=${item.clubName}&size=400&background=random`
                      }
                      alt={item.clubName}
                      className="w-full h-full object-cover"
                    />
                  </figure>
                  <div className="card-body p-4">
                    <div className="badge badge-primary badge-sm font-bold mb-2">
                      {item.category}
                    </div>
                    <h3 className="card-title text-base font-bold line-clamp-1">
                      {item.clubName}
                    </h3>
                    <p className="text-base-content/70 text-xs line-clamp-2 mb-3">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <FaUsers className="text-secondary text-xs" />
                        <span className="text-xs font-bold">
                          {item.memberCount || 0}
                        </span>
                      </div>
                      <div className="badge badge-accent badge-sm font-bold">
                        {item.membershipFee === 0 ? "FREE" : `$${item.membershipFee}`}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Event Card
                <div className="card bg-base-100 shadow-xl border-2 border-base-200 card-hover h-full">
                  <div className="card-body p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="badge badge-secondary badge-sm font-bold text-xs">
                        {item.clubName}
                      </div>
                      {item.isPaid && (
                        <div className="badge badge-accent badge-sm font-bold">
                          ${item.eventFee}
                        </div>
                      )}
                    </div>
                    <h3 className="card-title text-base font-bold line-clamp-2 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-base-content/70 text-xs line-clamp-2 mb-3">
                      {item.description}
                    </p>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <FaCalendar className="text-secondary flex-shrink-0" />
                        <span className="font-semibold">
                          {new Date(item.eventDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <FaMapMarkerAlt className="text-primary flex-shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default RelatedItems;