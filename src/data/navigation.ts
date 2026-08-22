export interface NavItem {
  label: string;
  href: string;
  tag?: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "#philosophy" },
  { label: "Projects", href: "#projects" },
  { label: "Residences", href: "#residences" },
  { label: "Destinations", href: "#destinations", tag: "Nature" },
  { label: "Architecture", href: "#architecture-3d" },
  { label: "Lifestyle", href: "#lifestyle" },
  { label: "Journal", href: "#journal" },
  { label: "Contact", href: "#contact" },
];

export const OFFICES = [
  {
    city: "New Delhi & Gurugram",
    country: "India",
    address: "One Horizon Center, Level 19, Golf Course Road, DLF Phase 5, Gurugram 122002",
    phone: "+91 (124) 490 8800",
    email: "gurugram@meridianrealty.com"
  },
  {
    city: "Mumbai",
    country: "India",
    address: "The Capital, Level 14, G-Block, Bandra Kurla Complex, Mumbai 400051",
    phone: "+91 (22) 6902 5500",
    email: "mumbai@meridianrealty.com"
  },
  {
    city: "Dubai",
    country: "United Arab Emirates",
    address: "DIFC Gate Precinct 4, Level 6, Downtown Dubai, UAE",
    phone: "+971 (4) 388 9200",
    email: "dubai@meridianrealty.com"
  },
  {
    city: "London",
    country: "United Kingdom",
    address: "Berkeley Square House, Mayfair, London W1J 6BD",
    phone: "+44 (20) 7946 0912",
    email: "london@meridianrealty.com"
  }
];

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com", handle: "@meridian.residences" },
  { label: "LinkedIn", href: "https://linkedin.com", handle: "Meridian Atelier & Residences" },
  { label: "YouTube Architectural Films", href: "https://youtube.com", handle: "Meridian Architecture" }
];
