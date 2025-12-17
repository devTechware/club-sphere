import { useParams } from "react-router";

const ClubDetails = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-base-100 shadow-xl rounded-lg overflow-hidden">
          <div className="h-64 bg-base-300"></div>
          <div className="p-8">
            <h1 className="text-4xl font-bold mb-4">Club Details</h1>
            <p className="text-gray-600 mb-4">Club ID: {id}</p>
            <p>Detailed information coming soon...</p>
            <button className="btn btn-primary mt-4">Join Club</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubDetails;
