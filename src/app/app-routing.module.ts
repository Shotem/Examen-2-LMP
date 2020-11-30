import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Tab1Component } from './tab1/tab1.component';
import { TabinicioComponent } from './tabinicio/tabinicio.component';

const routes: Routes = [
  { path: 'tabinicio', component: TabinicioComponent },
  { path: 'tab1', component: Tab1Component },
  { path: "", redirectTo: "tabinicio", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
