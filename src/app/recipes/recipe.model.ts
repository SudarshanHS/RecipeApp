import { Ingredient } from "../shared/ingredient.model";

export class Recipe{
    public name : string;
    public description:string;
    public imagePath : string;
    public ingredents : Ingredient[]
 
    
    constructor(name:string,description:string,imagePath:string,ingredents : Ingredient[] ){
        this.name=name;
        this.description= description;
        this.imagePath= imagePath;
        this.ingredents = ingredents;
    }

}