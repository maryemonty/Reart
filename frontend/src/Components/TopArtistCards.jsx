import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserPropic from "./UserPropic";

function TopArtistCards() {
  const token = useSelector((state) => state.user.token);

  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const artistsWithLikes = data
          .filter((user) => user.artworks.length > 0)
          .map((user) => {
            const totalLikes = user.artworks.reduce((sum, artwork) => sum + artwork.likes, 0);
            return { ...user, totalLikes };
          });

        const sortedArtists = artistsWithLikes.sort((a, b) => b.totalLikes - a.totalLikes);
        const topSixArtists = sortedArtists.slice(0, 6);

        setTopArtists(topSixArtists);
      })
      .catch((error) => console.error("Error:", error));
  }, [token]);

  return (
    <>
      {topArtists.map((artist, index) => (
        <div key={artist.id} className="d-flex gap-3 align-items-center default-bg-color rounded px-1 mb-3 ">
          <p className="m-0">#0{index + 1}</p>
          <UserPropic userPropic={artist.propic} />
          <div>
            <p
              className="m-0 white text-capitalize text-white"
              style={{
                maxWidth: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >{`${artist.name} ${artist.surname}`}</p>
            <p
              className="m-0"
              style={{
                maxWidth: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              @{artist.username}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}

export default TopArtistCards;
