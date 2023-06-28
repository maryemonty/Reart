import UserPropic from "./UserPropic";

function TopArtistCards() {
  return (
    <>
      <div className="d-flex gap-3 align-items-center default-bg-color rounded px-1 mb-3">
        <p className="m-0">#01</p>
        <UserPropic />
        <div>
          <p className="m-0 white">Nome e cognome</p>
          <p className="m-0">@nomeutente</p>
        </div>
      </div>

      <div className="d-flex gap-3 align-items-center default-bg-color rounded px-1 mb-3">
        <p className="m-0">#02</p>
        <UserPropic />
        <div>
          <p className="m-0 white">Nome e cognome</p>
          <p className="m-0">@nomeutente</p>
        </div>
      </div>

      <div className="d-flex gap-3 align-items-center default-bg-color rounded px-1 mb-3">
        <p className="m-0">#02</p>
        <UserPropic />
        <div>
          <p className="m-0 white">Nome e cognome</p>
          <p className="m-0">@nomeutente</p>
        </div>
      </div>
    </>
  );
}

export default TopArtistCards;
