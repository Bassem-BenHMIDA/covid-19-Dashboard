import { Component, NgZone, Renderer } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CovidTunisiaService } from '../services/covidTunisia.service';
import { CasesCovid } from '../covid19-tn';
import { CurrentCasesService } from '../services/currentCases.service';
import { ICovid } from '../services/ICovid';
import { CountryService } from '../services/country.service';
import { Icountry } from '../services/country';
import { HistoricalService } from '../services/historical.service';
import { CountryHistorical } from '../services/ICountryHistorical';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  private chart: am4charts.XYChart;
  cases: CasesCovid[] = [];
  histoCases: any[] = [];
  histoRecovered: any[] = [];
  histoDeaths: any[] = [];
  casesCountry: ICovid;
  private covidUrl = 'https://corona.lmao.ninja/v2/countries/';

  public countries: Icountry[] = [];
  countryHistorical: CountryHistorical[] = [];
  currentcountry: Icountry;
  date = new Date();
  yesterdayDate=new Date();;
  errorMessage = '';
  now = '';
  yesterday = '';
  pageTitle='Tunisia Situation';
  title = 'angular8chartjs';
  canvas: any
  ctx: any;
  show_list: boolean;
  countries_to_show: Icountry[] = [];
  constructor(public http: HttpClient,
    public covidTunisiaService: CovidTunisiaService,
    public countryService: CountryService,
    public datepipe: DatePipe,
    public currentCasesService: CurrentCasesService,
    private historicalService: HistoricalService,
    public renderer: Renderer,
    public zone: NgZone) {
    this.now = this.datepipe.transform(this.date, 'dd/MM/yyyy')

    this.yesterday = this.datepipe.transform(this.yesterdayDate, 'dd/MM/yyyy')

  }

  ngOnInit(): void {
    this.getAllCases();
    this.getCasesTn();
    this.yesterdayDate.setDate(this.date.getDate()-1)
    this.now = this.datepipe.transform(this.date, 'dd/MM/yyyy');
    this.yesterday = this.datepipe.transform(this.yesterdayDate, 'dd/MM/yyyy');

    this.getCountries();
    this.getHistoricalByCountry('tn');
    this.countries_to_show = this.countries;
    this.getYesterdayCasesByCountry('tn');
    console.log('this.yesterday' +this.yesterday )
  }
  async getYesterdayCasesByCountry(countryIso: string): Promise<ICovid> {
    let yesterdayCases = await this.http.get<ICovid>(this.covidUrl + countryIso.toUpperCase() + "?yesterday=1").toPromise();
    let todayCases = await this.http.get<ICovid>(this.covidUrl + countryIso.toUpperCase()).toPromise();
    this.casesCountry = todayCases;
    this.casesCountry.diffCases = todayCases.todayCases - yesterdayCases.todayCases;
    this.casesCountry.diffDeaths = todayCases.todayDeaths - yesterdayCases.todayDeaths;
    this.casesCountry.todayTests = todayCases.tests - yesterdayCases.tests;
    this.casesCountry.todayRecovered = todayCases.recovered - yesterdayCases.recovered;
    return this.casesCountry;
  }

  public getHistoricalByCountry(countryIso: string) {
    var data = this.historicalService.getHistoricalByCountry(countryIso).subscribe({
      next: cases => {
        this.histoCases = cases['timeline']['cases'];
        this.histoRecovered = cases['timeline']['recovered'];
        this.histoDeaths = cases['timeline']['deaths'];
        this.drowChart(countryIso, this.histoCases, this.histoRecovered, this.histoDeaths);

        //  console.log('histoCases: ' + JSON.stringify(this.histoCases))
      },
      error: err => this.errorMessage = err
    })
      ;
    return data;
  }
  doRefresh(event: { target: { complete: () => void; }; }) {
    console.log('Begin async operation');
    this.ngOnInit();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  getCountries() {
    this.countries = this.countryService.getCountries();
    this.currentcountry = this.countries.find(i => i.id === 788)

  }
  getCasesTn() {
    this.currentCasesService.getCaseByCountry("TN").subscribe({
      next: cases => {
        this.casesCountry = cases;
      },
      error: err => this.errorMessage = err
    });


  }
  getAllCases() {
    this.covidTunisiaService.getAllCases().subscribe({
      next: cases => {
        this.cases = cases;
      },
      error: err => this.errorMessage = err
    });
  }
  getCasesByCountry(country: string) {
    this.currentCasesService.getCaseByCountry(country).subscribe({
      next: cases => this.casesCountry = cases,
      error: err => this.errorMessage = err
    });

    this.getYesterdayCasesByCountry(country);
  }

  compareById(o1, o2) {
    return o1.id === o2.id
  }
  selectChanged(countrySelect: Icountry) {
    if (countrySelect != null) {
      this.getCasesByCountry(countrySelect.alpha2);
      //  console.log('countrySelect  : ' +countrySelect.alpha2);
      if (countrySelect.alpha2 === "tn") {
        this.covidTunisiaService.getAllCases().subscribe({
          next: cases => {
            this.cases = cases;
          },
          error: err => this.errorMessage = err
        });
      }
      else {
        this.cases = [];
      }
      this.getHistoricalByCountry(countrySelect.alpha2);
      this.pageTitle=countrySelect.name+ " Situation";
    }
  }

  loadFlags() {

    setTimeout(function () {
      let radios = document.getElementsByClassName('alert-radio-label');
      for (let index = 0; index < radios.length; index++) {
        console.log(' radios[index]: ' + radios[index]);
        let element = radios[index];
        element.innerHTML = '  <img class="country-image"tyle="width: 30px;height:16px;" src="https://restcountries.eu/data/' + this.countries[index].alpha2 + '.svg" /> '.concat(element.innerHTML);
      }
    }, 1000);
  }

  onCancel(val) {
    this.show_list = false;
  }

  click_bar() {
    this.show_list = true;
  }

  change_query(query) {
    console.log(query);
    let k = 0;
    this.countries_to_show = [];
    for (let i = 0; i < this.countries.length; i++) {
      if (this.countries[i].alpha2.toLowerCase().startsWith(query.toLowerCase()) || this.countries[i].name.toLowerCase().startsWith(query.toLowerCase())) {
        this.countries_to_show[k] = this.countries[i];
        k += 1;
      }
    }
    if (this.countries_to_show != null) {
      this.currentcountry = this.countries_to_show[0]
    }
    else {
      this.currentcountry = this.countries[0];
    }
    this.renderer.invokeElementMethod(event.target, 'blur');
  }
  change_query_input(query) {
    this.change_query(query);
  }

  drowChart(countryIso: string, histoCases: any[], histoRecovered: any[], histoDeaths: any[]) {

    /**
  * ---------------------------------------
  * This demo was created using amCharts 4.
  * 
  * For more information visit:
  * https://www.amcharts.com/
  * 
  * Documentation is available at:
  * https://www.amcharts.com/docs/v4/
  * ---------------------------------------
  */

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create("chartdiv", am4charts.XYChart);
    //

    // Increase contrast by taking evey second color
    chart.colors.step = 4;

    // Add data
    chart.data = generateChartData(histoCases, histoRecovered, histoDeaths);
    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.labels.template.fontSize = 10;
    dateAxis.renderer.minGridDistance = 40;
    dateAxis.dateFormatter.dateFormat = "dd-MM-yyyy";
    // Create series
    function createAxisAndSeries(field, name, opposite, bullet) {
      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

      var series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = field;
      series.dataFields.dateX = "date";
      // series.strokeWidth = 2;
      series.yAxis = valueAxis;
      series.name = name;
      series.tooltipText = "{name}: [bold]{valueY}[/]";
      //  series.tensionX = 0.4;
      series.showOnInit = true;

      var interfaceColors = new am4core.InterfaceColorSet();
      valueAxis.renderer.line.strokeOpacity = 1;
      valueAxis.renderer.line.strokeWidth = 1;
      valueAxis.renderer.line.stroke = series.stroke;
      valueAxis.renderer.labels.template.fill = series.stroke;
      valueAxis.renderer.opposite = opposite;
      valueAxis.renderer.hidden = opposite;
      valueAxis.renderer.labels.template.fontSize = 10
    }

    createAxisAndSeries("cases", "Cases", false, "circle");
    // createAxisAndSeries("recovered", "Recovered", true, "triangle");
    // createAxisAndSeries("deaths", "Deaths", true, "rectangle");

    // Add legend
    chart.legend = new am4charts.Legend();

    // Add cursor
    chart.cursor = new am4charts.XYCursor();

    // generate some random data, quite different range
    function generateChartData(histoCases: any[], histoRecovered: any[], histoDeaths: any[]) {
      var chartData = [];
      var firstDate = "";
      var cases = 0;
      var recovered = 0;
      var deaths = 0;
      for (var key in histoCases) {
        var i = 0;
        // we create date objects here. In your data, you can have date strings
        // and then set format of your dates using chart.dataDateFormat property,
        // however when possible, use date objects, as this will speed up chart rendering.
        let firstDateStr = key;

        var newDate = new Date(firstDateStr);
        newDate.setHours(0, 0, 0, 0);
        newDate.setDate(newDate.getDate() + i);
        chartData.push({
          date: newDate,
          cases: histoCases[key.valueOf()]
          // ,
          // recovered:  histoRecovered[key.valueOf()],
          // deaths:  histoDeaths[key.valueOf()]
        });
      }
      return chartData;
    }
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}

