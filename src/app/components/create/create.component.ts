import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, AfterViewInit {
  minDate: Date;
  maxDate: Date;
  constructor(private fb: FormBuilder) {
    // const date = new Date();
    // console.log('from' + date);
    this.minDate = new Date();
    console.log('from' + this.minDate);
    // date.setFullYear(date.getFullYear() + 80 , 20 , 1);
    this.maxDate = new Date();
    console.log('to' + this.maxDate.getFullYear());
    this.maxDate.setFullYear(this.maxDate.getFullYear() + 100);
    console.log('to' + this.maxDate);
    // this.tradeDate = this.minDate;
  }

  frequency: string[] = ['Monthly', 'Quarterly', 'Half Yearly', 'Yearly'];
  selected = 'Quarterly';
  isExist = true;
  // term = 'year';
  tradeDate = new Date();

  form = this.fb.group({

    frequency: [this.selected, [Validators.required]],
    loanAmount: ['', [Validators.required, Validators.min(1), Validators.pattern('^\\d+$')]],
    intrestRate: ['', [Validators.required, Validators.min(1), Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')]],
    tradeDate: [this.tradeDate, [Validators.required]],
    loanStartDate: [this.getStartDate(this.tradeDate)],
    term: ['', [Validators.required, Validators.min(1), Validators.pattern('^\\d+$')]],
    isExist: [this.isExist],
    custID: [''],
    matric: ['month'],
    matureDate: [{ value: '', disabled: true }],

  });


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.form.controls.loanStartDate.valueChanges.subscribe(
      () => {
        // console.log(this.frm1 .controls.family.value)
        this.onTermChangeEvent();
      }
    );
    this.form.controls.matric.valueChanges.subscribe(
      () => {
        // console.log(this.frm1 .controls.family.value)
        this.onTermChangeEvent();
      }
    );
  }

  getErrorMessage(filedName: string): string {
    switch (filedName) {
      case 'loanAmount':
        return 'Invalid Input';

      case 'intrestRate':
        return 'Invalid Input';
      case 'term':
        return 'Invalid Input';

      default:
        break;
    }
  }
  tradeChange(event: MatDatepickerInputEvent<Date>): void {
    console.log('log');
    this.form.controls.loanStartDate.setValue(this.getStartDate(event.value));
  }
  getStartDate(date): Date {
    const startDate = new Date(date);
    return new Date(startDate.setDate(startDate.getDate() + 10));
  }

  onTermChangeEvent(): void {
    // console.log(event.target.value);
    const no = Number(this.form.controls.term.value);
    const startDate = new Date(this.form.controls.loanStartDate.value);
    console.log(startDate);
    console.log(this.form.controls.matric.value);
    if (this.form.controls.matric.value === 'year') {
      startDate.setFullYear(startDate.getFullYear() + no);
      console.log(startDate);
      this.form.controls.matureDate.setValue(startDate);
    } else {
      console.log(typeof (no));

      startDate.setMonth(startDate.getMonth() + no);
      console.log(startDate);
      this.form.controls.matureDate.setValue(startDate);
    }
  }
}
