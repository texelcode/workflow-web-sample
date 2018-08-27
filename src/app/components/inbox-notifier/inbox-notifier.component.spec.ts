import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxNotifierComponent } from './inbox-notifier.component';

describe('InboxNotifierComponent', () => {
  let component: InboxNotifierComponent;
  let fixture: ComponentFixture<InboxNotifierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InboxNotifierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxNotifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
