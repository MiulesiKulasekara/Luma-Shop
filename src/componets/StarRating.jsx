import { StarRatingEnum } from "../enums/Enum";

// const totalStars = StarRatingEnum.TOTAL_STARS;
// const rating = StarRatingEnum.RATING

const StarRating = ({ totalStars = 5, rating = 0 }) => {

  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((star, index) => {
        const starValue = index + 1;
        return (
          <span
            key={index}
            className={starValue <= rating ? 'star filled' : 'star'}
          >
            ★ {star}
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;


