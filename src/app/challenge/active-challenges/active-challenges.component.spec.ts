import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveChallengesComponent } from './active-challenges.component';

describe('ActiveChallengesComponent', () => {
  let component: ActiveChallengesComponent;
  let fixture: ComponentFixture<ActiveChallengesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveChallengesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveChallengesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
