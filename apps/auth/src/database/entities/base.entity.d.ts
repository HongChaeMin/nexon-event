import { ObjectId } from 'typeorm';
export declare class BaseEntity {
    id: ObjectId;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
