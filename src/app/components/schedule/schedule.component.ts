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
  intrestData = [];
  payData = [];

  constructor(private route: ActivatedRoute, private ls: LoanService) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id = params.id;
      console.log(this.id);
      // this.setData();
      let obj = this.ls.get(this.id).subscribe(
        response => {
          // this.router.navigate(['sch', response.loanID]);
          console.log(response);
          // this.submitted = true;
        },
        error => {
          console.log(error);
        });
    });

  }

}
