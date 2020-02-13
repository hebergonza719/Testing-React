import React from "react";
import App from "./App";
import axios from 'axios';

// no default export, so we're importing everyting from this library
import * as rtl from "@testing-library/react";
// not importing to a variable, since this just overrides jest global variables
import "@testing-library/jest-dom/extend-expect";

jest.mock("axios", () => {
  return {
    get: jest.fn(() => Promise.resolve({
      data: {
        results: [{name: "John"}, {name: "Paul"}, {name: "Ringo"}, {name: "George"}]
      }
    }))
  }
});

test("render of character information", async () => {
  const wrapper = rtl.render(<App />);
  const charactersInfoList = await wrapper.findAllByText(/name/i);
  expect(charactersInfoList[0]).toBeVisible();
});

test('made an api call', async () => {
  const wrapper = rtl.render(<App />);
  await wrapper.findAllByText(/name/i);
  expect(axios.get).toHaveBeenCalled();
});