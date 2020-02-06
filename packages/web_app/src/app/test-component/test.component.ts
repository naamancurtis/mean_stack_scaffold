import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IWelcomeMessage } from '@meanstackproject/common/src/interfaces/http_interfaces/root.interface';
import { TestHttpService } from '../services/http-services/http-service.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-test-component',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  public dataRequest: IWelcomeMessage;
  public count: number;

  constructor(private route: ActivatedRoute, private service: TestHttpService) {}

  ngOnInit(): void {
    this.dataRequest = this.route.snapshot.data.test;
  }

  getCount(): void {
    this.service
      .getCount()
      .pipe(take(1))
      .subscribe(count => (this.count = count.count));
  }

  incrementCount(): void {
    this.service.postCount();
  }
}
