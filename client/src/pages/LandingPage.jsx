import { loginController } from "../controllers/login";
import { useState } from "react";

export function LandingPage() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordWrong, setIsPasswordWrong] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    let result = await loginController(username, password);
    if (result.status === 2){
      setIsPasswordWrong(true);
    }
  }

  function handlePasswordChange(e){
    if (isPasswordWrong){
      setIsPasswordWrong(false);
    }
    setPassword(e.target.value);
  }

  return (
    <div className="w-full h-full bg-neutral-800 flex justify-center items-center">
      <div className="loginForm w-[500px] h-[300px] bg-neutral-700 flex justify-center items-center rounded-xl">
        <form className="flex flex-col w-3/4 text-white gap-2 text-md">
          <p>Username</p>
          <input
            type="text"
            name="username"
            id="username"
            className="rounded px-2 py-1 border-2 border-neutral-700 focus:outline-none focus:border-blue-400 text-black"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <p>Password</p>
          <input
            type="password"
            name="password"
            id="password"
            className={`rounded px-2 py-1 border-2 border-neutral-700 focus:outline-none focus:border-blue-400 ${isPasswordWrong ? "bg-red-400 animate-[wiggle_0.2s_ease-in-out_2]": "bg-white"} text-black`}
            onChange={(e) => handlePasswordChange(e)}
            value={password}
          />
          <button
            type="submit"
            className="px-4 py-2 border-2 border-blue-400 mt-4 rounded hover:bg-blue-400"
            onClick={(e) => handleLogin(e)}
          >Login</button>
        </form>
      </div>
    </div>
  );
}