import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigortaComponent } from './sigorta.component';

describe('SigortaComponent', () => {
  let component: SigortaComponent;
  let fixture: ComponentFixture<SigortaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SigortaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SigortaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
