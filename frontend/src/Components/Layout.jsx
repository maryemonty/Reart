import { Row, Col } from "reactstrap";
import SideBar from "./SideBar";
import ArtworkSearch from "./ArtworkSearch";
import RightBar from "./RightBar";
import Home from "./Home";
import TopArtist from "./TopArtist";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Settings from "./Settings";
import Categories from "./Categories";
import Profile from "./Profile";

function Layout() {
  return (
    <BrowserRouter>
      <Row>
        <Col lg={2}>
          <SideBar />
        </Col>
        <Col lg={8}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path={"/profile/:user"} element={<Profile />} />
            <Route path={"/categories"} element={<Categories />} />
            <Route path={"/settings/:id"} element={<Settings />} />
            <Route path={"/searched"} element={<ArtworkSearch />} />
            <Route path={"/searched/:q"} element={<ArtworkSearch />} />
          </Routes>
        </Col>
        <Col lg={2}>
          <RightBar />
          <TopArtist />
        </Col>
      </Row>
    </BrowserRouter>
  );
}

export default Layout;
