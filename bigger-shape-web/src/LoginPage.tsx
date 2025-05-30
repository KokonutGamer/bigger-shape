import React, { useEffect, useState } from "react";
import CardContainer from "./CardContainer";
import Button from "./Button";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { createClient, type Session } from "@supabase/supabase-js";

async function signInWithGoogle() {}

const inputClass =
  "pl-12 w-full rounded px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400";

const LoginPage = () => {
  //   If user is already logged in, redirect them to another page

  const handleSubmit = () => {};

  const handleGoogleLogin = () => {};

  const navigate = useNavigate();

  const [session, setSession] = useState<Session | null>(null);

  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        navigate("/dashboard");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    document.title = "Log Into SHAPE";
  }, []);
  // Things to make it look better
  // interactive hovers or on focus for textboxes
  // Custom error visuals
  return (
    <>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/Seattle.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="w-screen max-w-full flex items-center justify-end overflow-x-hidden">
        <CardContainer
          width={25}
          height={5}
          fromColor="blue-200"
          toColor="blue-500"
          className="flex-col"
        >
          <h1 className="text-xl font-bold text-center">Log Into SHAPE</h1>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
            <Input
              type="email"
              id="email"
              labelText="Email"
              imagePath="/mail.jpg"
              width={5}
              height={4}
              altText="Mail"
            />
            <Input
              type="password"
              id="password"
              labelText="Password"
              imagePath="/lock.png"
              width={5}
              height={5}
              altText="Lock"
            />
            <Button
              type="submit"
              color="green"
              text="Sign In"
              onClick={handleSubmit}
            />
          </form>
          <div className="flex items-center my-4">
            <hr className="flex-grow border-t border-black" />
            <span className="mx-4 text-black">OR</span>
            <hr className="flex-grow border-t border-black" />
          </div>
          <Button
            type="button"
            color="blue"
            onClick={handleGoogleLogin}
            text="Log in with Google"
            imagePath="/google-logo.png"
            altText="Google logo"
          />
          <div className="flex justify-between text-sm">
            <a href="/signup" className="text-blue-600 underline">
              Don't have an account?
            </a>
            <span>Forgot password?</span>
          </div>
        </CardContainer>
      </div>
    </>
  );
};

interface InputProps {
  type: string;
  id: string;
  labelText: string;
  imagePath: string;
  width: number;
  height: number;
  altText: string;
}

const Input: React.FC<InputProps> = ({
  type,
  id,
  labelText,
  imagePath,
  width,
  height,
  altText,
}) => {
  return (
    <>
      <label htmlFor={id} className="text-left block">
        {labelText}
      </label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <img
            src={imagePath}
            alt={altText}
            className={`w-${width} h-${height}`}
          />
          <div className="h-10 w-0.5 bg-gray-300 ml-2" />
        </span>
        <input type={type} id={id} className={inputClass} required />
      </div>
    </>
  );
};

export default LoginPage;
