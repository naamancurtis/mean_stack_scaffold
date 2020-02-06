import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { ICount } from '@meanstackproject/common/src/interfaces/http_interfaces/count.interface';

export interface ICountInterface extends Document, ICount {}

const TestCountSchema = new mongoose.Schema({
  count: { type: Number, default: 0 },
});

const TestCountModel = mongoose.model<ICountInterface>(
  'TestCount',
  TestCountSchema
);

export default TestCountModel;
