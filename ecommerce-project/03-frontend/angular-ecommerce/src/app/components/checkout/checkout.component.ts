import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { HuskyShopFormService } from 'src/app/services/husky-shop-form-service.service';
import { HuskyShopValidators } from 'src/app/validators/husky-shop-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  
  checkoutFormGroup : FormGroup;

  totalPrice: number= 0.00;
  totalQuantity: number= 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[]=[];  

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];
  

  constructor(private formBuilder: FormBuilder,
              private huskyShopFormService: HuskyShopFormService ) { }

  ngOnInit(): void {

    this.checkoutFormGroup = this.formBuilder.group(
      {
        customer : this.formBuilder.group({
          firstName: new FormControl('',
                                       [Validators.required,
                                        Validators.minLength(2), 
                                        HuskyShopValidators.notOnlyWhitespace]),
          lastName: new FormControl('',[Validators.required,
                                        Validators.minLength(2),
                                        HuskyShopValidators.notOnlyWhitespace]),
                                                            
          email: new FormControl('',
                                [Validators.required,
                                 Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])
        }),

        shippingAddress : this.formBuilder.group({
          country: new FormControl('',Validators.required),
          street: new FormControl('',[Validators.required,
                                      Validators.minLength(2),
                                      HuskyShopValidators.notOnlyWhitespace]),
                           
          city: new FormControl('',[Validators.required,
                                    Validators.minLength(2),
                                    HuskyShopValidators.notOnlyWhitespace]),
                           
          state: new FormControl('',Validators.required),
          zipCode: new FormControl('',[Validators.required,
                                      Validators.minLength(2),
                                      HuskyShopValidators.notOnlyWhitespace]),
                           
        }),

        billingAddress : this.formBuilder.group({
          country: new FormControl('',Validators.required),
          street: new FormControl('',[Validators.required,
                                      Validators.minLength(2),
                                      HuskyShopValidators.notOnlyWhitespace]),
                           
          city: new FormControl('',[Validators.required,
                                    Validators.minLength(2),
                                    HuskyShopValidators.notOnlyWhitespace]),
                           
          state: new FormControl('',Validators.required),
          zipCode: new FormControl('',[Validators.required,
                                      Validators.minLength(2),
                                      HuskyShopValidators.notOnlyWhitespace])
                           
        }),

        creditCardInfo : this.formBuilder.group({
          cardType: [''],
          cardName: [''],
          cardNumber: [''],
          securityCode: [''],
          expMonth: [''],
          expYear: ['']
        })
      }
    );

    const startMonth: number = new Date().getMonth() + 1;
    console.log("start month: "+ startMonth);

    this.huskyShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("retrieve credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );

    this.huskyShopFormService.getCreditCardYears().subscribe(
      data => {
        console.log("retrieve credit card years: " + JSON.stringify(data));
        this.creditCardYears = data;
      }
    );

    this.huskyShopFormService.getCountries().subscribe(
      data => {
        console.log("Retrieve countries: " + JSON.stringify(data));
        this.countries = data;
      }
    );

  }

  get firstName(){ return this.checkoutFormGroup.get('customer.firstName');}
  get lastName(){ return this.checkoutFormGroup.get('customer.lastName');}
  get email(){ return this.checkoutFormGroup.get('customer.email');}

  get shippingAddressCountry(){ return this.checkoutFormGroup.get('shippingAddress.country');} 
  get shippingAddressStreet(){ return this.checkoutFormGroup.get('shippingAddress.street');}
  get shippingAddressCity(){ return this.checkoutFormGroup.get('shippingAddress.city');}                   
  get shippingAddressState(){ return this.checkoutFormGroup.get('shippingAddress.state');}
  get shippingAddressZipCode(){ return this.checkoutFormGroup.get('shippingAddress.zipCode');}

  get billingAddressCountry(){ return this.checkoutFormGroup.get('billingAddress.country');} 
  get billingAddressStreet(){ return this.checkoutFormGroup.get('billingAddress.street');}
  get billingAddressCity(){ return this.checkoutFormGroup.get('billingAddress.city');}                   
  get billingAddressState(){ return this.checkoutFormGroup.get('billingAddress.state');}
  get billingAddressZipCode(){ return this.checkoutFormGroup.get('billingAddress.zipCode');}


  handleMonthsAndYears(){
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCardInfo');
    const currentYear : number = new Date().getFullYear();
    const selectedYear : number = Number(creditCardFormGroup.value.expYear);

    let startMonth: number;

    if ( currentYear === selectedYear){
      startMonth = new Date().getMonth() + 1 ;
    }else{
      startMonth = 1;
    }

    this.huskyShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data ;
      }
    );

    // populate countries
    this.huskyShopFormService.getCountries().subscribe(
      data => {
        console.log("Retrieved countries: " + JSON.stringify(data));
        this.countries = data ;
      }
    );
  }

  copyShippingAdressToBillingAddress(event){

    if(event.target.checked){
      this.checkoutFormGroup.controls['billingAddress']
      .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
      this.billingAddressStates = this.shippingAddressStates;
    }    

    else{
      this.checkoutFormGroup.controls['billingAddress'].reset();
      this.billingAddressStates = [];
    }
  }

  onSubmit(){
    console.log("Handling the submit button");
    if (this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
    }
    console.log(this.checkoutFormGroup.get('customer').value)
    console.log("The email address is "+ this.checkoutFormGroup.get('customer').value.email);
    
    console.log("The shipping address country is " + this.checkoutFormGroup.get('shippingAddress').value.country.name);
    console.log("The shipping address state is " + this.checkoutFormGroup.get('shippingAddress').value.state.name);

    console.log("The billing address country is " + this.checkoutFormGroup.get('billingAddress').value.country.name);
    console.log("The billing address state is " + this.checkoutFormGroup.get('billingAddress').value.state.name);

  
  }  

  getStates(formGroupName: string) {

    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup.value.country.code;
    const countryName = formGroup.value.country.name;

    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);

    this.huskyShopFormService.getStates(countryCode).subscribe(
      data => {

        if (formGroupName === 'shippingAddress') {
          this.shippingAddressStates = data; 
        }
        else {
          this.billingAddressStates = data;
        }

        // select first item by default
        formGroup.get('state').setValue(data[0]);
      }
    );
  }
}
