"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Circle_1 = require("./Circle");
var Rectangle_1 = require("./Rectangle");
// Error we cannot create an instance of an ansvtract class
// let myShape = new Shape(10, 15);
// console.log(myShape.getInfo());
var myCircle = new Circle_1.Circle(5, 10, 20);
console.log(myCircle.getInfo());
var myRentangle = new Rectangle_1.Rectangle(0, 0, 3, 7);
console.log(myRentangle.getInfo());
