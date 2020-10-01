import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {


  ingredients: Ingredient[];

  private igChangedSub: Subscription

  constructor(private shoppingListService: ShoppingListService) { }



  onIngedientAdded(ing: Ingredient) {
    this.ingredients.push(ing)
  }


  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();

    this.igChangedSub = this.shoppingListService.ingredientChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    })
  }

  ngOnDestroy() {
    this.igChangedSub.unsubscribe()
  }


  onEditItem(index: number) {
    console.log("Clicked")
    this.shoppingListService.startedEditing.next(index);
  }

}
