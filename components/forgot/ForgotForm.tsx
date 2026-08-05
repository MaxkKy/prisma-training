"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ForgotForm() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setform] = useState({
    username: "",
    lastname: "",
    password: "",
    email: "",
    roleId: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setform({ ...form, [e.target.name]: e.target.value });

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`/api/user/${id}`);
        setform({
          ...res.data,
          roleId: String(res.data.roleId),
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, [id]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`/api/user/${id}`, {
        ...form,
        roleId: Number(form.roleId),
      });
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" name="username" value={form.username} onChange={onChange} placeholder="username" />
        <input type="text" name="lastname" value={form.lastname} onChange={onChange} placeholder="lastname" />
        <input type="text" name="password" value={form.password} onChange={onChange} placeholder="password" />
        <input type="text" name="email" value={form.email} onChange={onChange} placeholder="email" />
        <label>
          <input type="radio" value="1" name="roleId" onChange={onChange} checked={form.roleId === "1"} />
          User
        </label>
        <label>
          <input type="radio" value="2" name="roleId" onChange={onChange} checked={form.roleId === "2"} />
          Admin
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
