import Dexie, { Table } from 'dexie';

export interface OfflineAction {
  id?: number;
  timestamp: number;
  action: 'add' | 'update' | 'delete';
  collection: string;
  data: any;
  docId?: string;
}

export class LocalDb extends Dexie {
  offlineActions!: Table<OfflineAction>;
  
  constructor() {
    super('BoiserAppDb');
    this.version(1).stores({
      offlineActions: '++id, timestamp, collection, docId'
    });
  }
}

export const localDb = new LocalDb();
