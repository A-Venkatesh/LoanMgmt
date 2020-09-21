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

  constructor(private route: ActivatedRoute, private ls: LoanService) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id = params.id;
      console.log(this.id);
      // this.setData();
      this.ls.get(this.id);
    });

  }

}
