import React from "react";
import ReactQueryProvider from "./react-query";

type Props = {
  children: React.ReactNode;
};

const Providers = (props: Props) => {
  return <ReactQueryProvider>{props.children}</ReactQueryProvider>;
};

export default Providers;
