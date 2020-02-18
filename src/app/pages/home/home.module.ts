import { UserService } from './../../services/user/user.service';
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
import { UserComponent, DialogUserComponent } from '../../components/user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MAT_CHECKBOX_CLICK_ACTION } from '@angular/material/checkbox';
import { SuccessComponent } from '../../components/success/success.component';
import { ErrorComponent } from '../../components/error/error.component';
import { DeleteComponent } from '../../components/delete/delete.component';

@NgModule({
  declarations: [
    CatalogueCarsComponent,
    CataloguePartsComponent,
    InformationComponent,
    SettingsComponent,
    CatalogueUserComponent,
    UserComponent,
    DialogUserComponent,
    SuccessComponent,
    ErrorComponent,
    DeleteComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HomeRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    DialogUserComponent,
    SuccessComponent,
    ErrorComponent,
    DeleteComponent,
  ],
  providers: [
    {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check'},
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    UserService
  ],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
