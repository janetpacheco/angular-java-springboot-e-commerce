"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Circle_1 = require("./Circle");
var Rectangle_1 = require("./Rectangle");
var theShapes = [];
// let myShape = new Shape(10,15);
var myCircle = new Circle_1.Circle(5, 2, 10);
var myRentangle = new Rectangle_1.Rectangle(0, 0, 5, 3);
// theShapes.push(myShape);
theShapes.push(myCircle);
theShapes.push(myRentangle);
for (var _i = 0, theShapes_1 = theShapes; _i < theShapes_1.length; _i++) {
    var tempShape = theShapes_1[_i];
    console.log(tempShape.getInfo());
    console.log("Area =" + tempShape.calculateArea());
    console.log();
}
