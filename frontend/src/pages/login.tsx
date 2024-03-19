import { useState } from "react";
import LoginForm from "@/components/unloggedPages/login";
import RegisterForm from "@/components/unloggedPages/register";
import Image from "next/image";
import background from "@/assets/background.webp";
import logo from "@/assets/logo.png";

const Login = () => {
  const [authAction, setAuthAction] = useState<"login" | "register">("login");
  return (
    <div className="container:2xl column-2 flex h-screen">
      <div className="hidden w-1/2 justify-center rounded-r-2xl lg:flex overflow-hidden">
        <Image
          src={background}
          width={3840}
          height={5760}
          alt="image de fond d'un cuisinier"
        />
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-6 p-4 lg:w-1/2">
        <Image src={logo} height={49} width={83} alt="logo" />
        {authAction === "login" && <LoginForm setAuthAction={setAuthAction} />}
        {authAction === "register" && (
          <RegisterForm setAuthAction={setAuthAction} />
        )}
      </div>
    </div>
  );
};

export default Login;
