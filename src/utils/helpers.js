// Check if there are ',' & '.' in a input and after ',' is not 00
function checkSeparator(amount) {
  if (amount.indexOf(",") > -1 || amount.indexOf(" ") > -1) {
    if (amount.split(",")[1] !== "00") {
      throw new Error("Invalid separator!");
    }
  }
}

// Check Rp is wrong position
function checkRpPosition(rpSplit) {
  if (rpSplit[rpSplit.length - 1].replace(/\s+/g, "") === "") {
    throw new Error("Valid character in wrong position");
  }
}

// Check amount is only Rp
function checkOnlyRp(rpSplit) {
  if (
    rpSplit[0].replace(/\s+/g, "") === "" &&
    rpSplit[rpSplit.length - 1].replace(" ", "") === ""
  ) {
    throw new Error("Missing value");
  }
}

// Validation amount
export function validationAmount(amountParam) {
  let amount = amountParam.toLowerCase();

  // Check there is 'rp' word
  if (amount.indexOf("rp") > -1) {
    const rpSplit = amount.split("rp");
    if (checkOnlyRp(rpSplit));
    if (checkRpPosition(rpSplit));
    amount = rpSplit[1].replace(/\s+/g, "");
  }

  if (amount.indexOf(".") > -1) {
    amount = amount.replace(".", "");
  }

  if (checkSeparator(amount));

  return parseInt(amount, 10);
}

// Convert to rupiah
export function convertToRupiah(amount) {
  let rupiah = "";
  const numberRev = amount
    .toString()
    .split("")
    .reverse()
    .join("");
  for (let i = 0; i < numberRev.length; i += 1)
    if (i % 3 === 0) rupiah += `${numberRev.substr(i, 3)}.`;
  return `Rp${rupiah
    .split("", rupiah.length - 1)
    .reverse()
    .join("")}`;
}
