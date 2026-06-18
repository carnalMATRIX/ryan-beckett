export function WaveformIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`w-8 h-8 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Bar 1 */}
      <rect x="2" y="9" width="3" height="6" rx="1.5">
        <animate
          attributeName="height"
          values="6;16;6"
          dur="1s"
          repeatCount="indefinite"
          begin="0s"
        />
        <animate
          attributeName="y"
          values="9;4;9"
          dur="1s"
          repeatCount="indefinite"
          begin="0s"
        />
      </rect>

      {/* Bar 2 */}
      <rect x="8" y="4" width="3" height="16" rx="1.5">
        <animate
          attributeName="height"
          values="16;6;16"
          dur="0.9s"
          repeatCount="indefinite"
          begin="0.2s"
        />
        <animate
          attributeName="y"
          values="4;9;4"
          dur="0.9s"
          repeatCount="indefinite"
          begin="0.2s"
        />
      </rect>

      {/* Bar 3 */}
      <rect x="14" y="7" width="3" height="10" rx="1.5">
        <animate
          attributeName="height"
          values="10;18;10"
          dur="1.1s"
          repeatCount="indefinite"
          begin="0.4s"
        />
        <animate
          attributeName="y"
          values="7;3;7"
          dur="1.1s"
          repeatCount="indefinite"
          begin="0.4s"
        />
      </rect>

      {/* Bar 4 */}
      <rect x="20" y="9" width="3" height="6" rx="1.5">
        <animate
          attributeName="height"
          values="6;14;6"
          dur="1.2s"
          repeatCount="indefinite"
          begin="0.1s"
        />
        <animate
          attributeName="y"
          values="9;5;9"
          dur="1.2s"
          repeatCount="indefinite"
          begin="0.1s"
        />
      </rect>
    </svg>
  );
}
