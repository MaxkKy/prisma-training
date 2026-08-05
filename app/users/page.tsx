"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type UserType = {
  id: number;
  username: string;
  lastname: string;
  email: string;
  roleId: string;
  role: {
    name: string;
  };
};

export default function Page() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  async function fetchUser() {
    try {
      const res = await axios.get(`/api/user/`);
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  const DeleteEvent = async (id: Number) => {
    try {
      await axios.delete(`/api/user/${id}`);
      alert("Delete Success");
      fetchUser();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <h1>Users</h1>
      <Link href="/login">Create User</Link>
      <div className="container">
        {users.map((item) => (
          <div key={item.id}>
            <li>
              username:{item.username}
              lastname:{item.lastname}
              email:{item.email}
              role:{item.role.name}
              <Link href={`/forgot/${item.id}`}>Edit</Link>
              <button onClick={() => DeleteEvent(item.id)}>delete</button>
            </li>
          </div>
        ))}
        <input
          type="text"
          placeholder="search"
          onChange={(e) => {
            e.target.value;
          }}
        />
        <button>Search</button>
      </div>
    </div>
  );
}
