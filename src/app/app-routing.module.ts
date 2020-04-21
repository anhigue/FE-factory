import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { Error404Component } from './pages/error404/error404.component';
import { InformationComponent } from './pages/home/information/information.component';
import { SettingsComponent } from './pages/home/settings/settings.component';
import { CatalogueCarsComponent } from './pages/home/catalogue-cars/catalogue-cars.component';
import { CatalogueUserComponent } from './pages/home/catalogue-user/catalogue-user.component';
import { CataloguePartsComponent } from './pages/home/catalogue-parts/catalogue-parts.component';
import { UserInGuard } from './guard/user-in.guard';
import { UserOutGuard } from './guard/user-out.guard';
import { ClientConsultComponent } from './pages/client-consult/client-consult.component';
import { LoginClientComponent } from './pages/login-client/login-client.component';
import { ConsultClientGuard } from './guard/consult-client.guard';
import { LoginClientGuard } from './guard/login-client.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ UserInGuard ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [UserOutGuard],
    children: [
      {
        path: 'information',
        component: InformationComponent,
        canActivate: [UserOutGuard]
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'information'
      },
      {
        path: 'setting',
        component: SettingsComponent,
        canActivate: [UserOutGuard],
      },
      {
        path: 'catalogue/cars',
        component: CatalogueCarsComponent,
        canActivate: [UserOutGuard],
      },
      {
        path: 'catalogue/user',
        component: CatalogueUserComponent,
        canActivate: [UserOutGuard],
      },
      {
        path: 'catalogue/part',
        component: CataloguePartsComponent,
        canActivate: [UserOutGuard],
      },
      {
        path: '**',
        component: Error404Component
      }
    ]
  },
  {
    path: 'client/:clientUrl',
    component: ClientConsultComponent,
    canActivate: [ConsultClientGuard],
  },
  {
    path: 'login/client',
    component: LoginClientComponent,
    canActivate: [LoginClientGuard]
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
export class AppRoutingModule {}
