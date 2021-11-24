import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'clientes', loadChildren: () => import('./clientes/consultar/consultar.module').then(m => m.ConsultarModule) }, 
  { path: 'empleados', loadChildren: () => import('./empleados/consultar/consultar.module').then(m => m.ConsultarModule) },
  { path: 'crearCle', loadChildren: () => import('./clientes/crear/crear.module').then(m => m.CrearModule) },
  { path: 'editarCle/:x', loadChildren: () => import('./clientes/editar/editar.module').then(m => m.EditarModule) },
  { path: 'crearEmp', loadChildren: () => import('./empleados/crear/crear.module').then(m => m.CrearModule) },
  { path: 'editarEmp/:x', loadChildren: () => import('./empleados/editar/editar.module').then(m => m.EditarModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
