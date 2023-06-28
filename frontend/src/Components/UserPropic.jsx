import BannerBackround from "../assets/bannerBackground.jpg";

function UserPropic() {
  return (
    <img
      src={BannerBackround}
      alt="user's profile picture"
      style={{ width: "30px", height: "30px" }}
      className="rounded-circle"
    />
  );
}

export default UserPropic;
