import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedViewComponent } from './animated-view.component';

describe('AnimatedViewComponent', () => {
  let component: AnimatedViewComponent;
  let fixture: ComponentFixture<AnimatedViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimatedViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
