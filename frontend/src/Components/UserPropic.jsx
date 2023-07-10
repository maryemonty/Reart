function UserPropic({ userPropic }) {
  return (
    <img
      src={userPropic}
      alt="user's profile picture"
      style={{ width: "30px", height: "30px" }}
      className="rounded-circle"
    />
  );
}

export default UserPropic;
