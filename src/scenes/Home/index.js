import React, { Component } from "react";
import { Input, Button, Typography, Row, Col, message } from "antd/lib";
import TableResult from "./components/Table";
import { validationAmount } from "../../utils/helpers";
import { fractions } from "../../config/fractions";

class Home extends Component {
  state = {
    amount: "",
    amountLeft: null,
    error: false,
    errorMessage: "",
    result: []
  };

  // componentDidUpdate() {
  //   // Check if input
  //   if (this.state.error) {
  //     message.error(this.state.errorMessage, 5);
  //   }
  // }

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
    let amount = this.state.amount;
    let temp = [];
    let result = [];

    // Function to validation amount
    const validatedAmount = validationAmount(amount);

    if (validatedAmount.error) {
      return this.setState({
        error: validatedAmount.error,
        errorMessage: validatedAmount.message
      });
    }

    amount = validatedAmount;

    // Calculate the minimun fraction of rupiah currency
    while (amount >= 50) {
      for (var i = 0; i < fractions.length; i++) {
        if (amount >= fractions[i]) {
          temp[fractions[i]] = temp[fractions[i]] ? temp[fractions[i]] + 1 : 1;
          amount = amount - fractions[i];
          break;
        }
      }
    }

    // Result sorting by descending
    let resultByOrder = temp.length - 1;
    temp.forEach((value, key) => {
      result[resultByOrder] = { rupiah: key, quantity: value };
      resultByOrder--;
    });

    this.setState({ amountLeft: amount, result: result });
  };

  render() {
    const { amount, result, amountLeft } = this.state;

    return (
      <div style={{ textAlign: "center", paddingTop: "calc(50vh - 166px)" }}>
        <Row>
          <Col span={24}>
            <Typography.Title>Fraction App</Typography.Title>
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
              loading={this.state.loading}
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
