import React from "react";
import { shallow, configure } from "enzyme";
import Home from "../scenes/Home";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("Home", () => {
  const mockCalculate = jest.fn();
  const props = { calculateFractions: mockCalculate };
  const wrapper = shallow(<Home {...props} />);

  it("renders properly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("initializes data in `state`", () => {
    expect(wrapper.state()).toEqual({
      amount: "",
      amountLeft: null,
      error: false,
      errorMessage: "",
      result: []
    });
  });

  describe("when typing into amount `50000` input", () => {
    const amount = "50000";
    const amountLeft = 0;
    const result = {
      rupiah: 50000,
      quantity: 1
    };

    beforeEach(() => {
      wrapper.find("#input-amount").simulate("change", {
        target: { value: amount }
      });
    });

    it("updates the amount in `state`", () => {
      expect(wrapper.state().amount).toEqual(amount);
    });

    describe("klik button calculate", () => {
      beforeEach(() => wrapper.find("#btn-calculate").simulate("click"));

      it("setelah klik mhasilnya adalah", () => {
        expect(wrapper.state().error).toBe(false);
        expect(wrapper.state().amountLeft).toBe(amountLeft);
        expect(wrapper.state().result).toContainEqual(result);
      });
    });

    describe("tekan tombol enter", () => {
      beforeEach(() =>
        wrapper.find("#input-amount").simulate("keypress", { key: "Enter" })
      );

      it("setelah klik mhasilnya adalah", () => {
        expect(wrapper.state().error).toBe(false);
        expect(wrapper.state().amountLeft).toBe(amountLeft);
        expect(wrapper.state().result).toContainEqual(result);
      });
    });
  });
});
