import { Component, OnInit } from '@angular/core';
import { Utility } from '../model/utility.model';  
import { Router } from "@angular/router";
import { LoginService } from '../services/login.service';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Login } from '../classes/login';
import { Balance } from '../classes/balance';

@Component({
  selector: 'app-utility-service',
  templateUrl: './utility-service.component.html',
  styleUrls: ['./utility-service.component.css']
})
export class UtilityServiceComponent implements OnInit {
  statusCode: number;
  balanceAmount: Balance;
  transaction: any;
  utilities = [
    {
      flight: 'DEL-BLR => 100 sab',
      hotel: 'ITC Garden => 50 sab',
      cab: 'Uber Premium => 20 sab'
    },
    {
      flight: 'BLR-LHR => 1000 sab',
      hotel: 'Travelodege => 100 sab',
      cab: 'Uber Premium => 50 sab'
    },
    {
      flight: 'LHR-ATL => 1000 sab',
      hotel: 'US comfort => 200 sab',
      cab: 'Uber Premium => 60 sab'
    }
  ];
  constructor(private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  reconcileReport() {
    console.log("Entry reconcileReport");
    this.loginService.getBalance()
     .subscribe((bal: any) => {
          this.balanceAmount = bal;
    //       console.log("Balance: " + this.balanceAmount.balance);
    //       //let route = this.router.config.find(r => r.path === '/report');
    //       //route.data = { entity: this.balanceAmount };
    //       //this.router.navigate(['/report']);   
     },
     errorCode =>  this.statusCode = errorCode);

    this.loginService.getTransaction()
    .subscribe((tran: any) => {
      console.log(JSON.stringify(tran));
          this.transaction = JSON.stringify(tran);
    },
    errorCode =>  this.statusCode = errorCode);
  }

}
