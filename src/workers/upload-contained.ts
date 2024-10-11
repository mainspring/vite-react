let runInterval: NodeJS.Timeout;

export const workerFunction = function () {
  let manuallyTrigger: boolean = false;
  let processing: boolean = false;

  // because of how this is exported, we can import outside code
  const wait = (ms: number) =>
    new Promise<void>(resolve => {
      setTimeout(resolve, ms);
    });

  const upload = async () => {
    let c = 0;
    try {
      processing = true;
      do {
        console.log('upload running', c);
        manuallyTrigger = false;
        await wait(7 * 1000);
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
    }, 15 * 1000);
  };

  //we perform every operation we want in this function right here
  self.onmessage = (_event: MessageEvent) => {
    // console.log('Worker received message', event.data);

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
};

//This stringifies the whole function
const codeToString = workerFunction.toString();
//This brings out the code in the bracket in string
const mainCode = codeToString.substring(codeToString.indexOf('{') + 1, codeToString.lastIndexOf('}'));
//convert the code into a raw data
const blob = new Blob([mainCode], { type: 'application/javascript' });
//A url is made out of the blob object and we're good to go
const worker_script = URL.createObjectURL(blob);

export default worker_script;
