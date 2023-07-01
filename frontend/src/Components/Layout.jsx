import { Row, Col } from "reactstrap";
import SideBar from "./SideBar";
import ArtworkSearch from "./ArtworkSearch";
import RightBar from "./RightBar";
import Home from "./Home";
import TopArtist from "./TopArtist";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import YourAccount from "./YourAccount";
import { useSelector } from "react-redux";

function Layout() {
  const username = useSelector((state) => state.user.username);
  return (
    <BrowserRouter>
      <Row>
        <Col lg={2}>
          <SideBar />
        </Col>
        <Col lg={8}>
          <ArtworkSearch />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path={"/youraccount/:profile"} element={<YourAccount />} />
          </Routes>
        </Col>
        <Col>
          <RightBar />
          <TopArtist />
        </Col>
      </Row>
    </BrowserRouter>
  );
}

export default Layout;
