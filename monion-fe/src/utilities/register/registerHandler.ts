import { buildApiUrl } from "../login/apiUrlBuilder";

export const handleRegister = async (
  email: string,
  password: string
): Promise<any> => {
  const url = buildApiUrl("user/register");
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  if (!response.ok) {
    const responseBody = await response.json();
    const errorMessage = responseBody.data.message || response.statusText;
    console.log("response", responseBody);
    throw new Error(errorMessage);
  }

  return response;
};
