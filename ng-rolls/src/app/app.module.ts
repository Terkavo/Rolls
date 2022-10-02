import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { MyInputModule } from '@terka/my-lib'

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorizationComponent } from './authorization/authorization-module/authorization.component';
import { PrinterComponent } from './printer/printer/printer.component';
import { HttpService } from './http/http.service';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ListOfBatchesOfRollsComponent } from './pages/list-of-batches-of-rolls/list-of-batches-of-rolls.component';
import { BatchOfRollsComponent } from './pages/list-of-batches-of-rolls/batches-of-rolls/batch-of-rolls.component';
import { PrintingTagsForBatchComponent } from './printer/components/printing-tags-for-batch/printing-tags-for-batch.component';
import { QrComponent } from './html-elements/qr/qr.component';
import { ListOfRollsComponent } from './pages/list-of-rolls/list-of-rolls.component';
import { SpecifyStorageCellComponent } from './pages/specify-storage-cell/specify-storage-cell.component';
import { RollOnListComponent } from './pages/list-of-rolls/roll-on-list/roll-on-list.component';
import { RoolLoaderComponent } from './html-elements/rool/rool-loader.component';
import { TransferringRollsToWorkshopComponent } from './pages/transferring-rolls-to-workshop/transferring-rolls-to-workshope.component';
import { ReportThatRollIsUsedUpComponent } from './pages/report-that-roll-is-used-up/report-that-roll-is-used-up.component';
import { HtmlForDirective } from './Directive/html-for.directive';
import { ListOfCounterpartiesComponent } from './pages/list-of-counterparties/list-of-counterparties.component';
import { LogsComponent } from './pages/logs-component/logs.component';
import { CreateBathComponent } from './pages/create-bath/create-bath.component';
import { ChangeBathComponent } from './pages/change-bath/change-bath.component';
import { EditingBathComponent } from './html-elements/editing-bath/editing-bath.component';
import { RollComponent } from './html-elements/editing-bath/roll/roll.component';
import { PrintingTagsForRollComponent } from './printer/components/printing-tags-for-roll/printing-tags-for-roll.component';
import { ChangeRollQuantityComponent } from './pages/change-roll-quantity/change-roll-quantity.component';



@NgModule({
  declarations: [
    QrComponent,
    HomePageComponent,
    AppComponent,
    AuthorizationComponent,
    PrinterComponent,
    ListOfBatchesOfRollsComponent,
    BatchOfRollsComponent,
    PrintingTagsForBatchComponent,
    ListOfRollsComponent,
    SpecifyStorageCellComponent,
    RollOnListComponent,
    RoolLoaderComponent,
    TransferringRollsToWorkshopComponent,
    ReportThatRollIsUsedUpComponent,
    HtmlForDirective,
    ListOfCounterpartiesComponent,
    LogsComponent,
    CreateBathComponent,
    ChangeBathComponent,
    EditingBathComponent,
    RollComponent,
    PrintingTagsForRollComponent,
    ChangeRollQuantityComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    MyInputModule,
    //materialce
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [HttpService,{ provide: MAT_DATE_LOCALE, useValue: 'ru-Ru' }],
  bootstrap: [AppComponent]
})
export class AppModule { }