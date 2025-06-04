import React, { useEffect, useState } from "react";
import CardContainer from "./CardContainer";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useAuth, supabase } from "./AuthContext";

const LoginPage = () => {
  const handleSubmit = () => {};

  const navigate = useNavigate();
  const auth = useAuth();

  // Used to display an error if OAuth2 with Google fails
  const [oAuthError, setOAuthError] = useState(false);

  // If the user is already authenticated, redirect them to the dashboard
  useEffect(() => {
    if (!auth?.isLoading && auth?.session) {
      navigate("/dashboard");
    }
  }, [auth, navigate]);

  useEffect(() => {
    document.title = "Log Into SHAPE";
  }, []);

  const handleGoogleLogin = async () => {
    setOAuthError(false); // reset
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          prompt: "select_account",
        },
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
    if (error) {
      setOAuthError(true);
    }
  };

  if (auth?.isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <video
        src="/Seattle.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
      >
        Your browser does not support the video tag.
      </video>
      <div className="w-screen z-0 max-w-full flex items-center justify-end overflow-x-hidden">
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
          {oAuthError && (
            <p className="text-red-600 font-bold">Error logging into Google.</p>
          )}
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
  const inputClass =
    "pl-12 w-full rounded py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400";
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
