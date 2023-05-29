import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPositionsComponent } from './work-positions.component';

describe('WorkPositionsComponent', () => {
  let component: WorkPositionsComponent;
  let fixture: ComponentFixture<WorkPositionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkPositionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkPositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
