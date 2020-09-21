import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  id: any;
  data: any;
  intrestData = [];
  payData = [];

  displayedColumns: string[] = ['position', 'paymentDate', 'startingBalance', 'paymentAmount', 'principal', 'projectedInterest', 'newBalance', 'paymentStatus'];
  otherLoan: any;

  constructor(private route: ActivatedRoute, private ls: LoanService) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id = params.id;
      let obj = this.ls.get().subscribe(
        response => {

          const f = [];

          this.data = response.find(e => e.loanID === this.id);
          this.otherLoan = response.filter(e => e.custID === this.data.custID);

          this.payData = this.data.evenPrincipal;
          this.intrestData = this.data.interestOnly;

        },
        error => {
          console.log(error);
        });
    });

  }


  getStatus(date, status): any {

    const today = new Date();
    const payDate = new Date(date);
    if ((payDate <= today && status !== 'PAID')) {
      status = 'AWAITINGPAYMENT';
      return status;
    }

    return status;
  }

  payLoan(index, code): void {

    this.ls.pay(index, code).subscribe(
      response => {
        console.log(response);

      },
      error => {
        console.log(error);
      });

  }

}
