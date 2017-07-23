import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ByLyricComponent } from './by-lyric.component';

describe('ByLyricComponent', () => {
  let component: ByLyricComponent;
  let fixture: ComponentFixture<ByLyricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ByLyricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ByLyricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
