import { Star, StarHalf } from "lucide-react";

interface Props {
  rating: number; // example: 2.5, 4.3
  max?: number;   // default 5
  size?: number;
}

const RatingStars = ({ rating, max = 5, size = 16 }: Props) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {/* Full Stars */}
      {Array.from({ length: fullStars }).map((_, index) => (
        <Star
          key={`full-${index}`}
          size={size}
          className="fill-yellow-400 text-yellow-400"
        />
      ))}

      {/* Half Star */}
      {hasHalfStar && (
        <StarHalf
          size={size}
          className="fill-yellow-400 text-yellow-400"
        />
      )}

      {/* Empty Stars */}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <Star
          key={`empty-${index}`}
          size={size}
          className="text-gray-300"
        />
      ))}

      {/* Optional rating text */}
      <span className="ml-2 text-sm text-muted-foreground">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

export default RatingStars;
