import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CsvTableComponent } from './csv-table/csv-table.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
 {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'table',
        component: CsvTableComponent,
    },
    {
        path: 'chart',
        component: PieChartComponent,
    },
    {
        path: 'report',
        component: BarChartComponent,
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
