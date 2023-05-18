const formarNum = (num) => {
  let formattedNumber = "";
  let count = 0;

  const str = num?.toString();
  for (let i = str?.length - 1; i >= 0; i--) {
    count++;
    formattedNumber = str[i] + formattedNumber;
    if (count % 3 === 0 && i > 0) {
      formattedNumber = "." + formattedNumber;
    }
  }

  return formattedNumber;
};
export default formarNum;
