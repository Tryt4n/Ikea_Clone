export default function RatingStarIcon({ isEmpty }: { isEmpty?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      aria-hidden="true"
      className={isEmpty ? "no-fill" : ""}
      data-testid={isEmpty ? "rating-star-empty-icon" : "rating-star-icon"}
    >
      <path d="m12 6 2.1245 3.6818 4.1255.9018-2.8125 3.1773L15.8627 18 12 16.2818 8.1373 18l.4252-4.2391L5.75 10.5836l4.1255-.9018L12 6z"></path>
    </svg>
  );
}
