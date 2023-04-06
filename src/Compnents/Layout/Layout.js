import React from "react";
import Header from "./header/Header";
import Footer from "./Footer/Footer";

import "./Layout.css"
import { Container } from "react-bootstrap";

export default function Layout(props) {
  return (
    <>
      <Header />
      <Container className="body-background">{props.children}</Container>
      <Footer />
    </>
  );
}
