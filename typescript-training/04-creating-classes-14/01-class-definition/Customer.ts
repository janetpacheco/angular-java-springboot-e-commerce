class Customer{
    // properties
    firstName: string;
    lastName : string; 
    
    //constructors
    constructor(firstName : string, lastName : string){
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

let customer = new Customer('Annie', 'Pacheco');


console.log(customer.firstName);
console.log(customer.lastName);
