import { Injectable } from "@angular/core";

import { HttpClient } from '@angular/common/http'

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";



@Injectable({ providedIn: 'root' })
export class DataStorageService {

    constructor(private http: HttpClient, private recipeService: RecipeService) { }



    storeRecipes() {

        /*  const recipes = this.recipeService.getRecipes();
 
        
         const value = this.http.put('https://ng-course-recipe-book-c1980.firebaseio.com/recipes.json', recipes);
 
         console.log("returned value ...." + value)
 
         return value
  */

        const recipes = this.recipeService.getRecipes();
        return this.http
            .put('https://ng-course-recipe-book-c1980.firebaseio.com/recipes.json', recipes)
            .subscribe(response => {
                console.log(response);
            });
    }


    onFetchData() {

        console.log("onFetchData() is called $$$4")


        return this.http
            .get<Recipe[]>('https://ng-course-recipe-book-c1980.firebaseio.com/recipes.json')
            .subscribe(recipes => {
                this.recipeService.setRecipes(recipes)
            })


        /*  return this.http
             .get<Recipe[]>('https://ng-course-recipe-book-c1980.firebaseio.com/recipes.json')
             .pipe(
                 map(recipes => {
                     return recipes.map(recipe => {
                         return {
                             ...recipe,
                             ingredients: recipe.ingredients ? recipe.ingredients : []
                         };
                     });
                 }),
                 tap(recipes => {
                     this.recipeService.setRecipes(recipes);
                 })
             );
     } */
    }

}