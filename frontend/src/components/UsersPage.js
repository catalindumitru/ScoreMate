import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../style/UsersPage.css";

const usersData = [
  { id: 1, name: "User 1", email: "user1@example.com" },
  { id: 2, name: "User 2", email: "user2@example.com" },
  { id: 3, name: "User 3", email: "user3@example.com" },
  { id: 3, name: "User 4", email: "user3@example.com" },
  { id: 3, name: "User 5", email: "user3@example.com" },
  // Add more user data as needed
];

function UsersPage() {
  return (
    <div className="user-list-page">
      <h1>User List</h1>
      <div className="user-list-container">
        <UserCardList users={usersData} />
      </div>
    </div>
  );
}

function UserCardList({ users }) {
  return (
    <div className="user-card-list">
      {users.map((user) => (
        <UserCard key={user.id} user={user} onClick />
      ))}
    </div>
  );
}

function UserCard({ user }) {
  return (
    <Link to={`score/${user.id}`} className="user-card-link">
      <div className="user-card">
        <h2>{user.name}</h2>
      </div>{" "}
    </Link>
  );
}

export default UsersPage;
