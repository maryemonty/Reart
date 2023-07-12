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
      removeLike();
    } else {
      addLike();
    }
  };

  const addLike = async () => {
    try {
      const response = await fetch(`http://localhost:8080/like/${userId}/${artworkId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        const data = await response.json();
        setLiked(true);
        setLikeId(data.id);
        console.log(likeId);
      } else {
        console.error("Errore durante l'aggiunta del like");
      }
    } catch (error) {
      console.error("Errore nella richiesta HTTP:", error);
    }
  };

  const removeLike = async () => {
    try {
      const response = await fetch(`http://localhost:8080/like/${likeId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setLiked(false);
      } else {
        console.error("Errore durante la rimozione del like");
      }
    } catch (error) {
      console.error("Errore nella richiesta HTTP:", error);
    }
  };

  useEffect(() => {
    const checkLikeStatus = async () => {
      try {
        const response = await fetch(`http://localhost:8080/like/${userId}/${artworkId}`);
        if (response.ok) {
          setLiked(true);
        }
      } catch (error) {
        console.error("Errore nella richiesta HTTP:", error);
      }
    };

    checkLikeStatus();
  }, [userId, artworkId]);

  return (
    <button className="bg-transparent border-0 text-white" onClick={handleClick}>
      {liked ? <AiFillHeart /> : <AiOutlineHeart />}
    </button>
  );
};

export default LikeButton;
