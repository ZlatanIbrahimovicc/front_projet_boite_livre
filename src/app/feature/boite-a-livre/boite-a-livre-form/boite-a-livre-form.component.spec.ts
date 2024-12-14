import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoiteALivreFormComponent } from './boite-a-livre-form.component';

describe('FormulaireComponent', () => {
  let component: BoiteALivreFormComponent;
  let fixture: ComponentFixture<BoiteALivreFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoiteALivreFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoiteALivreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
