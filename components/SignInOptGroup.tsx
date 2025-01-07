import { signIn } from "@/auth";
import React from "react";
import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

const SignInOptGroup = ({ newUser }: { newUser: boolean }) => {
  return (
    <ul className="signin_options">
      <li className="signin_option">
        <form
          action={async () => {
            "use server";

            await signIn("google");
          }}
          className="flex items-center justify-center"
        >
          <button type="submit">
            <FcGoogle className="signin_option-icon" />
          </button>
        </form>
      </li>
      <li className="signin_option">
        <form
          action={async () => {
            "use server";

            await signIn("facebook");
          }}
          className="flex items-center justify-center"
        >
          <button type="submit">
            <FaFacebook className="signin_option-icon text-blue-500" />
          </button>
        </form>
      </li>
    </ul>
  );
};

export default SignInOptGroup;
