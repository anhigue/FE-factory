import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material-module';
import { CatalogueCarsComponent } from './catalogue-cars/catalogue-cars.component';
import { CataloguePartsComponent } from './catalogue-parts/catalogue-parts.component';
import { InformationComponent } from './information/information.component';
import { SettingsComponent } from './settings/settings.component';
import { CatalogueUserComponent } from './catalogue-user/catalogue-user.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing/home-routing.module';

@NgModule({
  declarations: [
    CatalogueCarsComponent,
    CataloguePartsComponent,
    InformationComponent,
    SettingsComponent,
    CatalogueUserComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HomeRoutingModule,
    MaterialModule
  ],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
