module.exports = function Nginxr(){
  const { ServiceBroker } = require("moleculer");
  const broker = new ServiceBroker({
      nodeID: "nginx",
      //transporter: "nats://nats.ugenu.io:4222",
      logger: console,
      logLevel: "debug",
      requestTimeout: 0,
      requestRetry: 3
  });
  let ApiService = require("moleculer-web");

  broker.createService(ApiService);
  broker.loadServices("./src/services", "*.service.js");
  broker.start();
};