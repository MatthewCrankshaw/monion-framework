/**
 * Handles the login process by sending a POST request to the API with the provided username and password.
 *
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 *
 * @returns {Promise<void>} - A promise that resolves when the login process is complete.
 */
import { buildApiUrl } from "./apiUrlBuilder";

export const handleLogin = async (username: string, password: string) => {
  const url = buildApiUrl("oauth/token");
  const response = await fetch(url, {
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
    throw new Error(response.statusText);
  } else {
    const data = await response.json();
    localStorage.setItem("accessToken", data.accessToken);
  }
};
