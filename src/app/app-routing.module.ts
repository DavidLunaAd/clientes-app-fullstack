import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { DirectivaComponent } from './components/directiva/directiva.component';
import { HeaderComponent } from './components/header/header.component';
import { FormComponent } from './components/clientes/form.component';

const routes:Routes = [
  {path: '', redirectTo:'/clientes', pathMatch: 'full'},
  {path: 'clientes', component: ClientesComponent},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'header', component: HeaderComponent},
  {path: 'clientes/form', component: FormComponent},
  {path: 'clientes/form/:id', component: FormComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
