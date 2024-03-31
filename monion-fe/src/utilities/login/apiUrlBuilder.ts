/**
 * Builds the API URL for a given endpoint.
 *
 * @param endpoint - The endpoint to build the URL for.
 *
 * @returns The complete API URL.
 */
export const buildApiUrl = (endpoint: string): string => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const port = process.env.REACT_APP_API_PORT;
  return `${baseUrl}:${port}/${endpoint}`;
};
