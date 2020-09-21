import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { LoanService } from 'src/app/services/loan.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
export interface Element {
  id: string;
  data: Array<any>;
}
@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.css']
})
export class LoanListComponent implements OnInit, AfterViewInit {

  displayedColumns = ['custID','loanID','loanAmount','frequency','intrestRate','loanStartDate','term','tradeDate','matureDate', 'button'];
  tableData = new MatTableDataSource();
  expandedElement: Element | null;
  dataMap = new Map();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private ls: LoanService) { }

  ngOnInit(): void {
this.ls.getLoans().subscribe(
      response => {
        this.tableData = new MatTableDataSource(response);
        this.ngAfterViewInit();
      },
      error => {
        console.log(error);
      });
  }
  ngAfterViewInit(): void {
    this.tableData.paginator = this.paginator;
    this.tableData.sort = this.sort;
  }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableData.filter = filterValue.trim().toLowerCase();

    if (this.tableData.paginator) {
      this.tableData.paginator.firstPage();
    }
  }
  getCount(id): number {
    const s = [];
    return this.dataMap.get(id).length();
  }
}
