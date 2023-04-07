import React from "react";
import Header from "./header/Header";
import Footer from "./Footer/Footer";

import "./Layout.css"
import { Container } from "react-bootstrap";
import { useContext } from "react";
import UserContext from "../../Context/user-context";

export default function Layout(props) {
  const userctx = useContext(UserContext);
  return (
    <>
      {userctx.isLogin && <Header />}
      <Container className="body-background">{props.children}</Container>
      {userctx.isLogin && <Footer />}
    </>
  );
}
