// Detect if running on GitHub Pages or locally
const basePath =
  process.env.NODE_ENV === "production"
    ? "/memories/gallery/profiles/"
    : "/gallery/profiles/";

export const birthday = [
  {
    name: "Abinash",
    dob: "15 Dec 2001",
    image: "abinash.jpg",
    color: "rgb(126,196,183)",
    path: "/abinash",
  },
  {
    name: "Abishek",
    dob: "28 Jun 2000",
    image: "abishek.jpg",
    color: "rgb(114,107,100)",
    path: "/abishek",
  },
  {
    name: "AjithKumar",
    dob: "19 Nov 1995",
    image: "ajith.jpg",
    color: "rgb(222,218,207)",
    path: "/ajith",
  },
  {
    name: "Gokul",
    dob: "31 Oct 1998",
    image: "gokul.jpg",
    color: "rgb(58,28,28)",
    path: "/gokul",
  },
  {
    name: "Jaynath",
    dob: "10 Dec 1997",
    image: "jaynath.jpg",
    color: "rgb(222,61,98)",
    path: "/jaynath",
  },
  {
    name: "Kalai",
    dob: "07 Oct 2004",
    image: "kalai.jpg",
    color: "rgb(201,219,129)",
    path: "/kalai",
  },
  {
    name: "Kavin",
    dob: "04 Feb 2001",
    image: "kavin.jpg",
    color: "rgb(168,54,30)",
    path: "/kavin",
  },
  {
    name: "Kaviya",
    dob: "03 Jan 2002",
    image: "female.jpg",
    color: "rgb(251, 228, 226)",
    path: "/kaviya",
  },
  {
    name: "Kishore",
    dob: "12 Nov 2003",
    image: "kishore.jpg",
    color: "rgb(201,164,90)",
    path: "/kishore",
  },
  {
    name: "Manoj",
    dob: "20 Aug 1997",
    image: "manoj.jpg",
    color: "rgb(105,117,125)",
    path: "/manoj",
  },
  {
    name: "Nithya",
    dob: "05 Feb 2001",
    image: "nithya.jpg",
    color: "rgb(42,99,138)",
    path: "/nithya",
  },
  {
    name: "Sathish",
    dob: "24 Jul 1997",
    image: "sathish.jpg",
    color: "rgb(223,216,186)",
    path: "/sathish",
  },
  {
    name: "Shiva",
    dob: "06 Nov 1999",
    image: "shiva.jpg",
    color: "rgb(206,203,214)",
    path: "/shiva",
  },
  {
    name: "Siddiq",
    dob: "14 Jul 2000",
    image: "siddiq.jpg",
    color: "rgb(149,52,68)",
    path: "/siddiq",
  },
  {
    name: "Soundarya",
    dob: "10 Jun 2000",
    image: "soundarya.jpg",
    color: "rgb(200,173,84)",
    path: "/soundarya",
  },
  {
    name: "Tamil",
    dob: "07 Jan 2000",
    image: "tamil-1.jpg",
    color: "rgb(142,71,113)",
    path: "/tamil",
  },
  {
    name: "Vicky",
    dob: "20 Mar 1998",
    image: "vicky.jpg",
    color: "rgb(95,111,129)",
    path: "/vicky",
  },
  {
    name: "Vinoth",
    dob: "02 May 1996",
    image: "vinoth.jpg",
    color: "rgb(68,78,90)",
    path: "/vinoth",
  },
];

export const other = [
  {
    name: "Kfc",
    dob: "2025",
    image: "kfc.jpg",
    color: "rgb(169,57,47)",
    path: "/kfc",
  },
  {
    name: "Ooty",
    dob: "2024",
    image: "ooty.jpg",
    color: "rgb(157,206,213)",
    path: "/ooty",
  },
  {
    name: "Par_malai",
    dob: "2025",
    image: "parvathamalai.jpg",
    color: "rgb(74,78,97)",
    path: "/parvathamalai",
  },
  {
    name: "Pothys",
    dob: "Always",
    image: "pothys.jpg",
    color: "rgb(112,163,130)",
    path: "/pothys",
  },
  {
    name: "Thiru_malai",
    dob: "2025",
    image: "thiruvannamalai.jpg",
    color: "rgb(153,151,138)",
    path: "/thiruvannamalai",
  },
];

// Export basePath so Home.js can use it
export { basePath };
