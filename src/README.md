# What is it

This is a test project with Node and TypeScript that users can go to a branch to cash in and/or cash out from their account. There are commission fees for both cash in and cash out. Only supported currency is EUR.

## Commission Fees

### For Cash In

Commission fee - 0.03% from total amount, but no more than 5.00 EUR.

### For Cash Out

There are different commission fees for cash out for natural and legal persons.

#### Natural Persons

Default commission fee - 0.3% from cash out amount.
1000.00 EUR per week (from monday to sunday) is free of charge.
If total cash out amount is exceeded - commission is calculated only from exceeded amount (that is, for 1000.00 EUR there is still no commission fee).

#### Legal persons

Commission fee - 0.3% from amount, but not less than 0.50 EUR for operation.

## Usage

### How to run

If you want to run the application, use the following command:

```sh
$ npx ts-node src/app.ts [path to json file]
for example:
$ npx ts-node src/app.ts ./src/data/input.json
```

##### Input data

Input data should be a json file with the following format:

```js
[
   {
    "date": "2016-01-05", // operation date in format `Y-m-d`
    "user_id": 1, // user id, integer
    "user_type": "natural", // user type, one of “natural”(natural person) or “juridical”(legal person)
    "type": "cash_in", // operation type, one of “cash_in” or “cash_out”
    "operation": {
        "amount": 200, // operation amount(for example `2.12` or `3`)
        "currency": "EUR" // operation currency `EUR`
    }
,
...
]
```

### Tests

To run the tests use the following command:

```sh
$ npm test
```
