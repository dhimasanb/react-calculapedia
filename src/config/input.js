export const validInputs = [
  {
    amount: "18.215",
    result: [
      { rupiah: 10000, quantity: 1 },
      { rupiah: 5000, quantity: 1 },
      { rupiah: 1000, quantity: 3 },
      { rupiah: 100, quantity: 2 }
    ],
    amountLeft: 15
  },
  {
    amount: "Rp17500",
    result: [
      { rupiah: 10000, quantity: 1 },
      { rupiah: 5000, quantity: 1 },
      { rupiah: 1000, quantity: 2 },
      { rupiah: 500, quantity: 1 }
    ],
    amountLeft: 0
  },
  {
    amount: "Rp17.500,00",
    result: [
      { rupiah: 10000, quantity: 1 },
      { rupiah: 5000, quantity: 1 },
      { rupiah: 1000, quantity: 2 },
      { rupiah: 500, quantity: 1 }
    ],
    amountLeft: 0
  },
  {
    amount: "Rp 120.325",
    result: [
      { rupiah: 100000, quantity: 1 },
      { rupiah: 20000, quantity: 1 },
      { rupiah: 100, quantity: 3 }
    ],
    amountLeft: 25
  },
  {
    amount: "005.000",
    result: [{ rupiah: 5000, quantity: 1 }],
    amountLeft: 0
  },
  {
    amount: "001000",
    result: [{ rupiah: 1000, quantity: 1 }],
    amountLeft: 0
  }
];

export const invalidInputs = [
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
