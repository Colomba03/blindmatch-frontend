"use client";
import { useState } from "react";

export default function ProfilePage() {
    const [username,setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
      <main>
        <h2>Log In</h2>
        <input type="text" name="username" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        <input type="text" name="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={() => console.log(username,password)}>Log In</button>
      </main>
    );
}