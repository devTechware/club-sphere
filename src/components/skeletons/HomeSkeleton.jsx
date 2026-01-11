import CardSkeleton from "./CardSkeleton";
import EventCardSkeleton from "./EventCardSkeleton";

export const ClubsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
};

export const EventsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, index) => (
        <EventCardSkeleton key={index} />
      ))}
    </div>
  );
};
