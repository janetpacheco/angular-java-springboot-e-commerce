let sports : string [] = ['golf', 'cricket', 'tennis', 'swimming'];

// traditional approach
/*
for(let i = 0; i < sports.length; i++){
    console.log(sports[i]);
}
*/

//use of simplified for loop
for(let tempSport of sports){
    if (tempSport == 'tennis'){
        console.log(tempSport + ' << my favorite !!')
    }
    else{
        console.log(tempSport);
    }    
}