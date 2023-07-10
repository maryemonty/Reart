import { Col, Row } from "reactstrap";
import BannerBackground from "../assets/bannerBackground.jpg";
import Cards from "./Cards";
import RandomArtwork from "./RandomArt";

function Home() {
  return (
    <div className="overflow-scroll vh-100 overflow-x-hidden">
      <h1 className="fs-1 white fw-bold mb-0">Home</h1>
      <h3 className="fs-6 mb-3">Buy and sell your digital artwork!</h3>
      <Row className="mb-5 me-1">
        <Col lg={8}>
          <div className=" position-relative">
            <img
              style={{ filter: "blur(1px)", width: "100%" }}
              src={BannerBackground}
              alt="banner"
              className="rounded"
            />
            <div className="position-absolute top-0 p-3">
              <p className="white fs-2 fw-bold">
                Discover What You're Seeking <br></br>in Our Diverse <br></br> Categories<br></br> Here
              </p>
              <button className="white fs-6 px-4 py-2 fw-bold btn-default rounded border-0">Explore Now</button>
            </div>
          </div>
        </Col>
        <Col lg={4}>
          <RandomArtwork />
        </Col>
      </Row>
      <h2 className="white mb-4">Trending Artwork</h2>
      <Cards />
    </div>
  );
}

export default Home;
