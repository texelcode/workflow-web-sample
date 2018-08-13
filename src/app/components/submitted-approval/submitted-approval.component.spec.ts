import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedApprovalComponent } from './submitted-approval.component';

describe('SubmittedApprovalComponent', () => {
  let component: SubmittedApprovalComponent;
  let fixture: ComponentFixture<SubmittedApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmittedApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmittedApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
