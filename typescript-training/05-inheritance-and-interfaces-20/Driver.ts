import {Shape} from './Shape'
import { Circle } from './Circle'
import { Rectangle } from './Rectangle';

// Error we cannot create an instance of an ansvtract class
// let myShape = new Shape(10, 15);
// console.log(myShape.getInfo());

let myCircle = new Circle(5, 10, 20)
console.log(myCircle.getInfo());

let myRentangle = new Rectangle(0, 0, 3, 7)
console.log(myRentangle.getInfo());