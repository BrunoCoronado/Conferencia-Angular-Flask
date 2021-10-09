import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministracionComponent } from './administracion/administracion.component';
import { AuthGuard } from './auth.guard';
import { ClienteComponent } from './cliente/cliente.component';
import { LoginComponent } from './login/login.component';
import { NoAuthGuard } from './no-auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: 'administracion', component: AdministracionComponent, canActivate: [AuthGuard], data: {rol_acceso: 1}},
  { path: 'cliente', component: ClienteComponent, canActivate: [AuthGuard], data: {rol_acceso: 2}},
  { path: '**', redirectTo: '/login', pathMatch: 'full'},
  { path: '', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
