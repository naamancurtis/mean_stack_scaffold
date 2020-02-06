import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IWelcomeMessage } from '@meanstackproject/common/src/interfaces/http_interfaces/root.interface';
import { ICount } from '@meanstackproject/common/src/interfaces/http_interfaces/count.interface';
import { map, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TestHttpService {
  constructor(private http: HttpClient) {}

  testRequest(): Observable<IWelcomeMessage> {
    return this.http.get<IWelcomeMessage>('api/test');
  }

  getCount(): Observable<ICount> {
    return this.http.get<ICount>('api/test/count');
  }

  postCount(): void {
    this.http
      .post<void>('api/test/count', {})
      .pipe(
        take(1),
        map(_ => undefined)
      )
      .subscribe();
  }
}
