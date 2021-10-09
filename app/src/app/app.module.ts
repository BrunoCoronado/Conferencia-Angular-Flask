import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule  } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdministracionComponent } from './administracion/administracion.component';
import { ClienteComponent } from './cliente/cliente.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ProductosComponent } from './productos/productos.component';

@NgModule({
  declarations: [
    AppComponent,
    AdministracionComponent,
    ClienteComponent,
    NavbarComponent,
    LoginComponent,
    ProductosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
