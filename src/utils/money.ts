const roundAmount = (amount: number) => {
  const pennies = amount * 100;
  return Math.ceil(pennies) / 100;
};

// eslint-disable-next-line import/prefer-default-export
export { roundAmount };
