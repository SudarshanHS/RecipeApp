import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {



  recipes: Recipe[]

  subscription: Subscription;




  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();

    this.subscription = this.recipeService.recipeChanged.subscribe((recipes: Recipe[]) => {

      console.log("changes occred...")
      this.recipes = recipes;
    })
  }


  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
