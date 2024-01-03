import { RiAuctionLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { BsCollectionFill } from "react-icons/bs";

export const NAVBAR_PAGES = {
  PROFILE: "profile",
  BIDS: "bids",
  PRODUCTS: "products",
};

export const NAVBAR_LINKS = [
  {
    icon: <FaUser />,
    name: "Profile",
    link: "/myAccount/profile",
  },
  {
    icon: <RiAuctionLine />,
    name: "My Bids",
    link: "/myAccount/bids",
  },
  {
    icon: <BsCollectionFill />,
    name: "My Products",
    link: "/myAccount/products",
  },
];
