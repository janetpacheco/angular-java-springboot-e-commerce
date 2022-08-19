var sports = ['golf', 'cricket', 'tennis', 'swimming'];
// traditional approach
/*
for(let i = 0; i < sports.length; i++){
    console.log(sports[i]);
}
*/
//use of simplified for loop
for (var _i = 0, sports_1 = sports; _i < sports_1.length; _i++) {
    var tempSport = sports_1[_i];
    if (tempSport == 'tennis') {
        console.log(tempSport + ' << my favorite !!');
    }
    else {
        console.log(tempSport);
    }
}
