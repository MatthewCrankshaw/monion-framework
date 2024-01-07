import { ReactElement } from "react";

export const Login = (): ReactElement => {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <label>Username</label>
        <input type="text" />
        <label>Password</label>
        <input type="password" />
      </form>
    </div>
  );
};
