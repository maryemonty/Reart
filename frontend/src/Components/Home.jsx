import BannerBackround from "../assets/bannerBackground.jpg";
import Cards from "./Cards";

function Home() {
  return (
    <div className="overflow-scroll vh-100 ">
      <h1 className="fs-1 white fw-bold mb-0">Home</h1>
      <h3 className="fs-6 mb-3">Buy and sell your digital artwork!</h3>
      <div style={{ width: "97%", height: "300px" }} className="overflow-hidden mb-5 d-flex gap-3 position-relative">
        <img style={{ minWidth: "65%", filter: "blur(1px)" }} src={BannerBackround} alt="banner" className="rounded " />
        <div className="position-absolute top-0 p-3">
          <p className="white fs-2 fw-bold" style={{ width: "40%" }}>
            Discover What you're Seeking in Our Diverse Categories Here
          </p>
          <button className="white fs-6 px-4 py-2 fw-bold btn-default rounded border-0">Explore Now</button>
        </div>
        <img style={{ minWidth: "25%" }} src={BannerBackround} alt="banner" className="rounded" />
      </div>
      <h2 className="white">Trending Artwork</h2>
      <Cards />
    </div>
  );
}

export default Home;
