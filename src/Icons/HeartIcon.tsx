export default function HeartIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      className={className ? className : undefined}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.205 5.599c.954.954 1.415 2.279 1.42 3.614 0 3.065-2.204 5.726-4.138 7.501-1.215 1.116-2.554 2.14-3.98 2.973l-.507.314-.501-.309c-.975-.562-1.888-1.227-2.765-1.93-1.14-.911-2.46-2.127-3.502-3.553-1.038-1.418-1.86-3.124-1.86-4.995-.002-1.251.394-2.59 1.42-3.615a4.859 4.859 0 0 1 6.87 0l.335.335.336-.335c1.873-1.872 5-1.873 6.872 0z"
        className="heart-icon"
        stroke="#111"
        strokeWidth="2"
        fill="transparent"
      />
    </svg>
  );
}
