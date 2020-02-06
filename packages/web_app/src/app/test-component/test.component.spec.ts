import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestComponent } from './test.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { TestHttpService } from '../services/http-services/http-service.service';

describe('TestComponentComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                test: of({
                  message: 'Test String',
                  imageUrl: 'test.url'
                })
              }
            }
          },
        }, 
        {
          provide: TestHttpService,
          useValue: {}
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
