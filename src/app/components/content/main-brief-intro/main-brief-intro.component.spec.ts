import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBriefIntroComponent } from './main-brief-intro.component';

describe('MainBriefIntroComponent', () => {
  let component: MainBriefIntroComponent;
  let fixture: ComponentFixture<MainBriefIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainBriefIntroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainBriefIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
