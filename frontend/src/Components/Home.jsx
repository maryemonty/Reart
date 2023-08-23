import { Card, CardImg, CardImgOverlay, CardText, CardTitle, Col, Row } from "reactstrap";
import BannerBackground from "../assets/bannerBackground.jpg";
import Cards from "./Cards";
import RandomArtwork from "./RandomArt";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import RightBar from "./RightBar";

function Home() {
  const isDesktopSm = useMediaQuery({ maxWidth: 486 });
  return (
    <div className="overflow-scroll vh-100 overflow-x-hidden">
      <h1 className="fs-1 white fw-bold mb-0">Home</h1>
      <h3 className="fs-6 mb-3">Buy and sell your digital artwork!</h3>
      <Row className="mb-5 me-1">
        <div className="d-flex align-content-stretch gap-1">
          <Col lg={8}>
            <Card className="text-bg-dark mb-1 h-100">
              <CardImg src={BannerBackground} className="card-img h-100" />
              <CardImgOverlay>
                <CardTitle
                  className={isDesktopSm ? "fs-6 fw-bold" : "fs-1 fw-bold"}
                  style={{ textShadow: "2px 2px 5px black", width: "70%" }}
                >
                  Discover What You're Seeking in Our Diverse Categories Here
                </CardTitle>
                <CardText>
                  <Link to="/categories">
                    <button
                      className={
                        isDesktopSm
                          ? "white fs-6 px-2 py-1 fw-bold btn-default rounded border-0 hovered"
                          : "white fs-6 px-4 py-2 fw-bold btn-default rounded border-0 hovered"
                      }
                    >
                      Explore Now
                    </button>
                  </Link>
                </CardText>
              </CardImgOverlay>
            </Card>
          </Col>
          <Col lg={4}>
            <RandomArtwork />
          </Col>
        </div>
      </Row>
      <h2 className="white mb-4">Trending Artwork</h2>
      <Cards />
    </div>
  );
}

export default Home;
