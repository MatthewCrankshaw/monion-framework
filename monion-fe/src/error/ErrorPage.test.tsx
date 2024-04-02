import React from "react";
import { render, screen } from "@testing-library/react";
import { ErrorPage } from "./ErrorPage";

describe("ErrorPage", () => {
  it("renders the error message", () => {
    render(<ErrorPage />);
    const errorMessage = screen.getByText("Oops! Something went wrong");
    expect(errorMessage).toBeInTheDocument();
  });
});
