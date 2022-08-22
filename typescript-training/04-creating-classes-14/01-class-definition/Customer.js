var Customer = /** @class */ (function () {
    function Customer(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    return Customer;
}());
var customer = new Customer('Annie', 'Pacheco');
console.log(customer.firstName);
console.log(customer.lastName);
