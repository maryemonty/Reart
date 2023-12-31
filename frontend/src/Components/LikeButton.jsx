import { useState, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useSelector } from "react-redux";

const LikeButton = ({ artworkId }) => {
  const [liked, setLiked] = useState(false);
  const [likeId, setLikeId] = useState("");

  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.profile.id);

  const handleClick = () => {
    if (liked) {
      removeLike()
        .then(() => setLiked(false))
        .catch((error) => console.error("Errore durante la rimozione del like", error));
    } else {
      addLike()
        .then(() => setLiked(true))
        .catch((error) => console.error("Errore durante l'aggiunta del like", error));
    }
  };

  const addLike = () => {
    if (!userId || !artworkId) {
      return Promise.reject(new Error("ArtworkId e/o UserId non presenti"));
    }

    return new Promise((resolve, reject) => {
      fetch(`http://localhost:8080/like/${userId}/${artworkId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })
        .then((response) => {
          if (response.ok) {
            resolve();
          } else {
            reject(new Error("Errore durante l'aggiunta del like"));
          }
        })
        .catch((error) => {
          reject(new Error("Errore nella richiesta HTTP:", error));
        });
    });
  };

  const removeLike = () => {
    if (!userId || !artworkId || !likeId) {
      return Promise.reject(new Error("ArtworkId, UserId e/o LikeId non presenti"));
    }

    return new Promise((resolve, reject) => {
      fetch(`http://localhost:8080/like/${likeId}/${artworkId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            resolve();
          } else {
            reject(new Error("Errore durante la rimozione del like"));
          }
        })
        .catch((error) => {
          reject(new Error("Errore nella richiesta HTTP:", error));
        });
    });
  };

  useEffect(() => {
    const checkLikeStatus = () => {
      if (token && userId && artworkId) {
        fetch(`http://localhost:8080/like/${userId}/${artworkId}`)
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Errore durante la verifica dello stato del like");
            }
          })
          .then((data) => {
            setLikeId(data.id);
            console.log(data.id);
            setLiked(true);
          })
          .catch((error) => {
            console.error("Errore nella richiesta HTTP:", error);
          });
      }
    };

    checkLikeStatus();
  }, [token, userId, artworkId]);

  if (!userId || !artworkId) {
    return (
      <button className="bg-transparent border-0 text-white">
        <AiOutlineHeart />
      </button>
    );
  }

  return (
    <button className="bg-transparent border-0 text-white" onClick={handleClick}>
      {liked ? <AiFillHeart /> : <AiOutlineHeart />}
    </button>
  );
};

export default LikeButton;
