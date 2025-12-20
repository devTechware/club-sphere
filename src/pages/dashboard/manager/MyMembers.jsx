import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import api from "../../../utils/api";
import useAuth from "../../../hooks/useAuth";
import { FaUsers, FaBuilding, FaEnvelope, FaCalendar } from "react-icons/fa";

const MyMembers = () => {
  const { user } = useAuth();

  // Fetch clubs managed by current user
  const { data: clubs } = useQuery({
    queryKey: ["managerClubs"],
    queryFn: async () => {
      const response = await api.get("/clubs");
      return response.data.filter((club) => club.managerEmail === user?.email);
    },
  });

  const clubIds = clubs?.map((c) => c._id) || [];

  // Fetch all memberships for manager's clubs
  const { data: memberships, isLoading } = useQuery({
    queryKey: ["managerMemberships", clubIds],
    queryFn: async () => {
      const response = await api.get("/memberships");
      return response.data.filter((membership) =>
        clubIds.some((id) => id.toString() === membership.clubId.toString())
      );
    },
    enabled: clubIds.length > 0,
  });

  // Group memberships by club
  const membersByClub =
    clubs?.map((club) => ({
      club,
      members:
        memberships?.filter(
          (m) => m.clubId.toString() === club._id.toString()
        ) || [],
    })) || [];

  const totalMembers = memberships?.length || 0;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 font-semibold">Loading members...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-black mb-2">
          Club <span className="text-gradient">Members</span>
        </h1>
        <p className="text-lg text-gray-600 font-medium">
          Members across all your clubs
        </p>
      </motion.div>

      {/* Stats Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-white shadow-xl border-2 border-base-200 mb-8"
      >
        <div className="card-body">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-4 rounded-xl">
              <FaUsers className="text-4xl text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">
                Total Members
              </p>
              <p className="text-4xl font-black">{totalMembers}</p>
              <p className="text-sm text-gray-500">
                Across {clubs?.length || 0} clubs
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Members by Club */}
      {membersByClub.length > 0 ? (
        <div className="space-y-8">
          {membersByClub.map(({ club, members }, index) => (
            <motion.div
              key={club._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card bg-white shadow-xl border-2 border-base-200"
            >
              <div className="card-body">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-secondary/10 p-3 rounded-xl">
                    <FaBuilding className="text-2xl text-secondary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{club.clubName}</h2>
                    <p className="text-sm text-gray-600 font-semibold">
                      {members.length} member{members.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                {members.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="table">
                      <thead>
                        <tr className="bg-base-200">
                          <th className="font-bold text-base">Member</th>
                          <th className="font-bold text-base">Email</th>
                          <th className="font-bold text-base">Joined Date</th>
                          <th className="font-bold text-base">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {members.map((member) => (
                          <tr key={member._id} className="hover:bg-base-200">
                            <td>
                              <div className="flex items-center gap-3">
                                <div className="avatar">
                                  <div className="w-10 rounded-full">
                                    <img
                                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                        member.userEmail
                                      )}`}
                                      alt={member.userEmail}
                                    />
                                  </div>
                                </div>
                                <span className="font-semibold">
                                  {member.userEmail.split("@")[0]}
                                </span>
                              </div>
                            </td>
                            <td>
                              <div className="flex items-center gap-2">
                                <FaEnvelope className="text-gray-400" />
                                <span className="font-semibold">
                                  {member.userEmail}
                                </span>
                              </div>
                            </td>
                            <td>
                              <div className="flex items-center gap-2">
                                <FaCalendar className="text-gray-400" />
                                <span>
                                  {new Date(
                                    member.joinedAt
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </td>
                            <td>
                              <div
                                className={`badge ${
                                  member.status === "active"
                                    ? "badge-success"
                                    : "badge-neutral"
                                } font-bold capitalize`}
                              >
                                {member.status}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No members yet
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card bg-white shadow-xl border-2 border-base-200"
        >
          <div className="card-body text-center py-12">
            <FaUsers className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">No Members Yet</h3>
            <p className="text-gray-600">
              Members will appear here when they join your clubs
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MyMembers;
