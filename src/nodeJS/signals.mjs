#!/usr/bin/env node
console.log(`Process ID: ${process.pid}`);
process.on('SIGHUP', () => console.log('Received: SIGHUP'));
process.on('SIGINT', () => console.log('Received: SIGINT'));
setTimeout(() => {}, 5 * 60 * 1000); // keep process alive for 5 min


/**
 * kill is a just a old name we stuck to, but is it actually called signal
 *
 * signal is a mechanism that OS can send to process, mostly we use it to kill process
 *
 * process.kill is the node.js API to do the same thing
 *
 * there are some signal process cannot handle, sigkill and sigstop
 *
 * process can handle means, we can use process.on('signalName', cb), to react to it
 *
 * when k8s is shutdown, it send sigterm and start a 30 sec timer and then send a sigkill
 *
 *when nodejs process receive sigusr1, it start the debugger
 */