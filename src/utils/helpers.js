// Validation amount
export function validationAmount(amount) {
  amount = amount.toLowerCase();

  // Check there is 'rp' word
  if (amount.indexOf("rp") > -1) {
    const rpSplit = amount.split("rp");

    // Check amount is only Rp
    if (
      rpSplit[0].replace(/\s+/g, "") === "" &&
      rpSplit[rpSplit.length - 1].replace(" ", "") === ""
    ) {
      return {
        error: true,
        message: "Missing value"
      };
    } else if (rpSplit[rpSplit.length - 1].replace(/\s+/g, "") === "") {
      // Check Rp is wrong position

      return {
        error: true,
        message: "Valid character in wrong position"
      };
    } else {
      amount = rpSplit[1].replace(/\s+/g, "");
    }
  }
  if (amount.indexOf(".") > -1) {
    amount = amount.replace(".", "");
  }

  // Check if there are ',' & '.' in a input and after ',' is not 00
  if (amount.indexOf(",") > -1 || amount.indexOf(" ") > -1) {
    if (amount.split(",")[1] !== "00") {
      return {
        error: true,
        message: "Invalid separator!"
      };
    }
  }

  return parseInt(amount);
}

// Convert to rupiah
export function convertToRupiah(amount) {
  let rupiah = "";
  let numberRev = amount
    .toString()
    .split("")
    .reverse()
    .join("");
  for (let i = 0; i < numberRev.length; i++)
    if (i % 3 === 0) rupiah += numberRev.substr(i, 3) + ".";
  return (
    "Rp" +
    rupiah
      .split("", rupiah.length - 1)
      .reverse()
      .join("")
  );
}
