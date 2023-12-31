class Order {
  get finalPrice() {
    const basePrice = this.quantity * this.itemPrice

    let discountLevel
    if (this.quantity > 100) {
      discountLevel = 2
    } else {
      discountLevel = 1
    }

    return this.discountedPrice(basePrice, discountLevel)
  }

  discountedPrice(basePrice, discountLevel) {
    switch (discountLevel) {
      case 1:
        return basePrice * 0.95
      case 2:
        return basePrice * 0.9
    }
  }
}




/////////////////////////  my try,  先試試看..
// 邏輯上對，但是這樣也把整個 discountLevel 的概念拿掉了
// 這個概念可能需要存在(like it's a pm spec)


class Order {
  get finalPrice() {
    if (this.quantity > 100) {
      return this.quantity * this.itemPrice * 0.9
    }

    return this.quantity * this.itemPrice * 0.95
  }
}


