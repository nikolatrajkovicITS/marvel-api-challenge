import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeroService } from '../shared/hero.service';
import { Hero } from 'app/shared/hero.model';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  heroes: Array<Hero>;
  savedHero: Array<Hero>;
  getHeroes: Array<Hero>;
  searchQuery: string;
  subscription: Subscription;

  constructor(private heroService: HeroService) {
    this.heroes = new Array<Hero>();
    this.savedHero = new Array<Hero>();
    this.getHeroes = new Array<Hero>();
  }

  ngOnInit() {
  }

  /**
   * Search for heroes
   */
  search() {
    if(this.searchQuery) {
      this.subscription = this.heroService.getHeroes(this.searchQuery)
      .subscribe(response => {
        let res = response.json();
        this.heroes = res.data.results;
    },
    error => {
      console.log(error);
    }
  );
    }
    else {
      this.heroes = new Array<Hero>();
    }
    
  }

  /**
   * @param hero 
   * Saving the booked hero in the local storage
   */
  saveBooking(hero: Hero) {
    hero.isBookmarked = true;
    this.savedHero.push(hero);
    localStorage.setItem('myHeroes', JSON.stringify(this.savedHero));
  }  

  /**
   * Retrieving the hero from local storage
   */
  getBookedHeroes() {
    if(!this.searchQuery) {
      this.getHeroes = JSON.parse(localStorage.getItem('myHeroes'));
      console.log('getBookedHeearoes method is executed ' + this.getHeroes);
      return true;
    } 
    else 
      console.log('Search input is not empty');
  }

  /**
   * Unsubsribe from subscription when
   * this component is destroyed.
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

} 
