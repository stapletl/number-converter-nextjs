const getValidInput = (type: string, input: string) => {
  let validInput = "";

  switch (type) {
    case "Decimal":
      validInput = input.replace(/[^0-9]/g, "");
      break;
    case "Binary":
      validInput = input.replace(/[^01]/g, "");
      break;
    case "Hex":
      validInput = input.replace(/[^0-9a-fA-F]/g, "");
      break;
    case "Octal":
      validInput = input.replace(/[^0-7]/g, "");
      break;
    case "Ascii":
    default:
      break;
  }

  return validInput;
};

export default getValidInput;
