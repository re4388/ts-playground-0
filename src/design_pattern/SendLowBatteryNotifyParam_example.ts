

// 本來的 code 可能就只是一個函數去使用下面這個 param interface, like
// export async function sendLowBatteryNotify(param: SendLowBatteryNotifyParam): Promise<void> {...}

interface SendLowBatteryNotifyParam {
  scooterId: string;
  vehicleModelId: string | null;
  batteryPercent: number;
  batIds: string;
}


// 如果你覺得你這個函數會因為情境的不同，而需要一直擴充，然後都可以使用相同的介面
// 就繼續往下看...


// 拉出來變成一個抽象介面
// Define an interface for the notifier
interface INotifier {
  sendLowBatteryNotify(params: SendLowBatteryNotifyParam): void;
}


// 建立一個 class 實作這個介面
class LowBatteryNotifier implements INotifier {
  sendLowBatteryNotify(params: SendLowBatteryNotifyParam): void {
    // Implement your notification logic here
    console.log("Sending low battery notification:", params);
    // Example: Send notification using a notification service or API
    // Replace the following line with your actual implementation
    // sendNotification(params.scooterId, params.vehicleModelId, params.batteryPercent, params.batIds);
  }
}

// 這邊是使用這個 concrete class 的地方
// 用 DI 的方式去使用
class BatteryMonitor {
  private notifier: INotifier;

  constructor(notifier: INotifier) {
    this.notifier = notifier; // <-- 注入點
  }

  monitorBattery(params: SendLowBatteryNotifyParam): void {
    // Your high-level logic here
    console.log("Monitoring battery...");
    // Notify if battery is low
    if (params.batteryPercent < 20) {
      this.notifier.sendLowBatteryNotify(params);
    }
  }
}

// Instantiate the concrete class
const concreteNotifier = new LowBatteryNotifier();

// Instantiate the high-level module with dependency injection
const batteryMonitor = new BatteryMonitor(concreteNotifier);

// Example usage
const notificationParams: SendLowBatteryNotifyParam = {
  scooterId: "S123",
  vehicleModelId: "VM1",
  batteryPercent: 10,
  batIds: "B1",
};

batteryMonitor.monitorBattery(notificationParams);
