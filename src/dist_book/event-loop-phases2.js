

const sleep_st = (t) => new Promise((r) => setTimeout(r, t));
const sleep_im = () => new Promise((r) => setImmediate(r));

// my ans: 2, 1,   4, 3,    6, 5,  8, 7
// => just think await 1 is sync code and no log here, so no effect for the order, just a distraction XDD
// ans: 2, 1,   4, 3,    6, 8, 5, 7.

(async () => {
  setImmediate(() => console.log(1));
  console.log(2);
  await sleep_st(0);
  setImmediate(() => console.log(3));
  console.log(4);
  await sleep_im();
  setImmediate(() => console.log(5));
  console.log(6);
  await 1;
  setImmediate(() => console.log(7));
  console.log(8);
})();

// order
// eventLoop phrase: poll ->    check     -> close ->           timer          -> pending
//                    IO    setImmediate                 timeout and interval
// each phrase check the micro-task first
// micro-task priority nextTick > promise

// order, my ans
// 8 -> 3 -> 2 -> 1 -> 4 -> 7 -> 6 -> 5
