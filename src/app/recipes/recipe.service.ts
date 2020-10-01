import { Injectable, EventEmitter } from '@angular/core'
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';


@Injectable()
export class RecipeService {


    // recipeSelected = new EventEmitter<Recipe>();

    recipeChanged = new Subject<Recipe[]>();


    ingreditns1: Ingredient = new Ingredient("Meat", 1)
    ingreditns2: Ingredient = new Ingredient("Fench Frice", 20)

    ingreditns3: Ingredient = new Ingredient("Buns", 11)
    ingreditns4: Ingredient = new Ingredient("vegges", 20)



    ings1: Ingredient[] = [this.ingreditns1, this.ingreditns2];
    ings2: Ingredient[] = [this.ingreditns3, this.ingreditns4];


    recp1: Recipe = new Recipe("A Test Recipe ", "hello description", "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2019/10/9/DV3016_masala-dosa_s4x3.jpg.rend.hgtvcom.826.620.suffix/1570635680579.jpeg", this.ings1)
    recp2: Recipe = new Recipe("B Test Recipe ", "hello description2", "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2019/10/9/DV3016_masala-dosa_s4x3.jpg.rend.hgtvcom.826.620.suffix/1570635680579.jpeg", this.ings2)


    private recipes: Recipe[] = [this.recp1, this.recp2]


    constructor(private shoppingListService: ShoppingListService) { }



    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice())
    }

    getRecipes() {
        return this.recipes.slice();
    }


    addIngridentsToShoppinglist(ingredients: Ingredient[]) {
        this.shoppingListService.addItemsToList(ingredients)
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }


    addRecipe(recipe: Recipe) {


        this.recipes.push(recipe)
        this.shoppingListService.addItemsToList(recipe.ingredents)
        this.recipeChanged.next(this.recipes.slice())
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe
        this.recipeChanged.next(this.recipes.slice())

    }


    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice())

    }
}