import Dexie, { type EntityTable } from 'dexie';

interface UploadRequest {
  id: string;
  uri: string;
  status?: string;
}

const db = new Dexie('client-side-db') as Dexie & {
  uploads: EntityTable<
    UploadRequest,
    'id' // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
  uploads: '++id, uri, status', // primary key "id" (for the runtime!)
});

export type {UploadRequest };
export { db };
