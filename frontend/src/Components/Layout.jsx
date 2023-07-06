import { Row, Col } from "reactstrap";
import SideBar from "./SideBar";
import ArtworkSearch from "./ArtworkSearch";
import RightBar from "./RightBar";
import Home from "./Home";
import TopArtist from "./TopArtist";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import YourAccount from "./YourAccount";
import Settings from "./Settings";

function Layout() {
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
            <Route path={"/youraccount/:user"} element={<YourAccount />} />
            <Route path={"/categories"} element={<YourAccount />} />
            <Route path={"/settings/:id"} element={<Settings />} />
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
