import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InformationComponent } from '../information/information.component';
import { Error404Component } from '../../error404/error404.component';

const routes: Routes = [
  {
    path: 'information',
    component: InformationComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'information'
  },
  {
    path: '**',
    component: Error404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
