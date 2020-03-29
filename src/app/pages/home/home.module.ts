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
import { FactoryComponent } from '../../components/factory/factory.component';
import { FactoryDialogComponent } from '../../components/factory-dialog/factory-dialog.component';
import { VehicleComponent } from '../../components/vehicle/vehicle.component';
import { VehicleDialogComponent } from '../../components/vehicle-dialog/vehicle-dialog.component';
import { FactoryService } from '../../services/factory/factory.service';
import { VehiclesService } from '../../services/vehicles/vehicles.service';
import { ClientComponent } from '../../components/client/client.component';
import { ClientDialogComponent } from '../../components/client-dialog/client-dialog.component';
import { ClientService } from '../../services/client/client.service';
import { DialogService } from '../../services/dialog/dialog.service';
import { PartService } from '../../services/part/part.service';
import { PartComponent } from '../../components/part/part.component';
import { PartDialogComponent } from '../../components/part-dialog/part-dialog.component';
import { PartVehicleDialogComponent } from '../../components/part-vehicle-dialog/part-vehicle-dialog.component';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { SalesComponent } from '../../components/sales/sales.component';

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
    FactoryComponent,
    FactoryDialogComponent,
    VehicleComponent,
    VehicleDialogComponent,
    ClientComponent,
    ClientDialogComponent,
    PartComponent,
    PartDialogComponent,
    PartVehicleDialogComponent,
    SalesComponent,
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
    FactoryDialogComponent,
    VehicleDialogComponent,
    ClientDialogComponent,
    PartDialogComponent,
    PartVehicleDialogComponent,
  ],
  providers: [
    { provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false } },
    { provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true } },
    {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check'},
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    UserService,
    FactoryService,
    VehiclesService,
    ClientService,
    DialogService,
    PartService
  ],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
