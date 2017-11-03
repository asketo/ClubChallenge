import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpponentDetailComponent } from './opponent-detail.component';

describe('OpponentDetailComponent', () => {
  let component: OpponentDetailComponent;
  let fixture: ComponentFixture<OpponentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpponentDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpponentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
