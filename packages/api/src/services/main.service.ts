import { injectable } from 'inversify';
import { ICount } from '@meanstackproject/common/src/interfaces/http_interfaces/count.interface';
import TestCountModel from '../models/count.model';

@injectable()
export default class MainService {
  private mockData = 'Welcome to the Page - From the Express API';

  public fetchData(): string {
    return this.mockData;
  }

  public async getCount(): Promise<ICount> {
    return TestCountModel.findOne()
      .then(data => {
        if (data) {
          return { count: data.count };
        }
        return { count: 0 };
      })
      .catch(error => error);
  }

  public async incrementCount(): Promise<ICount> {
    return TestCountModel.findOneAndUpdate(
      {},
      { $inc: { count: 1 } },
      { upsert: true }
    )
      .then(data => data)
      .catch(error => error);
  }
}
