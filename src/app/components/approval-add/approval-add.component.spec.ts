import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalAddComponent } from './approval-add.component';

describe('ApprovalAddComponent', () => {
  let component: ApprovalAddComponent;
  let fixture: ComponentFixture<ApprovalAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
