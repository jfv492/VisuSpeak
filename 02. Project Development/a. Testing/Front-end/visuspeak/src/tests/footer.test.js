/*
  In this file we conducted testing for Footer component
  and it's features utlizing the @testing-library/react library
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; 
import Footer from "../modules/Footer";

describe("Footer component", () => {
  //Testing if the footer renders without erros
  test("renders Footer component without errors", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
  });

  // Testing if navigation links are correct
  test("renders the navigation links with the correct text", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Resources/i)).toBeInTheDocument();
    expect(screen.getByText(/About Us/i)).toBeInTheDocument();
  });
});
