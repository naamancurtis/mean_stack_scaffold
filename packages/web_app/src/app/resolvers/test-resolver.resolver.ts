import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TestHttpService } from '../services/http-services/http-service.service';
import { IWelcomeMessage } from '@meanstackproject/common/src/interfaces/http_interfaces/root.interface';

@Injectable()
export class TestResolve implements Resolve<Observable<IWelcomeMessage>> {
  constructor(private service: TestHttpService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IWelcomeMessage> {
    return this.service.testRequest();
  }
}
