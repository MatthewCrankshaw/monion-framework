export const handleLogin = async (username: string, password: string) => {
  if (
    !process.env.REACT_APP_CLIENT_ID ||
    !process.env.REACT_APP_CLIENT_SECRET
  ) {
    throw new Error("The oauth client must be defined in the environment");
  }

  const response = await fetch("http://localhost:3000/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: process.env.REACT_APP_CLIENT_ID!,
      client_secret: process.env.REACT_APP_CLIENT_SECRET!,
      scope: "super",
      grant_type: "password",
      username: username,
      password: password,
    }),
  });

  if (!response.ok) {
    // Handle error
    console.error("Failed to login", response);
  } else {
    const data = await response.json();
    // Handle success
    console.log("Login successful", data);
  }
};
