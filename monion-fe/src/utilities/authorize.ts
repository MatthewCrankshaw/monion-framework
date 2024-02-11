export function redirectToLoginPage(): void {
  const authorizeUrl =
    "http://127.0.0.1:3000/oauth/authorize?client_id=blah3&redirect_uri=http://127.0.0.1:80/login&response_type=code&state=aaaaaaaaaaaaa";

  fetch(authorizeUrl, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJFUzM4NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkMDYzMTU3YS0zYWU2LTQ4MDktYTYxYi1iN2MyN2Q1ZmM1ZDEiLCJpc3MiOiJtb25pb24iLCJhdWQiOiJibGFoIiwic2NvcGUiOiJ0ZXN0IiwiZXhwIjoxNzA3Njc5MDY5LCJpYXQiOjE3MDc2NzU0Njl9.zhaLaH5Kx9-r2hHckb7VAcLWC8hZRAoJKP6ct5bG7bjrMPJ8bWou03gNIy8nSRDpYpTB74JqT0bh5yRysln9BGPj3yZFz85seE592Ich2TFaXPchCYSLWDq7-BNCWVdP",
    },
  })
    .then((response) => {
      if (response.redirected) {
        window.location.href = response.url;
      }
    })
    .catch((error) => {
      console.error("Error redirecting to login page:", error);
    });
}
