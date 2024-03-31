/**
 * 它有一个 state 属性来保存当前状态。
 */
interface State {
  handle(context: VendingMachine): void
}

/**
 * 我们创建了一个 VendingMachine 对象，并调用 request 方法来触发请求处理。
 * 这个示例演示了如何使用 TypeScript 实现有限状态机模式来管理自动售货机系统的状态和行为。根据不同的状态，系统会执行相应的操作，并在必要时进行状态转换。
 *
 * 这样，我们可以模拟自动售货机在不同状态下的行为。
 * VendingMachine 类还有方法来设置状态和处理请求。
 */
class VendingMachine {
  private state: State

  constructor() {
    this.state = new StandbyState()
  }

  setState(state: State) {
    this.state = state
  }

  request() {
    this.state.handle(this)
  }
}

/**
 * 我们有四个具体状态类：StandbyState、IdleState、ProductSelectionState 和 PurchaseConfirmationState。
 * 根据当前状态的不同，会执行相应的操作并进行状态转换。
 */

class StandbyState implements State {
  handle(context: VendingMachine) {
    console.log('自动售货机处于待机状态')
    context.setState(new IdleState())
  }
}

class IdleState implements State {
  handle(context: VendingMachine) {
    console.log('自动售货机处于空闲状态')
    context.setState(new ProductSelectionState())
  }
}

class ProductSelectionState implements State {
  handle(context: VendingMachine) {
    console.log('自动售货机处于商品选择状态')
    context.setState(new PurchaseConfirmationState())
  }
}

class PurchaseConfirmationState implements State {
  handle(context: VendingMachine) {
    console.log('自动售货机处于确认购买状态')
    context.setState(new IdleState())
  }
}

// 使用示例
const vendingMachine = new VendingMachine()

vendingMachine.request() // 输出：自动售货机处于待机状态
vendingMachine.request() // 输出：自动售货机处于空闲状态
vendingMachine.request() // 输出：自动售货机处于商品选择状态
vendingMachine.request() // 输出：自动售货机处于确认购买状态
vendingMachine.request() // 输出：自动售货机处于空闲状态
