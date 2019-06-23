import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { validInputs, invalidInputs } from "../config/input";
import Home from "../scenes/Home";

configure({ adapter: new Adapter() });

describe("Home Scene", () => {
  const wrapper = shallow(<Home />);

  // Home State
  function updateState(amount) {
    it(`updates the amount ${amount} in state`, () => {
      expect(wrapper.state().amount).toEqual(amount);
    });
  }

  function resultState(result) {
    it(`result is ${result}`, () => {
      expect(wrapper.state().result).toEqual(expect.arrayContaining(result));
    });
  }

  function amountLeftState(amountLeft) {
    it(`amount left is ${amountLeft}`, () => {
      expect(wrapper.state().amountLeft).toBe(amountLeft);
    });
  }

  function errorState(error) {
    it(`error ${error}`, () => {
      expect(wrapper.state().error).toBe(error);
    });
  }

  function errorMessageState(errorMessage) {
    it(`error message is ${errorMessage}`, () => {
      expect(wrapper.state().errorMessage).toEqual(errorMessage);
    });
  }

  // Event
  function inputAmount(amount) {
    beforeEach(() => {
      wrapper.find("#input-amount").simulate("change", {
        target: { value: amount }
      });
    });
  }

  function btnCalculateClick() {
    beforeEach(() => wrapper.find("#btn-calculate").simulate("click"));
  }

  function enterKey() {
    beforeEach(() =>
      wrapper.find("#input-amount").simulate("keypress", { key: "Enter" })
    );
  }

  // Valid input function
  function validInput(amount, result, amountLeft) {
    inputAmount(amount);
    updateState(amount);

    describe("click button calculate", () => {
      btnCalculateClick();
      errorState(false);
      resultState(result);
      amountLeftState(amountLeft);
    });

    describe("press enter key", () => {
      enterKey();
      errorState(false);
      resultState(result);
      amountLeftState(amountLeft);
    });
  }

  // Invalid input function
  function invalidInput(amount, error, errorMessage) {
    inputAmount(amount);
    updateState(amount);

    describe("click button calculate", () => {
      btnCalculateClick();
      errorState(error);
      errorMessageState(errorMessage);
    });

    describe("press enter key", () => {
      enterKey();
      errorState(error);
      errorMessageState(errorMessage);
    });
  }

  // Snapshot test
  it("renders properly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  // Initializes state test
  it("initializes data in `state`", () => {
    expect(wrapper.state()).toEqual({
      amount: "",
      amountLeft: null,
      error: false,
      errorMessage: "",
      result: []
    });
  });

  // Valid input test
  describe("valid inputs with their canonical equivalents", () => {
    validInputs.forEach(input => {
      describe(`input: ${input.amount}`, () => {
        validInput(input.amount, input.result, input.amountLeft);
      });
    });
  });

  // Invalid input teest
  describe("invalid inputs", () => {
    invalidInputs.forEach(input => {
      describe(`input: ${input.amount}`, () => {
        invalidInput(input.amount, input.error, input.message);
      });
    });
  });
});
