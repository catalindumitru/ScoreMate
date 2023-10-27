import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/UsersPage.css";
import { getOpponents } from "../database/accessor";

function UsersPage() {
  const [opponents, setOpponents] = useState(
    JSON.parse(sessionStorage.getItem("opponents")) || []
  );

  useEffect(() => {
    if (!sessionStorage.getItem("opponents")) {
      getOpponents().then((data) => {
        sessionStorage.setItem("opponents", JSON.stringify(data.opponents));
        setOpponents(data.opponents);
      });
    }
  }, []);

  return (
    <div className="user-list-page">
      <h1>Opponents</h1>
      <div className="user-list-container">
        <UserCardList users={opponents} />
      </div>
    </div>
  );
}

function UserCardList({ users }) {
  return (
    <div className="user-card-list">
      {users.map((user, idx) => (
        <UserCard key={idx} user={user} onClick />
      ))}
    </div>
  );
}

function UserCard({ user }) {
  return (
    <Link to={`score/${user}`} className="user-card-link">
      <div className="user-card">
        <h2>{user}</h2>
      </div>{" "}
    </Link>
  );
}

export default UsersPage;
