import { Component, OnDestroy } from '@angular/core';
import { HeroService } from '../shared/hero.service';
import { Hero } from 'app/shared/hero.model';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {
  heroes: Array<Hero>;
  savedHero: Hero;
  searchQuery: string;
  subscription: Subscription;
  bookmarkedHero: boolean = false;

  constructor(private heroService: HeroService) {
    this.heroes = new Array<Hero>();
  }

  /**
   * Search for heroes
   */
  search() {
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

  /**
   * @param hero 
   * Saving the booked hero in the local storage
   */
  saveBooking(hero: Hero) {
    this.bookmarkedHero = true;
    this.savedHero = hero;
    localStorage.setItem('myHero', JSON.stringify(hero));
  }  

  /**
   * Retrieving the hero from local storage
   */
  getBookedHero(hero) {
    this.savedHero = JSON.parse(localStorage.getItem(hero));
  }

  /**
   * Unsubsribe from subscription when
   * this component is destroyed.
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

} 
