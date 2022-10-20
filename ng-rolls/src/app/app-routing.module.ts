import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangeBathComponent } from './pages/change-bath/change-bath.component';
import { ChangeRollQuantityComponent } from './pages/change-roll-quantity/change-roll-quantity.component';

import { CreateBathComponent } from './pages/create-bath/create-bath.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BatchOfRollsComponent } from './pages/list-of-batches-of-rolls/batches-of-rolls/batch-of-rolls.component';
import { ListOfBatchesOfRollsComponent } from './pages/list-of-batches-of-rolls/list-of-batches-of-rolls.component';
import { ListOfCounterpartiesComponent } from './pages/list-of-counterparties/list-of-counterparties.component';
import { ListOfRollsComponent } from './pages/list-of-rolls/list-of-rolls.component';
import { LogsComponent } from './pages/logs-component/logs.component';
import { ReportThatRollIsUsedUpComponent } from './pages/report-that-roll-is-used-up/report-that-roll-is-used-up.component';
import { SpecifyStorageCellComponent } from './pages/specify-storage-cell/specify-storage-cell.component';
import { TransferringRollsToWorkshopComponent } from './pages/transferring-rolls-to-workshop/transferring-rolls-to-workshope.component';

const routes: Routes = [
  { path: "", component: HomePageComponent },
  { path: "create-bath", component: CreateBathComponent },
  { path: "change-bath/:id", component: ChangeBathComponent },
  {
    path: "list-of-batches-of-rolls", component: ListOfBatchesOfRollsComponent, children: [
      { path: ":id", component: BatchOfRollsComponent }],
  },
  { path: "specify-storage-cell", component: SpecifyStorageCellComponent },
  { path: "list-of-rolls", component: ListOfRollsComponent },
  { path: "transferring-rolls-to-workshop", component: TransferringRollsToWorkshopComponent },
  { path: "change-roll-quantity", component: ChangeRollQuantityComponent },
  { path: "report-that-roll-is-used-up", component: ReportThatRollIsUsedUpComponent },
  { path: "list-of-counterparties", component: ListOfCounterpartiesComponent },
  { path: "logs", component: LogsComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
