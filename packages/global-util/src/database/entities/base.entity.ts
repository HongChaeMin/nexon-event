import {
  Column,
  ObjectIdColumn,
} from 'typeorm';
import { ObjectId } from 'mongodb';

export class BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ type: 'timestamp' })
  createdAt: Date = new Date();

  @Column({ type: 'timestamp' })
  updatedAt: Date = new Date();

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date;
}
