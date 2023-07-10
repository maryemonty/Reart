import { useState, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useSelector } from "react-redux";

function LikeDislike({ artworkId }) {
  const [liked, setLiked] = useState(false);
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.profile.id);
  const dislikeEndpoint = `http://localhost:8080/artworks/dislike/${artworkId}/${userId}`;
  const likeEndpoint = `http://localhost:8080/artworks/like/${artworkId}/${userId}`;

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const response = await fetch(`http://localhost:8080/artworks/isliked/${artworkId}/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const isLiked = await response.json();
          setLiked(isLiked);
        } else {
          console.log("Error checking like status.");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchLikeStatus();
  }, [artworkId, token, userId]);

  const handleLike = () => {
    fetch(likeEndpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Artwork liked successfully.");
          setLiked(true);
        } else {
          console.log("Error liking artwork.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDislike = () => {
    fetch(dislikeEndpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Artwork disliked successfully.");
          setLiked(false);
        } else {
          console.log("Error disliking artwork.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return <div>{liked ? <AiFillHeart onClick={handleDislike} /> : <AiOutlineHeart onClick={handleLike} />}</div>;
}

export default LikeDislike;
