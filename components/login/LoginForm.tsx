"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useApiError } from "@/hook/useApiError";

export default function LoginForm() {
  const [form, setform] = useState({
    username: "",
    lastname: "",
    password: "",
    email: "",
    roleId: "",
  });
  const [saving, setsaving] = useState(false);
  const router = useRouter();
  const { handleError } = useApiError();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setform({ ...form, [e.target.name]: e.target.value });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setsaving(true);

    try {
      await axios.post("/api/user/", { ...form, roleId: Number(form.roleId) });
      router.push("/users");
    } catch (err) {
      handleError(err);
    } finally {
      setsaving(false);
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" name="username" onChange={onChange} placeholder="username" />
        <input type="text" name="lastname" onChange={onChange} placeholder="lastname" />
        <input type="text" name="password" onChange={onChange} placeholder="password" />
        <input type="text" name="email" onChange={onChange} placeholder="email" />
        <label>
          <input type="radio" value="1" name="roleId" onChange={onChange} checked={form.roleId === "1"} />
          User
        </label>
        <label>
          <input type="radio" value="2" name="roleId" onChange={onChange} checked={form.roleId === "2"} />
          Admin
        </label>
        <button type="submit" disabled={saving}>
          {saving ? "saving" : "Create"}
        </button>
        <Link href="/">View</Link>
        <p>test prisma and git and sourcetree</p>
      </form>
    </div>
  );
}
