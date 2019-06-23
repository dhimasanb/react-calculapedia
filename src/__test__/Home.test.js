import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
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
    let objectResult = (rupiah, quantity) => {
      return { rupiah, quantity };
    };

    const validInputs = [
      {
        amount: "18.215",
        result: [
          objectResult(10000, 1),
          objectResult(5000, 1),
          objectResult(1000, 3),
          objectResult(100, 2)
        ],
        amountLeft: 15
      },
      {
        amount: "Rp17500",
        result: [
          objectResult(10000, 1),
          objectResult(5000, 1),
          objectResult(1000, 2),
          objectResult(500, 1)
        ],
        amountLeft: 0
      },
      {
        amount: "Rp17.500,00",
        result: [
          objectResult(10000, 1),
          objectResult(5000, 1),
          objectResult(1000, 2),
          objectResult(500, 1)
        ],
        amountLeft: 0
      },
      {
        amount: "Rp 120.325",
        result: [
          objectResult(100000, 1),
          objectResult(20000, 1),
          objectResult(100, 3)
        ],
        amountLeft: 25
      },
      {
        amount: "005.000",
        result: [objectResult(5000, 1)],
        amountLeft: 0
      },
      {
        amount: "001000",
        result: [objectResult(1000, 1)],
        amountLeft: 0
      }
    ];

    validInputs.forEach((input) => {
      describe(`input: ${input.amount}`, () => {
        validInput(input.amount, input.result, input.amountLeft);
      });
    });
  });

  // Invalid input teest
  describe("invalid inputs", () => {
    const invalidInputs = [
      {
        amount: "17,500",
        error: true,
        message: "Invalid separator!"
      },
      {
        amount: "2 500",
        error: true,
        message: "Invalid separator!"
      },
      {
        amount: "3000 Rp",
        error: true,
        message: "Valid character in wrong position"
      },
      {
        amount: "3000 Rp",
        error: true,
        message: "Valid character in wrong position"
      },
      {
        amount: "Rp",
        error: true,
        message: "Missing value"
      }
    ];

    invalidInputs.forEach((input) => {
      describe(`input: ${input.amount}`, () => {
        invalidInput(input.amount, input.error, input.message);
      });
    });
  });
});
