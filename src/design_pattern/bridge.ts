/**
 * 橋接模式 (Bridge)，將抽象部分與它的實現部分分離，使它們都可以獨立地變化。
 *
 * 橋接模式 Bridge Pattern 及其欲解決的 Problem：
 * 「你的類別中浮現出了兩種不同抽象層次，『高階』和『低階』兩個部分嗎！？而你想要解耦它們以致於彼此能獨立改變並且允許各種組合嗎！？
 *
 * 用 composition 關係代替繼承關係，解藕抽象和實作
 *
 * 例子 (in Java)
 * [秒懂设计模式之桥接模式（Bridge Pattern） - 知乎](https://zhuanlan.zhihu.com/p/58903776)
 * [[Java][Design Pattern] 設計模式 - 橋接模式 / Structural Patterns — Bridge Pattern (橋接模式) | Bucketing](https://medium.com/bucketing/structural-patterns-bridge-pattern-e06e4de5045c)
 * [橋接模式 | Bridge Pattern | Ian Blog](https://ianjustin39.github.io/ianlife/design-pattern/bridge-pattern/)
 * [[ Day 21 ] 你的東西就是我的東西！ - 橋接模式 ( Bridge Pattern ) - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天](https://ithelp.ithome.com.tw/articles/10207956)
 * [這份套用了 GoF 軟體設計模式的早餐店菜單 - 水球潘 - Medium](https://medium.com/@waterball.tw/%E9%80%99%E4%BB%BD%E5%A5%97%E7%94%A8%E4%BA%86-gof-%E8%BB%9F%E9%AB%94%E8%A8%AD%E8%A8%88%E6%A8%A1%E5%BC%8F%E7%9A%84%E6%97%A9%E9%A4%90%E5%BA%97%E8%8F%9C%E5%96%AE-40910416f954)
 *
 *
 * 優點：
 * 不要用 inheritance, 用組合 -> 耦合低
 * 兩個維度的任一維度的變化，都符合 開閉原則
 *
 * 缺點：
 * 一開始就需要識別會變化的兩個維度
 * 相對複雜, 因為在抽象層進行關連的建立
 */



abstract class Bag {
  protected color: Color;

  constructor(color: Color) {
    this.color = color;
  }

  public operation(): string {
    const result = this.color.print();
    return `Base operation with:\n${result}`;
  }
}


class Backpack extends Bag {
  public operation(): string {
    const result = this.color.print();
    return `Extended operation with:\n${result}`;
  }
}

class Wallet extends Bag {
  public operation(): string {
    const result = this.color.print();
    return `Extended operation with:\n${result}`;
  }
}

interface Color {
  print(): string;
}

class White implements Color {
  public print(): string {
    return 'print White Color';
  }
}

class Black implements Color {
  public print(): string {
    return `print Black Color`;
  }
}



// client 依賴的是穩定的組件，也就是 Bag
function clientCode(bag: Bag) {
  console.log(bag.operation());
}

/**
 * The client code should be able to work with any pre-configured abstraction-
 * implementation combination.
 */
let whiteBag = new Backpack(new White());
clientCode(whiteBag);

console.log('');

let blackWallet = new Wallet(new Black());
clientCode(blackWallet);
