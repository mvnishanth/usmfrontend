import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommoAlertComponent } from './commo-alert.component';

describe('CommoAlertComponent', () => {
  let component: CommoAlertComponent;
  let fixture: ComponentFixture<CommoAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommoAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommoAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
