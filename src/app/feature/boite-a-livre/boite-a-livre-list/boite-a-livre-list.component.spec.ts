import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoiteALivreListComponent } from './boite-a-livre-list.component';

describe('TableauComponent', () => {
  let component: BoiteALivreListComponent;
  let fixture: ComponentFixture<BoiteALivreListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoiteALivreListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoiteALivreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
