import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoConfigComponent } from './auto-config.component';

describe('AutoConfigComponent', () => {
  let component: AutoConfigComponent;
  let fixture: ComponentFixture<AutoConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
