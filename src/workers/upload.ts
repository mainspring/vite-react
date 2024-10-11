import { db } from '../local-db';

let runInterval: NodeJS.Timeout;

let manuallyTrigger: boolean = false;
let processing: boolean = false;

export const wait = (ms: number) =>
  new Promise<void>(resolve => {
    setTimeout(resolve, ms);
  });

// Because of how this is exported, we can import outside code; remember this is a worker so it operates in a different context
// Progress is show to the user in the UI by way of updating the database, and the frontend code reacts on the database changes
const upload = async () => {
  let c = 0;
  try {
    processing = true;
    do {
      // the waits below are simply for effect, to simulate a real upload process
      manuallyTrigger = false;
      const uploads = await db.uploads.toArray();
      uploads.forEach(async upload => {
        await wait(2 * 1000);
        await db.uploads.update(upload.id, { status: 'uploading' });
        await wait(4 * 1000);
        await db.uploads.update(upload.id, { status: 'processed' });
        await wait(1 * 1000);
        await db.uploads.delete(upload.id);
      });

      c++;
    } while (manuallyTrigger);
  } catch (error) {
    console.error('Error uploading file', error);
  } finally {
    processing = false;
    // console.log('upload done');
  }
};

const start = () => {
  runInterval = setInterval(() => {
    if (!processing) upload();
  }, 10 * 1000);
};

// Main worker process
self.onmessage = (event: MessageEvent) => {
  if (event.data !== 'upload') return;

  if (runInterval) {
    if (processing) {
      manuallyTrigger = true;
      return;
    }

    clearInterval(runInterval);
    upload().finally(() => start());
  }

  // postMessage('Message has been gotten!');
};

start();

export {};
