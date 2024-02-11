import React, { ReactElement } from "react";
import { redirectToLoginPage } from "./utilities/authorize";

export const App = (): ReactElement => {
  return (
    <div>
      Home<button onClick={() => redirectToLoginPage()}>Login</button>
    </div>
  );
};
