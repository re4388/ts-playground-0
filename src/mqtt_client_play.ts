import mqtt from "mqtt";

export async function mqttPlay() {
  const clientId = `mqtt_node-ts_${Math.random().toString(16).slice(3)}`;
  const host = `x3c10030.ala.us-east-1.emqxsl.com`;
  const port = 8084;

  const options = {
    clean: true, // retain session
    connectTimeout: 4000, // Timeout period
    clientId,
    username: "test",
    password: "test",
    path: "/mqtt",
  };
  const connectUrl = `wss://${host}:${port}`;
  const client = mqtt.connect(connectUrl, options);

  //   client.on("reconnect", (error: any) => {
  //     console.log("reconnecting:", error);
  //   });

  client.on("error", (error) => {
    console.log("Connection failed:", error);
  });

  client.on("message", (topic, message) => {
    console.log("receive message：", topic, message.toString());
  });

  const topic = "testtopic/#";
  client.on("connect", () => {
    console.log("Connected");
    client.subscribe([topic], () => {
      console.log(`Subscribe to topic '${topic}'`);
    });

    // client.publish(
    //   topic,
    //   "nodejs mqtt test",
    //   { qos: 0, retain: false },
    //   (error) => {
    //     if (error) {
    //       console.error(error);
    //     }
    //   }
    // );
  });
}
