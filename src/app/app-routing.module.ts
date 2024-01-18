import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { PendingComponent } from './pending/pending.component';
import { AllComponent } from './all/all.component';
import { CompletedComponent } from './completed/completed.component';

const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' }, // redirect to `first-component`
  { path: 'home', component: HomeComponent, children:[
    {path: 'all', component:AllComponent},
    {path: 'pending', component:PendingComponent},
    {path: 'completed', component:CompletedComponent},
  ] },
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
