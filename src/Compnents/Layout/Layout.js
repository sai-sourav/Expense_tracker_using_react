import React from "react";
import Header from "./header/Header";
import Footer from "./Footer/Footer";

import "./Layout.css"
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function Layout(props) {
  const isLogin = useSelector(state => state.user.isLogin)
  return (
    <>
      {isLogin && <Header />}
      <Container className="body-background" fluid>{props.children}</Container>
      {isLogin && <Footer />}
    </>
  );
}
