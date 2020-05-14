import { Component } from '@angular/core';
import { CurrentCasesService } from '../services/currentCases.service';
import { ICovid } from '../services/ICovid';
import { DatePipe } from '@angular/common';
import { FilterField } from '../services/FilterField';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  cases: ICovid[] = [];
  filterList: FilterField[] = [{ "id": 1, "name": "cases", "description": "Total cases" },
  { "id": 2, "name": "todayCases", "description": "New cases" },
  { "id": 3, "name": "deaths", "description": "Total deaths" },
  { "id": 4, "name": "todayDeaths", "description": "New deaths" },
  { "id": 5, "name": "recovered", "description": "Total recovered" },
  { "id": 6, "name": "active", "description": "Active cases" },
  { "id": 7, "name": "critical", "description": "Critical cases" },
  { "id": 8, "name": "tests", "description": "Total tests" },
  { "id": 9, "name": "continent", "description": "Continent" }];
  currentfilter: FilterField = this.filterList[0];
  orderByList: FilterField[] = [{ "id": 1, "name": "desc", "description": "+/-" },
  { "id": -1, "name": "asc", "description": "-/+" }];
  currentOrderBy: FilterField = this.orderByList[0];
  date = new Date();
  errorMessage = '';
  now = '';
  constructor(public currentCasesService: CurrentCasesService, public datepipe: DatePipe) { }
  ngOnInit(): void {
    this.currentCasesService.getAllCases().subscribe({
      next: cases => {
        this.cases = cases.sort((a, b) => {
          if (a.cases < b.cases) return 1;
          if (a.cases > b.cases) return -1;
          return 0;
        });

      },
      error: err => this.errorMessage = err
    });
    this.now = this.datepipe.transform(this.date, 'dd/MM/yyyy')

  }
  doRefresh(event) {
    console.log('Begin async operation');
    this.ngOnInit();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  selectChanged(filterSelect: FilterField, ordeyBySelect: FilterField) {
    this.sortResult(filterSelect, ordeyBySelect.id);
  }
  sortResult(filterSelect: FilterField, orderSign: number) {
    if (filterSelect != null) {
      if (filterSelect.name == "cases") {
        this.currentCasesService.getAllCases().subscribe({
          next: cases => {
            this.cases = cases.sort((a, b) => {
              if (a.cases < b.cases) return orderSign;
              if (a.cases > b.cases) return (orderSign * (-1));
              return 0;
            });

          },
          error: err => this.errorMessage = err
        });
      }
      else if (filterSelect.name == "todayCases") {
        this.currentCasesService.getAllCases().subscribe({
          next: cases => {
            this.cases = cases.sort((a, b) => {
              if (a.todayCases < b.todayCases) return orderSign;
              if (a.todayCases > b.todayCases) return (orderSign * (-1));
              return 0;
            });

          },
          error: err => this.errorMessage = err
        });
      }
      else if (filterSelect.name == "deaths") {
        this.currentCasesService.getAllCases().subscribe({
          next: cases => {
            this.cases = cases.sort((a, b) => {
              if (a.deaths < b.deaths) return orderSign;
              if (a.deaths > b.deaths) return (orderSign * (-1));
              return 0;
            });

          },
          error: err => this.errorMessage = err
        });
      }
      else if (filterSelect.name == "todayDeaths") {
        this.currentCasesService.getAllCases().subscribe({
          next: cases => {
            this.cases = cases.sort((a, b) => {
              if (a.todayDeaths < b.todayDeaths) return orderSign;
              if (a.todayDeaths > b.todayDeaths) return (orderSign * (-1));
              return 0;
            });

          },
          error: err => this.errorMessage = err
        });
      }
      else if (filterSelect.name == "recovered") {
        this.currentCasesService.getAllCases().subscribe({
          next: cases => {
            this.cases = cases.sort((a, b) => {
              if (a.recovered < b.recovered) return orderSign;
              if (a.recovered > b.recovered) return (orderSign * (-1));
              return 0;
            });

          },
          error: err => this.errorMessage = err
        });
      }
      else if (filterSelect.name == "active") {
        this.currentCasesService.getAllCases().subscribe({
          next: cases => {
            this.cases = cases.sort((a, b) => {
              if (a.active < b.active) return orderSign;
              if (a.active > b.active) return (orderSign * (-1));
              return 0;
            });

          },
          error: err => this.errorMessage = err
        });
      }
      else if (filterSelect.name == "critical") {
        this.currentCasesService.getAllCases().subscribe({
          next: cases => {
            this.cases = cases.sort((a, b) => {
              if (a.critical < b.critical) return orderSign;
              if (a.critical > b.critical) return (orderSign * (-1));
              return 0;
            });

          },
          error: err => this.errorMessage = err
        });
      }
      else if (filterSelect.name == "tests") {
        this.currentCasesService.getAllCases().subscribe({
          next: cases => {
            this.cases = cases.sort((a, b) => {
              if (a.tests < b.tests) return orderSign;
              if (a.tests > b.tests) return (orderSign * (-1));
              return 0;
            });

          },
          error: err => this.errorMessage = err
        });
      }
      else if (filterSelect.name == "continent") {
        this.currentCasesService.getAllCases().subscribe({
          next: cases => {
            this.cases = cases.sort((a, b) => {
              if (a.continent.localeCompare(b.continent) < 0)  return orderSign ;
              if (a.continent.localeCompare(b.continent) > 0) return (orderSign * (-1));
              return 0;


            });
          },
          error: err => this.errorMessage = err
        });
      }
    }
  }
  compareById(o1, o2) {
    return o1.id === o2.id
  }
}
