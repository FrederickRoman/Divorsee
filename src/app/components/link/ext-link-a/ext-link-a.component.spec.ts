import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtLinkAComponent } from './ext-link-a.component';

describe('ExtLinkAComponent', () => {
  let component: ExtLinkAComponent;
  let fixture: ComponentFixture<ExtLinkAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtLinkAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtLinkAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
