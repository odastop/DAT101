"use strict";
import { initPrintOut, printOut, newLine } from "../../common/script/utils.mjs";
initPrintOut(document.getElementById("txtOut"));

printOut("--- Part 1 ----------------------------------------------------------------------------------------------");
const AccountType = {
  Normal: "Brukskonto",
  Saving: "Sparekonto",
  Credit: "Kredittkonto",
  Pension: "Pensjonskonto"
};

printOut(`${AccountType.Normal}, ${AccountType.Saving}, ${AccountType.Credit}, ${AccountType.Pension}`);
printOut(newLine);


printOut("--- Part 2 ----------------------------------------------------------------------------------------------");
class TAccount {
  #type;
  #balance;
  #withdrawCount;
  #currencyType;

  constructor(aType) {
    this.#type = aType;
    this.#balance = 0;
    this.#withdrawCount = 0;
    this.#currencyType = "NOK"; 
  }

  toString() {
    return this.#type;
  }

  setType(aType) {
    const oldType = this.#type;
    this.#type = aType;
    this.#withdrawCount = 0;
    printOut(`Account is changed from ${oldType} to ${this.#type}.`);
  }

  getBalance() {
    return this.#balance.toFixed(2); 
  }

  deposit(aAmount, aCurrency = "NOK") {
    if (aCurrency !== this.#currencyType) {
      aAmount = this.#convertCurrency(aAmount, aCurrency, this.#currencyType);
    }
    this.#balance += aAmount;
    this.#withdrawCount = 0; 
    printOut(`Deposit of ${aAmount.toFixed(2)}${CurrencyTypes[this.#currencyType].denomination}, new balance is ${this.getBalance()}${CurrencyTypes[this.#currencyType].denomination}.`);
  }

  withdraw(aAmount, aCurrency = "NOK") {
    if (aCurrency !== this.#currencyType) {
      aAmount = this.#convertCurrency(aAmount, aCurrency, this.#currencyType);
    }

    switch (this.#type) {
      case AccountType.Pension:
        printOut("You can't withdraw from a Pensjonskonto!");
        return;
      case AccountType.Saving:
        if (this.#withdrawCount >= 3) {
          printOut("You can't withdraw from a Sparekonto more than three times!");
          return;
        }
        this.#withdrawCount++;
        break;
      default:
        break;
    }

    if (aAmount <= this.#balance) {
      this.#balance -= aAmount;
      printOut(`Withdrawal of ${aAmount.toFixed(2)}${CurrencyTypes[this.#currencyType].denomination}, new balance is ${this.getBalance()}${CurrencyTypes[this.#currencyType].denomination}.`);
    } else {
      printOut(`Withdrawal of ${aAmount.toFixed(2)} failed. Insufficient balance.`);
    }
  }

  setCurrencyType(aType) {
    if (this.#currencyType === aType) return; 

    const oldCurrency = CurrencyTypes[this.#currencyType].name;
    this.#balance = this.#convertCurrency(this.#balance, this.#currencyType, aType);
    this.#currencyType = aType;
    printOut(`The account currency has changed from ${oldCurrency} to ${CurrencyTypes[this.#currencyType].name}.`);
    printOut(`New Balance is ${this.getBalance()}${CurrencyTypes[this.#currencyType].denomination}.`);
  }

  #convertCurrency(amount, fromCurrency, toCurrency) {
    const fromValue = CurrencyTypes[fromCurrency].value;
    const toValue = CurrencyTypes[toCurrency].value;
    return (amount * toValue) / fromValue;
  }
}

const CurrencyTypes = {
  NOK: { value: 1.0, name: "Norske kroner", denomination: "kr" },
  EUR: { value: 0.0985, name: "Europeiske euro", denomination: "€" },
  USD: { value: 0.1091, name: "United States dollar", denomination: "$" },
  GBP: { value: 0.0847, name: "Pound sterling", denomination: "£" },
  INR: { value: 7.8309, name: "Indiske rupee", denomination: "₹" },
  AUD: { value: 0.1581, name: "Australske dollar", denomination: "A$" },
  PHP: { value: 6.5189, name: "Fillipinske peso", denomination: "₱" },
  SEK: { value: 1.0580, name: "Svenske kroner", denomination: "kr" },
  CAD: { value: 0.1435, name: "Canadiske dollar", denomination: "C$" },
  THB: { value: 3.3289, name: "Thai baht", denomination: "฿" }
};

const myAccount = new TAccount(AccountType.Normal);
printOut(`myAccount = ${myAccount.toString()}`);
myAccount.setType(AccountType.Saving);
printOut(`myAccount = ${myAccount.toString()}`);
printOut(newLine);

printOut("--- Part 3 ----------------------------------------------------------------------------------------------");
myAccount.deposit(100);
myAccount.withdraw(25);
printOut(`My account balance is ${myAccount.getBalance()}kr.`);
printOut(newLine);

printOut("--- Part 4 ----------------------------------------------------------------------------------------------");
myAccount.setType(AccountType.Saving);
myAccount.deposit(25);
myAccount.withdraw(30);
myAccount.withdraw(30);
myAccount.withdraw(30);
myAccount.withdraw(30);
myAccount.setType(AccountType.Pension);
myAccount.withdraw(10); 
myAccount.setType(AccountType.Saving);
myAccount.withdraw(10); 
printOut(newLine);

printOut("--- Part 5 ----------------------------------------------------------------------------------------------");
myAccount.setCurrencyType("NOK");
myAccount.deposit(150);
printOut(newLine);

printOut("--- Part 6 ----------------------------------------------------------------------------------------------");
myAccount.setCurrencyType("SEK"); 
myAccount.setCurrencyType("USD"); 
myAccount.setCurrencyType("NOK");
printOut(newLine);

printOut("--- Part 7 ----------------------------------------------------------------------------------------------");
myAccount.deposit(12, "USD");
myAccount.withdraw(10, "GBP");
myAccount.setCurrencyType("CAD");
myAccount.setCurrencyType("INR");
myAccount.withdraw(150, "SEK"); 
printOut(newLine);

/*
printOut("--- Part 8 ----------------------------------------------------------------------------------------------");
Virker som oppgave 8 har kommet med fra forrige oppgavetekst. Løste den i innlevering 3.3.*/
