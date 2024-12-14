import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoiteALivreDetailComponent } from './boite-a-livre-detail.component';

describe('DetailComponent', () => {
  let component: BoiteALivreDetailComponent;
  let fixture: ComponentFixture<BoiteALivreDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoiteALivreDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoiteALivreDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
