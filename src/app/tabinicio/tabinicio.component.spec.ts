import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabinicioComponent } from './tabinicio.component';

describe('TabinicioComponent', () => {
  let component: TabinicioComponent;
  let fixture: ComponentFixture<TabinicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabinicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabinicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
