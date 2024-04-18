import { useState } from "react";


export default function SignInPage() {
    const [username,setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
      <div>
        <h2>Log In</h2>
        <input type="text" name="username" placeholder="username" value={username}/>
        <input type="text" name="password" placeholder="password" value={password}/>
        <button onChange={console.log(username,password)}>Log In</button>
      </div>
    );
}