import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MyArtworks from "./MyArtworks";

function YourAccount() {
  const token = useSelector((state) => state.user.token);
  const propic = useSelector((state) => state.profile.propic);
  const params = useParams();
  console.log(params.user);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8080/profile/${params.user}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error");
        }
      })
      .then((data) => {
        setUsername(data.username);
        setName(data.name);
        setSurname(data.surname);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params.profile]);

  if (isLoading) {
    return (
      <div class="d-flex justify-content-center">
        <div class="spinner-border m-5" role="status" style={{ width: "100px", height: "100px" }}>
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="vh-100 overflow-scroll position-relative bg-black bg-gradient bg-opacity-50">
      {/* background image */}
      <img
        src={propic}
        alt="background-image"
        className="position-absolute top-0 start-0 bottom-0 end-0 h-100 w-100 opacity-25 z-n1 "
        style={{ filter: "blur(500px)" }}
      />
      <div className="d-flex align-items-end gap-3 m-5">
        {/* profile picture */}
        <img
          src={propic}
          alt="profile picture"
          className=" img-fluid rounded-circle"
          style={{ width: "300px", height: "300px" }}
        />
        <div>
          <p className="white fs-1">@{username}</p>
          <p className="white fs-1 text-capitalize">
            {name} {surname}
          </p>
        </div>
      </div>
      <hr></hr>
      <MyArtworks />
    </div>
  );
}

export default YourAccount;
