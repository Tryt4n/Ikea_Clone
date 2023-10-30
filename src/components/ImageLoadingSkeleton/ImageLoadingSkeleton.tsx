import "./index.scss";

export default function ImageLoadingSkeleton() {
  return (
    <svg
      className="image-loading-skeleton"
      aria-label="Ładowanie zdjęcia"
      viewBox="0 0 640 640"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="a">
          <path d="M0 0h640v640H0z" />
        </clipPath>
        <clipPath id="b">
          <path d="M0 0h168v168H0z" />
        </clipPath>
        <clipPath id="c">
          <path d="M0 0h168v168H0z" />
        </clipPath>
      </defs>
      <g clipPath="url(#a)">
        <g>
          <path
            d="M872.138-38.55v1981.1H-232.138V-38.55H872.138z"
            fill="currentColor"
          />
          <path
            d="M253.227-463.914v927.828h-506.454v-927.828h506.454z"
            fillOpacity="0"
            stroke="#FFF"
            strokeWidth="0"
            transform="matrix(2.18041 0 0 2.1352 320 952)"
          />
        </g>
        <g
          clipPath="url(#b)"
          opacity=".26"
          transform="matrix(2.05 0 0 2.05 147.8 147.8)"
        >
          <g className="F">
            <path
              d="M102.885 24H12v120h119.013"
              fillOpacity="0"
              stroke="#969696"
              strokeLinecap="round"
              strokeWidth="6"
            />
          </g>
          <g className="F">
            <path
              d="M144 36v96H24V36h120z"
              fillOpacity="0"
              stroke="#969696"
              strokeWidth="6"
            />
          </g>
          <path
            d="M116.534 74.834a12.086 12.086 0 009.3-14.368 12.086 12.086 0 00-14.368-9.3 12.084 12.084 0 00-9.07 8.374"
            fillOpacity="0"
            stroke="#969696"
            strokeLinecap="round"
            strokeWidth="8.06814"
          />
          <path
            d="M24.33 101.55l38.64-35.7 1.65 1.821M112.842 88.902c6.996 6.987 31.188 31.158 31.188 31.158"
            fillOpacity="0"
            stroke="#969696"
            strokeLinecap="round"
            strokeWidth="6"
          />
        </g>
        <g
          clipPath="url(#c)"
          opacity=".1"
          transform="matrix(2.02381 0 0 2.02381 150 150)"
        >
          <g className="F">
            <path
              d="M71.451 144h40.026"
              fillOpacity="0"
              stroke="#969696"
              strokeLinecap="round"
              strokeWidth="6"
            />
          </g>
          <g className="F">
            <path
              d="M144 36v96H24V36h120z"
              fillOpacity="0"
              stroke="#969696"
              strokeWidth="6"
            />
          </g>
          <path
            d="M116.534 74.834a12.086 12.086 0 01-14.368-9.3 12.086 12.086 0 019.3-14.368c4.485-.96 8.91.687 11.703 3.926"
            fillOpacity="0"
            stroke="#969696"
            strokeLinecap="round"
            strokeWidth="8.06814"
          />
          <path
            d="M95.34 101.55l-32.37-35.7-5.049 4.665M118.131 94.182l-7.161-7.152L87 111.09"
            fillOpacity="0"
            stroke="#969696"
            strokeLinecap="round"
            strokeWidth="6"
          />
        </g>
      </g>
    </svg>
  );
}
