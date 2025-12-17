import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { useClubs } from "../hooks/useClubs";
import { FaUsers, FaSearch } from "react-icons/fa";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-8"
      >
        Discover Clubs
      </motion.h1>

      {/* Search and Filter Section */}
      <div className="bg-base-200 p-6 rounded-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Search</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search clubs..."
                className="input input-bordered w-full pr-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <FaSearch className="absolute right-3 top-4 text-gray-400" />
            </div>
          </div>

          {/* Category Filter */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Category</span>
            </label>
            <select
              className="select select-bordered w-full"
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
              <span className="label-text font-semibold">Sort By</span>
            </label>
            <select
              className="select select-bordered w-full"
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
      </div>

      {/* Clubs Grid */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : isError ? (
        <div className="alert alert-error">
          <span>Error loading clubs. Please try again.</span>
        </div>
      ) : clubs?.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">No clubs found</p>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {clubs?.map((club) => (
            <motion.div
              key={club._id}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              className="card bg-base-100 shadow-xl"
            >
              <figure className="h-48">
                <img
                  src={club.bannerImage || "https://via.placeholder.com/400x300"}
                  alt={club.clubName}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {club.clubName}
                  <div className="badge badge-secondary">{club.category}</div>
                </h2>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {club.description}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FaUsers />
                    <span>{club.memberCount || 0} members</span>
                  </div>
                  <div className="text-sm font-semibold">
                    {club.membershipFee > 0
                      ? `$${club.membershipFee}`
                      : "Free"}
                  </div>
                </div>
                <div className="card-actions justify-end mt-4">
                  <Link
                    to={`/clubs/${club._id}`}
                    className="btn btn-primary btn-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Clubs;