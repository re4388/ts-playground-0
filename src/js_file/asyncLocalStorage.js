const express = require("express");
const { AsyncLocalStorage } = require("async_hooks");
const asyncLocalStorage = new AsyncLocalStorage();

// https://medium.com/trabe/asynclocalstorage-for-easy-context-passing-in-node-js-e33c84679516
// https://nodejs.org/docs/latest-v12.x/api/async_hooks.html#async_hooks_class_asynclocalstorage

const requestIdMiddleware = (req, res, next) => {
  asyncLocalStorage.run(new Map(), () => {
    console.log("=====> req.headers: ", req.headers);
    const userAgent = req.headers['user-agent']
    asyncLocalStorage.getStore().set("userAgent", userAgent);
    next();
  });
};

const app = express();

app.use(requestIdMiddleware);

app.get("/", (req, res) => {
  const userAgent = asyncLocalStorage.getStore().get("userAgent");
  console.log(`[${userAgent}] request received`);
  res.send("It works!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Express server listening on port ${port}`));