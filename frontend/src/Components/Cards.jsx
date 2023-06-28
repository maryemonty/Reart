import BannerBackround from "../assets/bannerBackground.jpg";
import UserPropic from "./UserPropic";

function Cards() {
  return (
    <div className="d-flex gap-3" style={{ width: "97%" }}>
      <div className="card mb-5 border-0 ">
        <div className="position-relative">
          <img src={BannerBackround} className="card-img-top" alt="logo" />
          <p className=" white position-absolute bottom-0 rounded px-4 py-2" style={{ backdropFilter: "blur(10px)" }}>
            Current Bid <br></br> 2000$
          </p>
        </div>
        <div className="card-body default-bg-color">
          <h5 className="card-title white">Titolo Opera</h5>
          <div className="d-flex gap-2 mb-2">
            <UserPropic />
            <p className="card-text white">@nomeutente</p>
          </div>
          <div className="d-flex justify-content-between ">
            <button className="white fs-6 px-3 py-1 fw-bold btn-default rounded border-0">Place a bid</button>
            <button className="white fs-6 px-3 py-1 fw-bold rounded bg-transparent">View Artwork</button>
          </div>
        </div>
      </div>
      <div className="card mb-5 border-0">
        <img src={BannerBackround} className="card-img-top" alt="logo"></img>
        <div className="card-body default-bg-color">
          <h5 className="card-title white">Titolo Opera</h5>
          <div className="d-flex gap-2 mb-2">
            <img
              src={BannerBackround}
              alt="user's profile picture"
              style={{ width: "30px", height: "30px" }}
              className="rounded-circle"
            />
            <p className="card-text white">@nomeutente</p>
          </div>
          <div className="d-flex justify-content-between ">
            <button className="white fs-6 px-3 py-1 fw-bold btn-default rounded border-0">Place a bid</button>
            <button className="white fs-6 px-3 py-1 fw-bold rounded bg-transparent">View Artwork</button>
          </div>
        </div>
      </div>
      <div className="card mb-5 border-0">
        <img src={BannerBackround} className="card-img-top" alt="logo"></img>
        <div className="card-body default-bg-color">
          <h5 className="card-title white">Titolo Opera</h5>
          <div className="d-flex gap-2 mb-2">
            <img
              src={BannerBackround}
              alt="user's profile picture"
              style={{ width: "30px", height: "30px" }}
              className="rounded-circle"
            />
            <p className="card-text white">@nomeutente</p>
          </div>
          <div className="d-flex justify-content-between ">
            <button className="white fs-6 px-3 py-1 fw-bold btn-default rounded border-0">Place a bid</button>
            <button className="white fs-6 px-3 py-1 fw-bold rounded bg-transparent">View Artwork</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
