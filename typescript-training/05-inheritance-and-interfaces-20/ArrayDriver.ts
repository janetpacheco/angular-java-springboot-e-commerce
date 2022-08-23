
import { Circle } from "./Circle";
import { Rectangle } from "./Rectangle";
import { Shape } from "./Shape";

let myShape = new Shape(10,15);
let myCircle = new Circle(5,2,10);
let myRentangle = new Rectangle(0,0,5,3);

let theShapes : Shape[] = [];

theShapes.push(myShape);
theShapes.push(myCircle);
theShapes.push(myRentangle);

for(let tempShape of theShapes){
    console.log(tempShape.getInfo());
}