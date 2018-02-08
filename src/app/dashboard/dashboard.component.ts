import { Component, OnDestroy } from '@angular/core';
import { HeroService } from '../shared/hero.service';
import { Hero } from 'app/shared/hero.model';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import {AccordionModule} from 'primeng/accordion';      
import {MenuItem} from 'primeng/api'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {
  heroes: Array<Hero>;
  searchQuery: string;
  subscription: Subscription;
  bookedHero: boolean = false;

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
  saveBooking(hero) {
    this.bookedHero = true;
    localStorage.setItem('myHero', hero);
  }  

  /**
   * Retrieving the hero from local storage
   */
  getBookedHero() {
    localStorage.get('myHero');
  }

  /**
   * Unsubsribe from subscription when
   * this component is destroyed.
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

} 
