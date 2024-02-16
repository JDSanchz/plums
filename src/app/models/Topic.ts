// types/Topic.ts
export interface Topic {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  lastAccessed: Date;
}

export interface Images {
  id: number;
  title: string;
  data: Uint8Array;
  createdAt: Date;
  updatedAt: Date;
  topicId: number;
}