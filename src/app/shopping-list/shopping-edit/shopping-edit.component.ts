import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

import { NgForm } from '@angular/forms';
import { Subscribable, Subscription } from 'rxjs';



@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {


  @ViewChild('f', { static: false }) slForm: NgForm;

  subscription: Subscription;

  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoopingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoopingListService.startedEditing.subscribe((index: number) => {

      console.log("Clicke is recived  ")
      this.editedItemIndex = index;
      this.editMode = true;

      this.editedItem = this.shoopingListService.getIngredient(index);

      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount

      })


    })

  }


  onAddItem(form: NgForm) {


    const value = form.value
    const ing: Ingredient = new Ingredient(value.name, value.amount);

    if (!this.editMode) {
      this.shoopingListService.addToList(ing)
    } else {
      this.shoopingListService.updateIngredient(this.editedItemIndex, ing)
    }

    this.editMode = false
    form.reset()

  }


  onClear() {
    this.editMode = false
    this.slForm.reset()
  }

  onDelete(){
    this.shoopingListService.deleteIngredient(this.editedItemIndex);
    this.onClear()
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
