import { useCallback } from 'react';

import styled from '@emotion/styled';
import { useLiveQuery } from 'dexie-react-hooks';

import { useBackgroundProcesses } from './contexts/backround-process-provider';
import { db } from './local-db';

const API_HOST = import.meta.env.VITE_API_HOST;
const MODE = import.meta.env.MODE;

export const Example = () => {
  const { uploads } = useBackgroundProcesses();
  const uploadIds = useLiveQuery(() => db.uploads.toArray());

  const addFakeUploadRequest = useCallback(async () => {
    await uploads.queue('https://api.github.com/users/1');
  }, [uploads]);

  return (
    <div>
      <div>Show cool stuff here!</div>

      <div>MODE: {MODE}</div>
      <div>API HOST: {API_HOST}</div>

      <WorkContainer>
        {uploadIds?.map(upr => (
          <Upload key={upr.id} className={upr.status ?? 'pending'}>
            {upr.id} {upr.uri}
          </Upload>
        ))}
        <button className="font-bold" onClick={addFakeUploadRequest}>
          Add Fake Upload Request
        </button>
      </WorkContainer>
    </div>
  );
};

const WorkContainer = styled.div`
  padding-top: 20px;
`;

const Upload = styled.div`
  &.pending {
    color: blue;
  }
  &.uploading {
    color: green;
  }
  &.processed {
    color: lightgray;
  }
`;
