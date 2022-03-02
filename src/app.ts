import * as fs from 'fs';
import moment from 'moment';
import { Input } from './types';
import { calculateCashIn, calculateJuridicalCashOut, calculateNaturalCashOut } from './utils/cash';

moment.updateLocale('en', {
  week: {
    dow: 1, // Monday is the first day of the week.
  },
});

const calculateCommission = async () => {
  const [filePath] = process.argv.splice(2);

  try {
    const data = await fs.promises.readFile(filePath, 'utf8');
    const transactions = JSON.parse(data) as Array<Input>;
    transactions.forEach(({ operation: { amount }, type, user_type, user_id, date }: Input) => {
      if (type === 'cash_in') {
        calculateCashIn(amount);
      } else if (type === 'cash_out') {
        if (user_type === 'juridical') {
          calculateJuridicalCashOut(amount);
        } else if (user_type === 'natural') {
          calculateNaturalCashOut(transactions, user_id, date, amount);
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

calculateCommission();
