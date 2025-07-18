export const AiIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 20 20" fill="none">
    <defs>
      <linearGradient id="emeraldBlueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" stopOpacity="1" />
        <stop offset="100%" stopColor="#3B82F6" stopOpacity="1" />
      </linearGradient>
      <linearGradient id="darkEmeraldBlueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#065F46" stopOpacity="1" />
        <stop offset="100%" stopColor="#1E40AF" stopOpacity="1" />
      </linearGradient>
    </defs>
    <g transform="rotate(180 10 10)">
      <path d="M14.5039 4C15.8846 4 17.0039 5.11929 17.0039 6.5V13.5C17.0039 14.8807 15.8846 16 14.5039 16H5.50391C4.12319 16 3.00391 14.8807 3.00391 13.5V6.5C3.00391 5.11929 4.12319 4 5.50391 4H14.5039Z" fill="url(#emeraldBlueGradient)" />
      <path d="M5 12C5 10.8954 5.89543 10 7 10H13C14.1046 10 15 10.8954 15 12C15 13.1046 14.1046 14 13 14H7C5.89543 14 5 13.1046 5 12Z" fill="url(#darkEmeraldBlueGradient)" />
      <rect width="2" height="2" rx="1" transform="matrix(1 0 0 -1 7 13)" fill="url(#emeraldBlueGradient)" />
      <rect width="2" height="2" rx="1" transform="matrix(1 0 0 -1 11 13)" fill="url(#emeraldBlueGradient)" />
      <rect y="9.00195" width="2" height="4" rx="1" fill="url(#emeraldBlueGradient)" />
      <rect x="18" y="9.00195" width="2" height="4" rx="1" fill="url(#emeraldBlueGradient)" />
    </g>

    {/* Eyes */}
    <circle cx="8" cy="8" r="0.4" fill="#000000" />
    <circle cx="12" cy="8" r="0.4" fill="#000000" />
  </svg>
);
