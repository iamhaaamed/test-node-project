import moment from 'moment';
import CommissionTypeEnum from '../constants/commission';
import { Input } from '../types';
import { roundAmount } from './money';

const calculateCashIn = (amount: number) => {
  const commission = roundAmount(amount * CommissionTypeEnum.CASH_IN);
  console.log(commission > 5 ? 5 : commission);
};

const calculateJuridicalCashOut = (amount: number) => {
  if (amount < 0.5) {
    console.log(0);
  } else {
    console.log(roundAmount(amount * CommissionTypeEnum.CASH_OUT));
  }
};

const calculateNaturalCashOut = (
  transactions: Input[],
  user_id: number,
  date: string,
  amount: number,
) => {
  const res = transactions.filter(
    (a) => a.user_id === user_id && a.date <= date && moment(a.date).week() === moment(date).week(),
  );
  const weeklyTransactionAmount = res.reduce((acc, cur) => acc + cur.operation.amount, 0);

  if (weeklyTransactionAmount <= 1000) {
    console.log(0);
  } else if (amount > 1000) {
    console.log(roundAmount((amount - 1000) * CommissionTypeEnum.CASH_OUT));
  } else {
    console.log(roundAmount(amount * CommissionTypeEnum.CASH_OUT));
  }
};

export { calculateCashIn, calculateJuridicalCashOut, calculateNaturalCashOut };
