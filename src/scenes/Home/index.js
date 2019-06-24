import React, { Component } from "react";
import { Input, Button, Typography, Row, Col } from "antd";
import TableResult from "./components/TableResult";
import { validationAmount } from "../../utils/helpers";
import { fractions } from "../../config/fractions";

class Home extends Component {
  state = {
    amount: "",
    amountLeft: null,
    error: "",
    result: []
  };

  // Event update the react state when user types
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  // Keypress event when user press a key 'enter
  handleKeyPressEnter = e => {
    if (e.key === "Enter") {
      this.calculateFractions();
    }
  };

  // Function to calculate fraction rupiah
  calculateFractions = () => {
    let { amount } = this.state;
    const temp = [];
    const result = [];

    try {
      // Function to validation amount
      const validatedAmount = validationAmount(amount);

      amount = validatedAmount;

      // Calculate the fraction of rupiah currency
      while (amount >= 50) {
        for (let i = 0; i < fractions.length; i += 1) {
          if (amount >= fractions[i]) {
            temp[fractions[i]] = temp[fractions[i]]
              ? temp[fractions[i]] + 1
              : 1;
            amount -= fractions[i];
            break;
          }
        }
      }

      // Result sorting by descending
      let resultByOrder = temp.length - 1;
      temp.forEach((value, key) => {
        result[resultByOrder] = { rupiah: key, quantity: value };
        resultByOrder -= 1;
      });

      return this.setState({ amountLeft: amount, result });
    } catch (err) {
      this.setState({ error: err.message });
      return false;
    }
  };

  render() {
    // Object destructuring
    const { amount, result, amountLeft } = this.state;

    return (
      <div style={{ textAlign: "center", paddingTop: "calc(50vh - 166px)" }}>
        <Row>
          <Col span={24}>
            <Typography.Title>Calculapedia</Typography.Title>
          </Col>
        </Row>
        <Row>
          <Col span={20}>
            <Input
              id="input-amount"
              placeholder="Please input amount of money :)"
              value={amount}
              onChange={this.handleChange("amount")}
              onKeyPress={this.handleKeyPressEnter}
            />
          </Col>
          <Col span={4}>
            <Button
              id="btn-calculate"
              type="primary"
              disabled={amount === ""}
              onClick={() => this.calculateFractions()}
              icon="calculator"
            >
              Calculate
            </Button>
          </Col>
        </Row>

        <TableResult data={result} amountLeft={amountLeft} />
      </div>
    );
  }
}

export default Home;
