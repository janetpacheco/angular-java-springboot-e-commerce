import { Coach } from "./Coach";
import { CricketCoach } from "./CricketCoach";
import { GolfCoach } from "./GolfCoach";


let myCricketCoach = new CricketCoach();
console.log(myCricketCoach.getDailyWorkout());

let myGolfCoach = new GolfCoach();
console.log(myGolfCoach.getDailyWorkout());

let theCoaches : Coach[]= [];

theCoaches.push(myCricketCoach);
theCoaches.push(myGolfCoach);


for (let tempCoach of theCoaches){
    console.log(tempCoach.getDailyWorkout());
}