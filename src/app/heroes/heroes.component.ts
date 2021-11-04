// import { Component, OnInit } from '@angular/core';
// import { Hero } from '../hero';
// import { HEROES } from '../mock-heroes';
// import { HeroService } from '../hero.service';

// @Component({
//   selector: 'app-heroes',
//   templateUrl: './heroes.component.html',
//   styleUrls: ['./heroes.component.css']
// })
// export class HeroesComponent implements OnInit {

//   // la siguiente linea lo que copia es la dirección, no el contenido, ambos apuntan a lo mismo. Lo hacemos así porque necesita la clase para luego llamarla en el html.
//   // heroes = HEROES; /* OJO, HEROES es un array, no es un tipado. Por eso es un = y no un : */
//   /* Lo hemos comentado pq ahora se lo vamos a pedir al servidor. Ahora será: toh-pt4 */
//   heroes: Hero[] = [];

//   selectedHero?: Hero;

//   // hero: Hero = { // Esto es del primer ejercicio (toh-pt2)
//   //   id: 1,
//   //   name: 'Windstorm'
//   // };

//   // inyección del servicio HeroService
//   constructor(private heroService: HeroService) {
//     // console.log('Esto es el constructor del componente Heroes Component'); // si lo pones

//   }

//   getHeroes(): void {
//     this.heroService.getHeroes()
//         .subscribe(heroes => this.heroes = heroes);
//   }

//   ngOnInit() {
//     this.getHeroes();
//   }
//   onSelect(hero: Hero): void {
//     console.log(hero.name);

//     this.selectedHero = hero;
//   }

// }

import { Component, OnInit } from "@angular/core";

import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { MessageService } from "../message.service";

@Component({
  selector: "app-heroes",
  templateUrl: "./heroes.component.html",
  styleUrls: ["./heroes.component.css"],
})
/* export class HeroesComponent implements OnInit {
  selectedHero?: Hero;

  heroes: Hero[] = [];

  constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getHeroes();
  }

  // se invoca cuando el usuario hace click en uno de los héroes.
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }
}
 */

export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero); /* Guarda todos los héroes excepto el que estoy borrando, eso hace filter. */
    this.heroService.deleteHero(hero).subscribe();
  }
}