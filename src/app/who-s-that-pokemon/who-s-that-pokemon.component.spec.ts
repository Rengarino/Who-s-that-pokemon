import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoSThatPokemonComponent } from './who-s-that-pokemon.component';

describe('WhoSThatPokemonComponent', () => {
  let component: WhoSThatPokemonComponent;
  let fixture: ComponentFixture<WhoSThatPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhoSThatPokemonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhoSThatPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
