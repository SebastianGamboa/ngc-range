import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgcRangeComponent } from './ngc-range/ngc-range.component';

const routes: Routes = [
  { path: '',  redirectTo: 'exercise1', pathMatch: 'full' },
  { path: 'exercise1', component: NgcRangeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
