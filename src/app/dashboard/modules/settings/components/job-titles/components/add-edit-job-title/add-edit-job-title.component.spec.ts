import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditJobTitleComponent } from './add-edit-job-title.component';

describe('AddEditJobTitleComponent', () => {
  let component: AddEditJobTitleComponent;
  let fixture: ComponentFixture<AddEditJobTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditJobTitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditJobTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
