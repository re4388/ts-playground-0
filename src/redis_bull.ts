import { Queue, Worker } from "bullmq";

const waitInSec = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms * 1000));

export async function bullJob() {
  const myQueue = new Queue("q1", {
    connection: {
      port: 6380,
    },
  });
  async function addJobs() {
    await myQueue.add("myJobName", { foo: "bar" });
    await myQueue.add("myJobName", { qux: "baz" });
  }

  await addJobs();
}

export async function bullWorker() {
  const myWorker = new Worker(
    "myJobName",
    async (job) => {
      console.log(job.data);
      await job.updateProgress(0);
      await waitInSec(10);
      await job.updateProgress(50);
      await waitInSec(10);
      await job.updateProgress(100);
    },
    {
      concurrency: 1,
      connection: {
        port: 6380,
      },
    }
  );
}
