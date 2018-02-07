import { Injectable, Input } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Hero } from './hero.model';
import { environment } from '../../environments/environment';

@Injectable()
export class HeroService {

  private publicKey: string = '230b9f792677a1553fe3dc4b30f77ceb';
  private hash: string = 'bd66083a58d486cf26264e8fcdbc3f4c';

  constructor(private http: Http) { }
  
  getHeroes(searchedQuery: string) {
    let url = `${environment.heroesUrl}limit=12&nameStartsWith=${searchedQuery}&ts=1&apikey=${this.publicKey}&hash=${this.hash}`;
    return this.http.get(url);
  }

}
