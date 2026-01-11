import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { useClubs } from "../hooks/useClubs";
import CardSkeleton from "../components/skeletons/CardSkeleton";
import { FaSearch, FaFilter, FaUsers, FaArrowRight } from "react-icons/fa";

const Clubs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const { data: clubs, isLoading } = useClubs({
    search: searchTerm,
    category: selectedCategory,
    sort: sortBy,
  });

  const categories = [
    "All",
    "Technology",
    "Sports",
    "Arts",
    "Music",
    "Gaming",
    "Photography",
    "Business",
    "Health",
    "Education",
  ];

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "members", label: "Most Members" },
    { value: "name", label: "Name (A-Z)" },
    { value: "fee-low", label: "Fee (Low to High)" },
    { value: "fee-high", label: "Fee (High to Low)" },
  ];

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
    <div className="min-h-screen bg-base-100">
      {/* Header Section */}
      <section className="bg-linear-to-r from-primary/20 via-secondary/20 to-accent/20 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-black mb-4">
              Explore <span className="text-gradient">Clubs</span>
            </h1>
            <p className="text-lg md:text-xl text-base-content/70 mb-8">
              Discover amazing clubs and find your perfect community
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50 text-xl" />
              <input
                type="text"
                placeholder="Search clubs by name or description..."
                className="input input-bordered input-lg w-full pl-12 pr-4 shadow-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-base-200 border-y-2 border-base-300 sticky top-[73px] z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() =>
                    setSelectedCategory(category === "All" ? "" : category)
                  }
                  className={`btn btn-sm ${
                    (category === "All" && !selectedCategory) ||
                    selectedCategory === category
                      ? "btn-primary"
                      : "btn-outline"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3">
              <FaFilter className="text-base-content/70" />
              <select
                className="select select-bordered select-sm font-semibold"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Clubs Grid Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Results Count */}
          {!isLoading && (
            <div className="mb-8">
              <p className="text-base-content/70 font-semibold">
                {clubs?.length || 0} clubs found
                {searchTerm && <span> for "{searchTerm}"</span>}
                {selectedCategory && <span> in {selectedCategory}</span>}
              </p>
            </div>
          )}

          {/* Skeleton Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <CardSkeleton key={index} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && clubs?.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">No clubs found</h3>
              <p className="text-base-content/70 mb-6">
                Try adjusting your search or filters
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("");
                  setSortBy("newest");
                }}
                className="btn btn-primary"
              >
                Clear Filters
              </button>
            </motion.div>
          )}

          {/* Clubs Grid */}
          {!isLoading && clubs && clubs.length > 0 && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {clubs.map((club) => (
                <motion.div key={club._id} variants={fadeInUp}>
                  <Link to={`/clubs/${club._id}`}>
                    <div className="card bg-base-100 shadow-xl border-2 border-base-200 overflow-hidden card-hover h-full">
                      <figure className="h-48 overflow-hidden relative">
                        <img
                          src={
                            club.bannerImage ||
                            `https://ui-avatars.com/api/?name=${club.clubName}&size=600&background=random`
                          }
                          alt={club.clubName}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3">
                          <div className="badge badge-primary font-bold shadow-lg">
                            {club.category}
                          </div>
                        </div>
                        {club.status === "pending" && (
                          <div className="absolute top-3 right-3">
                            <div className="badge badge-warning font-bold shadow-lg">
                              Pending
                            </div>
                          </div>
                        )}
                      </figure>

                      <div className="card-body p-5">
                        <h3 className="card-title text-lg font-bold line-clamp-1">
                          {club.clubName}
                        </h3>
                        <p className="text-base-content/70 text-sm line-clamp-2 leading-relaxed">
                          {club.description}
                        </p>

                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-base-300">
                          <div className="flex items-center gap-2">
                            <FaUsers className="text-secondary text-sm" />
                            <span className="text-xs font-bold">
                              {club.memberCount || 0} members
                            </span>
                          </div>
                          <div className="badge badge-accent font-bold text-xs">
                            {club.membershipFee === 0
                              ? "FREE"
                              : `$${club.membershipFee}`}
                          </div>
                        </div>

                        <button className="btn btn-primary btn-sm w-full mt-3 font-bold group">
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
    </div>
  );
};

export default Clubs;
