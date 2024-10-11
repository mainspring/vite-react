import { useCallback, useEffect, useState } from 'react';

// import worker_script from '@core/workers/upload-contained';
import constate from 'constate';
import { db } from 'src/local-db';

type Props = {
  //
};

const useProvider = (_props: Props) => {
  const [uploadWorker, setUploadWorker] = useState<Worker | null>(null);

  const triggerUploadWorker = useCallback(() => {
    uploadWorker?.postMessage('upload');
  }, [uploadWorker]);

  const queueUpload = useCallback(
    async (uri: string) => {
      console.log(uri, 'uri');
      try {
        await db.uploads.add({
          uri: uri,
          status: 'pending',
        });
        triggerUploadWorker();
      } catch (e) {
        //
        console.log(e, 'e');
      }
    },
    [triggerUploadWorker],
  );

  useEffect(() => {
    if (!window.Worker) return;

    // const upload_worker = new Worker(worker_script);
    const upload_worker = new Worker(new URL('../workers/upload.ts', import.meta.url), { type: 'module' });

    upload_worker.onmessage = e => {
      console.log('Worker process acknowledge message:', e.data);
    };

    setUploadWorker(upload_worker);

    return () => {
      upload_worker?.terminate();
    };
  }, []);

  return {
    /**
     * Allows us to interact with the upload worker
     */
    uploads: {
      worker: uploadWorker,
      queue: queueUpload,
      trigger: triggerUploadWorker,
    },
  };
};

export const [BackgroundProcessProvider, useBackgroundProcesses] = constate(useProvider, data => data);
