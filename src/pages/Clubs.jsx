import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { useClubs } from "../hooks/useClubs";
import { FaUsers, FaSearch, FaFilter, FaStar, FaArrowRight } from "react-icons/fa";

const Clubs = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");

  const { data: clubs, isLoading, isError } = useClubs(search, category, sort);

  const categories = [
    "all",
    "Sports",
    "Arts",
    "Technology",
    "Music",
    "Photography",
    "Reading",
    "Gaming",
    "Fitness",
    "Other",
  ];

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "highestFee", label: "Highest Fee" },
    { value: "lowestFee", label: "Lowest Fee" },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header Section */}
      <section className="bg-linear-to-r from-primary to-secondary py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl md:text-6xl font-black mb-4">
              Discover Amazing Clubs
            </h1>
            <p className="text-xl md:text-2xl font-medium max-w-2xl mx-auto">
              Find the perfect community that matches your interests
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-xl rounded-2xl p-6 mb-12 border-2 border-base-200"
        >
          <div className="flex items-center gap-2 mb-6">
            <FaFilter className="text-2xl text-primary" />
            <h2 className="text-2xl font-bold">Filter & Search</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-base">Search Clubs</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name..."
                  className="input input-bordered w-full pr-10 focus:input-primary"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <FaSearch className="absolute right-4 top-4 text-gray-400" />
              </div>
            </div>

            {/* Category Filter */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-base">Category</span>
              </label>
              <select
                className="select select-bordered w-full focus:select-primary"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-base">Sort By</span>
              </label>
              <select
                className="select select-bordered w-full focus:select-primary"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        {!isLoading && clubs && (
          <div className="flex items-center justify-between mb-8">
            <p className="text-lg font-semibold text-gray-600">
              Found <span className="text-primary font-bold">{clubs.length}</span> clubs
            </p>
          </div>
        )}

        {/* Clubs Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-24">
            <div className="text-center">
              <span className="loading loading-spinner loading-lg text-primary"></span>
              <p className="mt-4 text-gray-600 font-medium">Loading amazing clubs...</p>
            </div>
          </div>
        ) : isError ? (
          <div className="alert alert-error shadow-lg">
            <span>Error loading clubs. Please try again.</span>
          </div>
        ) : clubs?.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-2xl font-bold text-gray-600 mb-2">No clubs found</p>
            <p className="text-gray-500">Try adjusting your filters</p>
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {clubs?.map((club) => (
              <motion.div
                key={club._id}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
              >
                <Link to={`/clubs/${club._id}`}>
                  <div className="card bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary h-full">
                    <figure className="relative h-52 overflow-hidden">
                      <img
                        src={club.bannerImage || `https://source.unsplash.com/800x600/?${club.category},club`}
                        alt={club.clubName}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                      <div className="absolute top-4 right-4">
                        <div className="badge badge-primary badge-lg font-bold shadow-lg">
                          {club.category}
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                        <FaStar className="text-accent" />
                        <span className="font-semibold">Featured</span>
                      </div>
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title text-xl font-bold line-clamp-1">
                        {club.clubName}
                      </h2>
                      <p className="text-gray-600 line-clamp-2 flex-grow">
                        {club.description}
                      </p>
                      
                      <div className="divider my-2"></div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="badge badge-outline">
                            <FaUsers className="mr-1" />
                            {club.memberCount || 0}
                          </div>
                        </div>
                        <div className="text-xl font-black text-primary">
                          {club.membershipFee > 0 ? `$${club.membershipFee}` : "FREE"}
                        </div>
                      </div>
                      
                      <button className="btn btn-primary w-full mt-4 font-bold group">
                        View Details
                        <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Clubs;