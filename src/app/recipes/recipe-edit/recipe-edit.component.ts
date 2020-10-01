import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';



@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  id: number
  editMode: boolean = false;

  recipeForm: FormGroup;



  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.id = +params['id']
      this.editMode = params['id'] != null

      this.initForm();
    })




  }



  private initForm() {

    let recipeName = ''
    let recipeImagePath = '';
    let recipeDescription = '';

    let recipeIngeridents = new FormArray([]);



    if (this.editMode) {
      const recipe: Recipe = this.recipeService.getRecipe(this.id)
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;


      console.log("soze if arrat >>>" + recipe.ingredents)

      if (recipe['ingredents']) {
        for (let ingredent of recipe.ingredents) {
          recipeIngeridents.push(new FormGroup({
            'name': new FormControl(ingredent.name, Validators.required),
            'amount': new FormControl(ingredent.amount, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')])
          }))
        }
      }
    }

    console.log("soze if arrat 1212121 $$$ >>>" + recipeIngeridents)


    this.recipeForm = new FormGroup({


      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),  //  formControlName="description"
      'ingredents': recipeIngeridents


    })

  }


  onSubmit() {

    console.log("onSubmitClicked()")

    /*   const name: string = this.recipeForm.value['name'];
      var description = this.recipeForm.value['description']
      const imagePath = this.recipeForm.value['imagePath']
      const ingeredints: Ingredient[] = this.recipeForm.value['ingredents']
      const recipe: Recipe = new Recipe(name, description, imagePath, ingeredints)
   */

    if (this.editMode) {
      //this.recipeService.updateRecipe(this.id, recipe)

      this.recipeService.updateRecipe(this.id, this.recipeForm.value)

    } else {

      this.recipeService.addRecipe(this.recipeForm.value)
    }

    this.onCancel()
  }


  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredents')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')])
    }))
  }

  onDeleteIngredint(index:number){
    (<FormArray>this.recipeForm.get('ingredents')).removeAt(index)
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredents')).controls;
  }
}
