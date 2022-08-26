import { Component, OnInit } from '@angular/core';
import { SalesPerson } from './sales-person';

@Component({
  selector: 'app-sales-person-list',
  templateUrl: './sales-person-list-bootstrap.component.html',
  styleUrls: ['./sales-person-list.component.css']
})
export class SalesPersonListComponent implements OnInit {

  // array of of SalesPerson objects
  salesPersonList: SalesPerson[] = [
    new SalesPerson("Ana","Pacheco","ana.pacheco@gmail.com",500000),
    new SalesPerson("Diana","Jimenez","diana.jimenez@gmail.com",300000),
    new SalesPerson("Jose","Camilo","jose_camilo@gmail.com",120000),
    new SalesPerson("Curtis","Coupal","curtis_coupal@gmail.com",5000)
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
