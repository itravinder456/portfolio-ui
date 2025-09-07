import React from "react";
import Home from "./(public)/home/page";

export const metadata = {
  title: "Home | Ravinder Varikuppala",
  description:
    "Crafting scalable, modern, and user-friendly web applications with over 6 years of hands-on experience in React.js, Node.js, Express.js, and MongoDB.",
};

type Props = {
  params: { slug: string[] };
};

const Page = (props: Props) => {
  return <Home />;
};

export default Page;
