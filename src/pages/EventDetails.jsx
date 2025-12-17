import { useParams } from "react-router";

const EventDetails = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-base-100 shadow-xl rounded-lg p-8">
          <h1 className="text-4xl font-bold mb-4">Event Details</h1>
          <p className="text-gray-600 mb-4">Event ID: {id}</p>
          <div className="space-y-4">
            <p>
              <strong>Date:</strong> TBA
            </p>
            <p>
              <strong>Time:</strong> TBA
            </p>
            <p>
              <strong>Location:</strong> TBA
            </p>
            <p>
              <strong>Description:</strong> Coming soon...
            </p>
          </div>
          <button className="btn btn-primary mt-6">Register for Event</button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
