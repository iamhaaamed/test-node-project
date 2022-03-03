import assert from 'assert/strict';
import { calculateCashIn, calculateJuridicalCashOut, calculateNaturalCashOut } from './utils/cash';
import transactions from './data/input.json';
import { Input } from './types';

describe('cash in test', () => {
  it('should return 0.3% of amount when commission is less than 5', () => {
    assert.strictEqual(calculateCashIn(200.0), 0.06);
  });

  it('should return 5 when commission is higher than 5 ', () => {
    assert.strictEqual(calculateCashIn(100000.0), 5);
  });
});

describe('cash out test', () => {
  describe('juridical', () => {
    it('should return 0 when commission is less than 0.5', () => {
      assert.strictEqual(calculateJuridicalCashOut(0.4), 0);
    });

    it('should return 0.3% of amount when commission is higher than 0.5', () => {
      assert.strictEqual(calculateJuridicalCashOut(200), 0.6);
    });
  });

  describe('natural', () => {
    it('should return 0 when weekly transaction is less than 1000', () => {
      assert.strictEqual(
        calculateNaturalCashOut(transactions as Input[], 1, '2016-01-07', 1000),
        3,
      );
    });

    it('should return amount-1000*0.003 when amount is higher than 1000', () => {
      assert.strictEqual(
        calculateNaturalCashOut(transactions as Input[], 1, '2016-01-06', 30_000),
        87,
      );
    });

    it('should return 0.3% of amount by default ', () => {
      assert.strictEqual(
        calculateNaturalCashOut(transactions as Input[], 1, '2016-01-06', 30_000),
        87,
      );
    });
  });
});
