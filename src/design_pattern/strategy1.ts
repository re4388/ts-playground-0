/**
 * 目的是 open-closed
 * 加上新的功能，且不會動的原本的code!
 * 下面的例子，你可以增加新的payment, 但是你不會動的原本的邏輯
 * 類似，你可以加上一個 MoMoPay試試看！
 */

/**
 * 關鍵概念
 *
 * 你想要可以保持彈性的那個維度，建立一個共有的 interface
 * 以下面的例子來說， that's Payment
 *
 * 然後你如果有新需求，建立新的 class 去 implement 這個 interface
 *
 * 你要用的使用，"注入" or "set" 這個 新的class 即可
 * 下面的 code 是說 set的方式
 *
 */

// 0. 定義 interface
interface Payment {
  pay(amount: number): void;
}

// 1. 根據 interface 去實作不同的策略
class CreditCard implements Payment {
  pay(amount: number): void {
    console.log(`Paid ${amount} using credit card.`);
  }
}

class PayPalPay implements Payment {
  pay(amount: number): void {
    console.log(`Paid ${amount} using PayPal.`);
  }
}

class Checkout {
  private payment: Payment;

  constructor(payment: Payment) {
    this.payment = payment;
  }

  setPayment(payment: Payment) {
    this.payment = payment;
  }

  public pay(amount: number): void {
    this.payment.pay(amount);
  }
}

// 3. 根據情況，想要用那種payment都可以用

const payPal = new PayPalPay();
const checkout = new Checkout(payPal);
checkout.pay(50);

const creditCard = new CreditCard();
const checkout1 = new Checkout(creditCard);
checkout1.pay(50);

export {};
