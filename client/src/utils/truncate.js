const truncate = (str, desiredLength) => {
  if (!str) return;
  return str?.length > desiredLength
    ? str.slice(0, desiredLength) + " ... "
    : str;
};
export default truncate;
