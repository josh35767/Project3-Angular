import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultItemsComponent } from './result-items.component';

describe('ResultItemsComponent', () => {
  let component: ResultItemsComponent;
  let fixture: ComponentFixture<ResultItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
