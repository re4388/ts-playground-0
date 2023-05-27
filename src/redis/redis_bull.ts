import { Queue, Worker } from "bullmq";

const waitInSec = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms * 1000));

const QUEUE_NAME_0 = "q1";
const JOB_NAME_0 = "q1";

export async function bullJob() {
  const myQueue = new Queue(QUEUE_NAME_0, {
    connection: {
      port: 6380,
    },
  });
  async function addJobs() {
    await myQueue.add(JOB_NAME_0, { foo: "bar" });
    await myQueue.add(JOB_NAME_0, { qux: "baz" });
  }

  await addJobs();
}

export async function bullWorker() {
  const myWorker = new Worker(
    QUEUE_NAME_0,
    async (job) => {
      console.log(job.data);
    },
    {
      concurrency: 1,
      connection: {
        port: 6380,
      },
    }
  );
}
