// Detect if running on GitHub Pages or locally
const basePath =
  process.env.NODE_ENV === "production"
    ? "/memories/gallery/profiles/"
    : "/gallery/profiles/";

export const profileGroups = [
  {
    mainColor: "#444",
    icon: "bi bi-people-fill",
    profiles: [
      {
        name: "Abinash",
        dob: "15 Dec 2001",
        image: "abinash.webp",
        color: "rgb(126,196,183)",
        path: "/abinash",
      },
      {
        name: "Abishek",
        dob: "28 Jun 2000",
        image: "abishek.webp",
        color: "rgb(114,107,100)",
        path: "/abishek",
      },
      {
        name: "Ajith",
        dob: "03 Mar",
        color: "#e60023",
        image: "/gallery/profiles/ajith.webp",
      },
      {
        name: "Kalai",
        dob: "04 Apr",
        color: "#0a66c2",
        image: "/gallery/profiles/kalai.webp",
      },
      {
        name: "Kavin",
        dob: "05 May",
        color: "#ff4500",
        image: "/gallery/profiles/kavin.webp",
      },
      {
        name: "Mani",
        dob: "06 Jun",
        color: "#ff9900",
        image: "/gallery/profiles/mani.webp",
      },
      {
        name: "Ravi",
        dob: "07 Jul",
        color: "#009688",
        image: "/gallery/profiles/ravi.webp",
      },
      {
        name: "Suresh",
        dob: "08 Aug",
        color: "#673ab7",
        image: "/gallery/profiles/suresh.webp",
      },
    ],
  },
  {
    mainColor: "#555",
    icon: "bi bi-people-fill",
    profiles: [
      // 8 profiles for group 2
      {
        name: "Abinash",
        dob: "01 Jan",
        color: "#1877f2",
        image: "/gallery/profiles/abinash.webp",
      },
      {
        name: "Abishek",
        dob: "02 Feb",
        color: "#1da1f2",
        image: "/gallery/profiles/abishek.webp",
      },
      {
        name: "Ajith",
        dob: "03 Mar",
        color: "#e60023",
        image: "/gallery/profiles/ajith.webp",
      },
      {
        name: "Kalai",
        dob: "04 Apr",
        color: "#0a66c2",
        image: "/gallery/profiles/kalai.webp",
      },
      {
        name: "Kavin",
        dob: "05 May",
        color: "#ff4500",
        image: "/gallery/profiles/kavin.webp",
      },
      {
        name: "Mani",
        dob: "06 Jun",
        color: "#ff9900",
        image: "/gallery/profiles/mani.webp",
      },
      {
        name: "Ravi",
        dob: "07 Jul",
        color: "#009688",
        image: "/gallery/profiles/ravi.webp",
      },
      {
        name: "Suresh",
        dob: "08 Aug",
        color: "#673ab7",
        image: "/gallery/profiles/suresh.webp",
      },
    ],
  },
  {
    mainColor: "#666",
    icon: "bi bi-people-fill",
    profiles: [
      // 8 profiles for group 3
      {
        name: "Abinash",
        dob: "01 Jan",
        color: "#1877f2",
        image: "/gallery/profiles/abinash.webp",
      },
      {
        name: "Abishek",
        dob: "02 Feb",
        color: "#1da1f2",
        image: "/gallery/profiles/abishek.webp",
      },
      {
        name: "Ajith",
        dob: "03 Mar",
        color: "#e60023",
        image: "/gallery/profiles/ajith.webp",
      },
      {
        name: "Kalai",
        dob: "04 Apr",
        color: "#0a66c2",
        image: "/gallery/profiles/kalai.webp",
      },
      {
        name: "Kavin",
        dob: "05 May",
        color: "#ff4500",
        image: "/gallery/profiles/kavin.webp",
      },
      {
        name: "Mani",
        dob: "06 Jun",
        color: "#ff9900",
        image: "/gallery/profiles/mani.webp",
      },
      {
        name: "Ravi",
        dob: "07 Jul",
        color: "#009688",
        image: "/gallery/profiles/ravi.webp",
      },
      {
        name: "Suresh",
        dob: "08 Aug",
        color: "#673ab7",
        image: "/gallery/profiles/suresh.webp",
      },
    ],
  },
];

// Export basePath so Home.js can use it
export { basePath };
