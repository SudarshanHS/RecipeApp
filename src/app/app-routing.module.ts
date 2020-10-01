import { NgModule } from "@angular/core";
import { Routes, RouterModule, Router } from '@angular/router'
import { RecipesComponent } from "./recipes/recipes.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";

import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";

import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipesDetailComponent } from "./recipes/recipes-detail/recipes-detail.component";

const appRoute: Routes = [
    { path: '', redirectTo: "/recipes", pathMatch: 'full' },
    {
        path: 'recipes', component: RecipesComponent, children: [
            { path: '', component: RecipeStartComponent },

            { path: 'new', component: RecipeEditComponent },
            { path: ':id/edit', component: RecipeEditComponent },


            { path: ':id', component: RecipesDetailComponent }
            
        ]
    },
    { path: 'shopping-list', component: ShoppingListComponent }

];

@NgModule({

    imports: [RouterModule.forRoot(appRoute)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}