import React from "react";
import About from "./about";

type Props = {
  slug?: string;
};

const page = (props: Props) => {
  return <About />;
};

export default page;
