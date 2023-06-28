import { Row, Col } from "reactstrap";
import SideBar from "./SideBar";
import ArtworkSearch from "./ArtworkSearch";
import RightBar from "./RightBar";
import Home from "./Home";
import TopArtist from "./TopArtist";

function Layout() {
  return (
    <>
      <Row>
        <Col lg={2}>
          <SideBar />
        </Col>
        <Col lg={8}>
          <ArtworkSearch />
          <Home />
        </Col>
        <Col>
          <RightBar />
          <TopArtist />
        </Col>
      </Row>
    </>
  );
}

export default Layout;
