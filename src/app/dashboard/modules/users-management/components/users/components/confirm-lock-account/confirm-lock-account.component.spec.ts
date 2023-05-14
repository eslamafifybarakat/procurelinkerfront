import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmLockAccountComponent } from './confirm-lock-account.component';

describe('ConfirmLockAccountComponent', () => {
  let component: ConfirmLockAccountComponent;
  let fixture: ComponentFixture<ConfirmLockAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmLockAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmLockAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
