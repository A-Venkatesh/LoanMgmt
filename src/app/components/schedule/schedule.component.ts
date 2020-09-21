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

  constructor(private route: ActivatedRoute, private ls: LoanService) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id = params.id;
      console.log(this.id);
      // this.setData();
      let obj = this.ls.get().subscribe(
        response => {
          // this.router.navigate(['sch', response.loanID]);
          console.log(response);

          this.data = response.find(e => e.loanID === this.id);
          console.log(this.data);
          this.payData = this.data.evenPrincipal;
          this.intrestData = this.data.interestOnly;
          // this.submitted = true;
        },
        error => {
          console.log(error);
        });
    });

  }

}
