import type { ReactNode } from "react";

interface CategoryIconProps {
  name: string;
  size?: number;
  className?: string;
}

const paths: Record<string, ReactNode> = {
  git: (
    <>
      <circle cx="6" cy="5" r="2.2" />
      <circle cx="6" cy="19" r="2.2" />
      <circle cx="18" cy="9" r="2.2" />
      <path d="M6 7.2v9.6" />
      <path d="M18 11.2c0 3-2.4 3.9-5 4.3-2.2.35-3.6.9-4.3 2.1" />
    </>
  ),
  linux: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2.2" />
      <path d="M7 9.5 10 12l-3 2.5" />
      <path d="M12.5 15.5H17" />
    </>
  ),
  centos: (
    <>
      <rect x="3" y="4.5" width="18" height="6" rx="1.6" />
      <rect x="3" y="13.5" width="18" height="6" rx="1.6" />
      <path d="M7 7.5h.01M7 16.5h.01" />
    </>
  ),
  ubuntu: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3.5v5M4.6 16.3l4.3-2.5M19.4 16.3l-4.3-2.5" />
    </>
  ),
  node: (
    <>
      <path d="M12 2.8 20 7.4v9.2L12 21.2 4 16.6V7.4z" />
      <path d="M9 14.5V9.5l6 5v-5" />
    </>
  ),
  docker: (
    <>
      <path d="M3 13.5h16c0 3.3-2.4 5.5-6 5.5H8.5c-3 0-5.5-2-5.5-5.5z" />
      <path d="M6 13.5v-3h3v3M10.5 13.5v-3h3v3M15 13.5v-3h3v3M10.5 9V6h3v3" />
      <path d="M19.6 11.2c1 .1 1.6.6 2 1.3" />
    </>
  ),
  nginx: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.4 2.3 3.6 5.2 3.6 8.5s-1.2 6.2-3.6 8.5c-2.4-2.3-3.6-5.2-3.6-8.5S9.6 5.8 12 3.5z" />
    </>
  ),
  ssh: (
    <>
      <circle cx="8" cy="9" r="4" />
      <path d="m11 12 8.5 8.5M16 17l2-2M18.5 19.5l2-2" />
    </>
  ),
  net: (
    <>
      <path d="M4.5 9.5a11 11 0 0 1 15 0" />
      <path d="M7.5 13a7 7 0 0 1 9 0" />
      <path d="M10.5 16.4a3 3 0 0 1 3 0" />
      <circle cx="12" cy="19.5" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  db: (
    <>
      <ellipse cx="12" cy="6" rx="7.5" ry="3" />
      <path d="M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6" />
      <path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" />
    </>
  ),
  vim: (
    <>
      <path d="M4 19.5h4.5L20 8a2.1 2.1 0 0 0-3-3L5.5 16.5z" />
      <path d="M15.5 7.5 18 10" />
      <path d="M4 19.5V16" />
    </>
  ),
  windows: (
    <>
      <rect x="3.5" y="3.5" width="7.5" height="7.5" rx="1" />
      <rect x="13" y="3.5" width="7.5" height="7.5" rx="1" />
      <rect x="3.5" y="13" width="7.5" height="7.5" rx="1" />
      <rect x="13" y="13" width="7.5" height="7.5" rx="1" />
    </>
  ),
  star: <path d="m12 3.6 2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.8l5.9-.8z" />,
};

export default function CategoryIcon({ name, size = 22, className }: CategoryIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] ?? paths.linux}
    </svg>
  );
}
