import React from "react";
import { Input } from "./ui/input";
import Button from "./Button";

const SignInForm = () => {
  return (
    <form className="sign-form">
      <div className="form_control-group group">
        <label
          htmlFor="email"
          className="form_control-label group-has-[:focus]:top-0 group-has-[:valid]:top-0"
        >
          Email
        </label>
        <Input
          id="email"
          className="form_control-input"
          type="text"
          name="email"
          required
        />
      </div>
      <div className="form_control-group group">
        <label
          htmlFor="password"
          className="form_control-label group-has-[:focus]:top-0 group-has-[:valid]:top-0"
        >
          Password
        </label>
        <Input
          id="password"
          className="form_control-input"
          type="password"
          name="password"
          required
        />
      </div>
      <Button type="submit" className="form_control-btn">
        Submit
      </Button>
    </form>
  );
};

export default SignInForm;
