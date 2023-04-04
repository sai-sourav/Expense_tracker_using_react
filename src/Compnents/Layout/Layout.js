import React from "react";
import Header from "./header/Header";
import Footer from "./Footer/Footer";

import "./Layout.css"

export default function Layout(props) {
  return (
    <>
      <Header />
      <div className="body-background">{props.children}</div>
      <Footer />
    </>
  );
}
