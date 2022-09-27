import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { HuskyShopFormService } from 'src/app/services/husky-shop-form-service.service';

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

  countries: Country []=[];
  

  constructor(private formBuilder: FormBuilder,
              private huskyShopFormService: HuskyShopFormService ) { }

  ngOnInit(): void {

    this.checkoutFormGroup = this.formBuilder.group(
      {
        customer : this.formBuilder.group({
          firstName: [''],
          lastName: [''],
          email: ['']
        }),

        shippingAddress : this.formBuilder.group({
          country: [''],
          street: [''],
          city: [''],
          state: [''],
          zipCode: ['']
        }),

        billingAddress : this.formBuilder.group({
          country: [''],
          street: [''],
          city: [''],
          state: [''],
          zipCode: ['']
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

  }

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
    }
    else{
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
  }

  onSubmit(){
    console.log("Handling the submit button");
    console.log(this.checkoutFormGroup.get('customer').value)
    console.log("The email address is "+ this.checkoutFormGroup.get('customer').value.email);
  }

  

}
