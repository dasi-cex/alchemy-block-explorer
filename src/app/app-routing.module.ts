import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlockDetailsComponent } from './block-details/block-details.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddressDetailsComponent } from './address-details/address-details.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
  { path: 'block', redirectTo: 'block/', pathMatch: 'full'},
  { path: 'block/:blockNumber', component: BlockDetailsComponent },
  { path: 'address/:address', component: AddressDetailsComponent },
  { path: 'transaction/:transaction', component: TransactionDetailsComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: '**', redirectTo: '/dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
