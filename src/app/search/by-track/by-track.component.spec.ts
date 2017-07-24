import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ByTrackComponent } from './by-track.component';

describe('ByTrackComponent', () => {
  let component: ByTrackComponent;
  let fixture: ComponentFixture<ByTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ByTrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ByTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
