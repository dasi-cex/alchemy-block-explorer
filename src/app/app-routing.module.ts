import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlockDetailsComponent } from './block-details/block-details.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';

const routes: Routes = [
  { path: 'block', redirectTo: 'block/', pathMatch: 'full'},
  { path: 'block/:blockNumber', component: BlockDetailsComponent },
  { path: 'account', component: AccountDetailsComponent },
  { path: 'transaction', component: TransactionDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
