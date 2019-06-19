import React, { Component } from "react";
import { Input, Button, Typography, Row, Col, message } from "antd/lib";
import "./index.css";
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

  componentDidUpdate() {
    // Check if input
    if (this.state.error) {
      message.error(this.state.errorMessage, 5);
    }
  }

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
    let amount = parseInt(this.state.amount);
    let temp = [];
    let result = [];

    // Function to validation amount
    const validation = validationAmount(this.state.amount);

    console.log("validation", validation);

    if (validation.error) {
      return this.setState({
        calculate: false,
        error: validation.error,
        errorMessage: validation.message
      });
    }

    amount = validation;

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
      result[resultByOrder] = { money: key, total: value };
      resultByOrder--;
    });

    this.setState({ amountLeft: amount, result: result });
  };

  render() {
    const { amount, result, amountLeft } = this.state;

    return (
      <div className="todoContainer">
        <Row>
          <Col span={24}>
            <Typography.Title>
              Aplikasi Penghitung Pecahan Rupiah
            </Typography.Title>
          </Col>
        </Row>
        <Row>
          <Col span={20}>
            <Input
              placeholder="What needs to be done?"
              value={amount}
              onChange={this.handleChange("amount")}
              onKeyPress={this.handleKeyPressEnter}
            />
          </Col>
          <Col span={4}>
            <Button
              type="primary"
              disabled={amount === ""}
              onClick={() => this.calculateFractions()}
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
