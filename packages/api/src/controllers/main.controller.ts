import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { IWelcomeMessage } from '@meanstackproject/common/src/interfaces/http_interfaces/root.interface';
import { ICount } from '@meanstackproject/common/src/interfaces/http_interfaces/count.interface';
import { Request, Response, NextFunction } from 'express';
import { JsonResult } from 'inversify-express-utils/dts/results';
import SERVICES from '../services/types.service';
import MainService from '../services/main.service';

@controller('/test')
export default class MainController extends BaseHttpController {
  constructor(@inject(SERVICES.MainService) private mainService: MainService) {
    super();
  }

  @httpGet('/')
  public index(): IWelcomeMessage {
    return {
      message: this.mainService.fetchData(),
      imageUrl:
        'https://www.memesmonkey.com/images/memesmonkey/9e/9e1db290d5e70fc4f83d1880036fcf27.jpeg',
    };
  }

  @httpGet('/count')
  public async getCount(
    _: Request,
    __: Response,
    ___: NextFunction
  ): Promise<JsonResult> {
    const count: ICount = await this.mainService.getCount();
    return this.json(count, 200);
  }

  @httpPost('/count')
  private async incrementCount(
    _: Request,
    __: Response,
    ___: NextFunction
  ): Promise<JsonResult> {
    return this.mainService
      .incrementCount()
      .then(_ => this.json({}, 200))
      .catch(_ => this.json({}, 500))
      .finally();
  }
}
