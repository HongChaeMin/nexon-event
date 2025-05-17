import {
  Column,
  ObjectId,
  ObjectIdColumn,
} from 'typeorm';

export class BaseEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column({ type: 'timestamp' })
  createdAt: Date = new Date();

  @Column({ type: 'timestamp' })
  updatedAt: Date = new Date();

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date;
}
