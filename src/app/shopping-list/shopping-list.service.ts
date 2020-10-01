import { Injectable, OnInit, EventEmitter } from '@angular/core'
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';


@Injectable()
export class ShoppingListService {


    ingredientChanged = new Subject<Ingredient[]>();

    startedEditing = new Subject<number>();


    ing1 = new Ingredient("Apple", 5)
    ing2 = new Ingredient("Tomato", 10)
    private ingredients: Ingredient[] = [this.ing1, this.ing2];


    getIngredients() {
        return this.ingredients.slice()
    }


    addToList(ingerdient: Ingredient) {
        this.ingredients.push(ingerdient)
        this.ingredientChanged.next(this.ingredients.slice())
    }

    addItemsToList(ingerdient: Ingredient[]) {
        this.ingredients.push(...ingerdient)
        this.ingredientChanged.next(this.ingredients.slice())
    }

    updateIngredient(index: number, newIngredint: Ingredient) {
        this.ingredients[index] = newIngredint;
        this.ingredientChanged.next(this.ingredients.slice())
    }


    deleteIngredient(index:number){
        this.ingredients.splice(index,1)
        this.ingredientChanged.next(this.ingredients.slice())

    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }


}