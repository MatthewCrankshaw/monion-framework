import { ReactElement } from "react";

export const Login = (): ReactElement => {
  return (
    <div
      style={{
        maxWidth: "300px",
        display: "grid",
        gridTemplateRows: "100px auto auto",
        textAlign: "center",
      }}
    >
      <h1>Login</h1>
      <div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "100px auto",
            paddingTop: "10px",
          }}
        >
          <label>Username</label>
          <input type="text" />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "100px auto",
            paddingTop: "10px",
          }}
        >
          <label>Password</label>
          <input type="password" />
        </div>
      </div>
      <button>Login</button>
    </div>
  );
};
