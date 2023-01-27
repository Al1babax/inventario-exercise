import { loginController } from "../controllers/login";
import { useState } from "react";

export function LandingPage() {

  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });
  const [registerInfo, setRegisterInfo] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [isPasswordWrong, setIsPasswordWrong] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  console.log("loginInfo", loginInfo);
  console.log("registerInfo", registerInfo);

  async function handleLogin(e) {
    e.preventDefault();
    let result = await loginController(loginInfo.username, loginInfo.password);
    if (result.status === 2) {
      setIsPasswordWrong(true);
      setTimeout(() => {
        setIsPasswordWrong(false);
      }, 700);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    // TODO: register
  }

  function handleLoginChange(field_name, value) {
    setLoginInfo({ ...loginInfo, [field_name]: value });
  }

  function handleRegisterChange(field_name, value) {
    setRegisterInfo({ ...registerInfo, [field_name]: value });
  }

  return (
    <div className="w-full h-full bg-neutral-800 flex justify-center items-center">
      {!isRegister && <div className="loginForm w-[500px] bg-neutral-700 flex justify-center items-center rounded-xl">
        <form className="flex flex-col w-3/4 text-white gap-2 text-md  py-6">
          <p>Username</p>
          <input
            type="text"
            name="username"
            id="username"
            className="rounded px-2 py-1 border-2 border-neutral-700 focus:outline-none focus:border-blue-400 text-black"
            onChange={(e) => handleLoginChange("username", e.target.value)}
            value={loginInfo.username}
          />
          <p>Password</p>
          <input
            type="password"
            name="password"
            id="password"
            className={`rounded px-2 py-1 border-2 border-neutral-700 focus:outline-none focus:border-blue-400 ${isPasswordWrong ? "bg-red-400 animate-[wiggle_0.2s_ease-in-out_2]" : "bg-white"} text-black`}
            onChange={(e) => handleLoginChange("password", e.target.value)}
            value={loginInfo.password}
          />
          <button
            type="submit"
            className="px-4 py-2 border-2 border-blue-400 mt-4 rounded hover:bg-blue-400"
            onClick={(e) => handleLogin(e)}
          >Login</button>
          <button
            className="px-4 py-2 border-2 border-blue-400 mt-4 rounded hover:bg-blue-400"
            onClick={() => setIsRegister(true)}
          >Register
          </button>
        </form>
      </div>}
      {isRegister && <div className="loginForm w-[500px] bg-neutral-700 flex justify-center items-center rounded-xl">
        <form className="flex flex-col w-3/4 text-white gap-2 text-md bg-red-0 py-6">
          <p>Username</p>
          <input
            type="text"
            name="username"
            id="username"
            className="rounded px-2 py-1 border-2 border-neutral-700 focus:outline-none focus:border-blue-400 text-black"
            onChange={(e) => handleRegisterChange("username", e.target.value)}
            value={registerInfo.username}
          />
          <p>Password</p>
          <input
            type="password"
            name="password"
            id="password"
            className={`rounded px-2 py-1 border-2 border-neutral-700 focus:outline-none focus:border-blue-400 ${isPasswordWrong ? "bg-red-400 animate-[wiggle_0.2s_ease-in-out_2]" : "bg-white"} text-black`}
            onChange={(e) => handleRegisterChange("password", e.target.value)}
            value={registerInfo.password}
          />
          <p>Email</p>
          <input
            type="email"
            name="email"
            id="email"
            className="rounded px-2 py-1 border-2 border-neutral-700 focus:outline-none focus:border-blue-400 text-black"
            onChange={(e) => handleRegisterChange("email", e.target.value)}
            value={registerInfo.email}
          />
          <button
            type="submit"
            className="px-4 py-2 border-2 border-blue-400 mt-4 rounded hover:bg-blue-400"
            onClick={(e) => handleRegister(e)}
          >Register</button>
          <button
            type="submit"
            className="px-4 py-2 border-2 border-blue-400 mt-4 rounded hover:bg-blue-400"
            onClick={() => setIsRegister(false)}
          >Cancel</button>
        </form>
      </div>}
    </div>
  );
}