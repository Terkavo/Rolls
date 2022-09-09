import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatalistComponent } from './html-elements/datalist/datalist-companent/datalist.component';
import { DatalistItemComponent } from './html-elements/datalist/datalist-item/datalist-item.component';
import { HeaderComponent } from './html-elements/header/header.component';
import { AuthorizationComponent } from './authorization/authorization-module/authorization.component';
import { PrinterComponent } from './printer/printer/printer.component';
import { HttpService } from './http/http.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { OneTwoDesignComponent } from './html-elements/one-two-design/one-two-design.component';
import { ListOfBatchesOfRollsComponent } from './pages/list-of-batches-of-rolls/list-of-batches-of-rolls.component';
import { BatchOfRollsComponent } from './pages/list-of-batches-of-rolls/batches-of-rolls/batch-of-rolls.component';
import { PrintingTagsForBatchComponent } from './printer/components/printing-tags-for-batch/printing-tags-for-batch.component';
import { QrComponent } from './html-elements/qr/qr.component';
import { ListOfRollsComponent } from './pages/list-of-rolls/list-of-rolls.component';
import { SpecifyStorageCellComponent } from './pages/specify-storage-cell/specify-storage-cell.component';
import { QrScannerComponent } from './html-elements/qr-scanner/qr-scanner.component';
import { RollOnListComponent } from './pages/list-of-rolls/roll-on-list/roll-on-list.component';
import { RoolLoaderComponent } from './html-elements/rool/rool-loader.component';
import { TransferringRollsToWorkshopComponent } from './pages/transferring-rolls-to-workshop/transferring-rolls-to-workshope.component';
import { ReportThatRollIsUsedUpComponent } from './pages/report-that-roll-is-used-up/report-that-roll-is-used-up.component';
import { HtmlForDirective } from './Directive/html-for.directive';
import { ListOfCounterpartiesComponent } from './pages/list-of-counterparties/list-of-counterparties.component';
import { LogsComponent } from './pages/logs/logs.component';
import { CreateBathComponent } from './pages/create-bath/create-bath.component';
import { ChangeBathComponent } from './pages/change-bath/change-bath.component';
import { EditingBathComponent } from './html-elements/editing-bath/editing-bath.component';
import { RollComponent } from './html-elements/editing-bath/roll/roll.component';
import { MyRourerLinkDirective } from './Directive/my-rourer-link.directive';


@NgModule({
  declarations: [
    HomePageComponent,
    AppComponent,
    DatalistComponent,
    DatalistItemComponent,
    HeaderComponent,
    AuthorizationComponent,
    PrinterComponent,
    OneTwoDesignComponent,
    ListOfBatchesOfRollsComponent,
    BatchOfRollsComponent,
    PrintingTagsForBatchComponent,
    QrComponent,
    ListOfRollsComponent,
    SpecifyStorageCellComponent,
    QrScannerComponent,
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
    MyRourerLinkDirective
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
