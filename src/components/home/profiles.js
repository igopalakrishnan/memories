// Detect if running on GitHub Pages or locally
const basePath =
  process.env.NODE_ENV === "production"
    ? "/memories/gallery/profiles/"
    : "/gallery/profiles/";

export const birthday = [
  {
    name: "Abinash",
    dob: "22 Jan 2222",
    image: "abinash.jpg",
    color: "rgb(126,196,183)",
    path: "/abinash",
  },
  {
    name: "Abishek",
    image: "abishek.jpg",
    color: "rgb(114,107,100)",
    path: "/abishek",
  },
  {
    name: "AjithKumar",
    image: "ajith.jpg",
    color: "rgb(222,218,207)",
    path: "/ajith",
  },
  {
    name: "Gokul",
    dob: "12 Dec 1995",
    image: "gokul.jpg",
    color: "rgb(58,28,28)",
    path: "/memories/gokul",
  },
  {
    name: "Jaynath",
    image: "jaynath.jpg",
    color: "rgb(222,61,98)",
    path: "/jaynath",
  },
];

export const other = [
  {
    name: "Abinash",
    dob: "12 Jan 1995",
    image: "abinash.jpg",
    color: "green",
    path: "/abinash",
  },
  {
    name: "Abishek",
    image: "abishek.jpg",
    color: "darkgray",
    path: "/abishek",
  },
  {
    name: "AjithKumar",
    image: "ajith.jpg",
    color: "gray",
    path: "/ajith",
  },
  {
    name: "Gokul",
    dob: "12 Jan 1995",
    image: "gokul.jpg",
    color: "gold",
    path: "/gokul",
  },
  {
    name: "Jaynath",
    image: "jaynath.jpg",
    color: "blue",
    path: "/jaynath",
  },
];

// Export basePath so Home.js can use it
export { basePath };
