import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { LoanService } from 'src/app/services/loan.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, AfterViewInit {
  minDate: Date;
  maxDate: Date;
  constructor(private fb: FormBuilder, private ls: LoanService, private _snackBar: MatSnackBar, private router: Router) {

    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() + 100);
  }

  frequency: string[] = ['Monthly', 'Quarterly', 'Half Yearly', 'Yearly'];
  selected = 'Monthly';
  isExist = true;
  tradeDate = new Date();

  form = this.fb.group({

    frequency: [this.selected, [Validators.required]],
    loanAmount: ['', [Validators.required, Validators.min(1), Validators.pattern('^\\d+$')]],
    intrestRate: ['', [Validators.required, Validators.min(1), Validators.max(100), Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')]],
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
        this.onTermChangeEvent();
      }
    );
    this.form.controls.matric.valueChanges.subscribe(
      () => {
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
    this.form.controls.loanStartDate.setValue(this.getStartDate(event.value));
  }
  getStartDate(date): Date {
    const startDate = new Date(date);
    return new Date(startDate.setDate(startDate.getDate() + 10));
  }

  onTermChangeEvent(): void {

    try {
      const no = Number(this.form.controls.term.value);
      const startDate = new Date(this.form.controls.loanStartDate.value);
      if (this.form.controls.matric.value === 'year') {
        startDate.setFullYear(startDate.getFullYear() + no);
        this.form.controls.matureDate.setValue(startDate);
      } else {

        startDate.setMonth(startDate.getMonth() + no);
        this.form.controls.matureDate.setValue(startDate);
      }
    } catch (error) {
      console.log(error);

    }
  }

  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onApproveClick(): void {

    if (this.form.valid) {
      if (this.freqCheck()) {
        const data = this.form.value;
        if (!data.isExist) {
          data.custID = 0;
        }
        data.matureDate = this.form.controls.matureDate.value;
        this.saveApplication(this.form.value);
      } else {
        this.openSnackBar('Invaild frequency', 'Change the payment frequency');
      }

    } else {
      this.openSnackBar('Invaild form', 'Please fill the all required feilds');
    }
  }
  saveApplication(data): void {

    this.ls.create(data)
      .subscribe(
        response => {
          this.router.navigate(['sch', response.loanID]);
        },
        error => {
          console.log(error);
        });
  }

  freqCheck(): boolean {
    let valid = true;
    let no = Number(this.form.controls.term.value);
    if (this.form.controls.matric.value === 'year') {
      no = no * 12;
    }
    switch (this.form.controls.frequency.value) {
      case 'Quarterly':
        if ((no % 3) !== 0) {
          valid = false;
        }
        break;
      case 'Half Yearly':
        if ((no % 6) !== 0) {
          valid = false;
        }
        break;
      case 'Yearly':
        if ((no % 12) !== 0) {
          valid = false;
        }
        break;
      default:
        break;
    }

    return valid;
  }
}
