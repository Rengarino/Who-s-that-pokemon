import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from './pokemon';

@Component({
  selector: 'app-who-s-that-pokemon',
  templateUrl: './who-s-that-pokemon.component.html',
  styleUrls: ['./who-s-that-pokemon.component.less']
})
export class WhoSThatPokemonComponent implements OnInit {

  isShown: boolean = false;
  @Input() maskedPokemon: string;
  pokemonNumber: any;
  @Input() firstPokemonImage: string;
  @Input() secondPokemonImage: string;
  @Input() thirdPokemonImage: string;
  @Input() firstPokemon: Pokemon;
  @Input() secondPokemon: Pokemon;
  @Input() thirdPokemon: Pokemon;

  constructor(private _http: HttpClient) { 
  }

  ngOnInit(): void {
    this.getRandomPokemon();
  }

  getRandomPokemon(): void {
    this._http.get('http://127.0.0.1:5000/random')
      .subscribe(
        data => {
          this.pokemonNumber = data;
          this.maskedPokemon = '../../assets/masked_pokemon_without_bg/'+this.pokemonNumber;
        }
      );
    this.isShown = false;
  }

  guessMaskedPokemon(): void {
    this._http.get<any>('http://127.0.0.1:5000/search/'+this.pokemonNumber)
      .subscribe(
        data => {
          this.firstPokemonImage = '../../assets/pokemon/'+data.path;
          this.showPokemon();
        }
      );
  }

  getTop3Pokemon(): void {
    this._http.get<any>('http://127.0.0.1:5000/topsearch/'+this.pokemonNumber)
      .subscribe(
        data => {
          this.firstPokemon = new Pokemon(data[1][0].path, data[1][0].distance);
          this.secondPokemon = new Pokemon(data[2][0].path, data[2][0].distance);
          this.thirdPokemon = new Pokemon(data[3][0].path, data[3][0].distance);   
          this.firstPokemonImage = '../../assets/pokemon/'+this.firstPokemon.path;
          this.secondPokemonImage = '../../assets/pokemon/'+this.secondPokemon.path;
          this.thirdPokemonImage = '../../assets/pokemon/'+this.thirdPokemon.path;
          this.showPokemon();
        }
      );
  }

  showPokemon() { // Pour pouvoir attendre que le pokemon apparaisse seulement quand on a finit d'obtenir le lien.
    this.isShown = true;
  }
}
