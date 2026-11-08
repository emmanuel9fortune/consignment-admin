import React from "react";

export default function TrafficLight({ active = "orange", size = 35, ariaLabel = "Traffic light" }) {
  const width = Math.round(size * 0.6);
  const height = Math.round(size * 2.2);
  const cx = width / 2;
  const r = Math.round(width * 0.18);

  const colors = {
    redOn: "#ff4d4d",
    orangeOn: "#ffb84d",
    greenOn: "#33cc33",
    off: "#222222",
    glass: "rgba(255,255,255,0.06)",
  };

  const isOn = (color) => active === color;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={ariaLabel}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Glow filters for each colour */}
        <filter id="glowRed" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glowOrange" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glowGreen" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* simple keyframe-like animation using SMIL for a subtle pulse on the active light */}
        <radialGradient id="shine" cx="30%" cy="25%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.65)" />
          <stop offset="45%" stopColor="rgba(255,255,255,0.15)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>

      {/* traffic body */}
      <rect
        x={Math.round(width * 0.08)}
        y={Math.round(height * 0.06)}
        rx={Math.round(width * 0.12)}
        ry={Math.round(width * 0.12)}
        width={Math.round(width * 0.84)}
        height={Math.round(height * 0.88)}
        fill="#111213"
        stroke="#0b0b0b"
        strokeWidth={Math.max(1, Math.round(width * 0.03))}
      />

      {/* glass overlay for subtle highlight */}
      <rect
        x={Math.round(width * 0.08)}
        y={Math.round(height * 0.06)}
        rx={Math.round(width * 0.12)}
        ry={Math.round(width * 0.12)}
        width={Math.round(width * 0.84)}
        height={Math.round(height * 0.44)}
        fill={colors.glass}
      />

      {/* three lights vertically spaced */}
      {/* Red */}
      <g>
        <circle
          cx={cx}
          cy={Math.round(height * 0.26)}
          r={r}
          fill={isOn("red") ? colors.redOn : colors.off}
          stroke={isOn("red") ? colors.redOn : "#000000"}
          strokeWidth={isOn("red") ? Math.max(2, Math.round(r * 0.12)) : 1}
          filter={isOn("red") ? "url(#glowRed)" : undefined}
        >
          {isOn("red") && (
            <animate
              attributeName="r"
              values={`${r};${Math.round(r * 1.06)};${r}`}
              dur="1.6s"
              repeatCount="indefinite"
            />
          )}
        </circle>
        {isOn("red") && (
          <circle cx={cx} cy={Math.round(height * 0.26)} r={Math.round(r * 0.78)} fill="url(#shine)" opacity="0.25" />
        )}
      </g>

      {/* Orange / Amber */}
      <g>
        <circle
          cx={cx}
          cy={Math.round(height * 0.50)}
          r={r}
          fill={isOn("orange") ? colors.orangeOn : colors.off}
          stroke={isOn("orange") ? colors.orangeOn : "#000000"}
          strokeWidth={isOn("orange") ? Math.max(2, Math.round(r * 0.12)) : 1}
          filter={isOn("orange") ? "url(#glowOrange)" : undefined}
        >
          {isOn("orange") && (
            <animate
              attributeName="r"
              values={`${r};${Math.round(r * 1.06)};${r}`}
              dur="1.6s"
              repeatCount="indefinite"
            />
          )}
        </circle>
        {isOn("orange") && (
          <circle cx={cx} cy={Math.round(height * 0.50)} r={Math.round(r * 0.78)} fill="url(#shine)" opacity="0.25" />
        )}
      </g>

      {/* Green */}
      <g>
        <circle
          cx={cx}
          cy={Math.round(height * 0.74)}
          r={r}
          fill={isOn("green") ? colors.greenOn : colors.off}
          stroke={isOn("green") ? colors.greenOn : "#000000"}
          strokeWidth={isOn("green") ? Math.max(2, Math.round(r * 0.12)) : 1}
          filter={isOn("green") ? "url(#glowGreen)" : undefined}
        >
          {isOn("green") && (
            <animate
              attributeName="r"
              values={`${r};${Math.round(r * 1.06)};${r}`}
              dur="1.6s"
              repeatCount="indefinite"
            />
          )}
        </circle>
        {isOn("green") && (
          <circle cx={cx} cy={Math.round(height * 0.74)} r={Math.round(r * 0.78)} fill="url(#shine)" opacity="0.25" />
        )}
      </g>
    </svg>
  );
}
