import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from '../utils.service';
import { WebService } from '../web.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: any
  password: any

  constructor(private utils: UtilsService, private web: WebService, private router: Router) { }

  ngOnInit(): void {
  }

  async iniciarSesion(){
    if(!this.usuario){
      this.utils.mostrarError('Debe ingresar un usuario')
      return
    }
    if(!this.password){
      this.utils.mostrarError('Debe ingresar un password')
      return
    }

    let data = {
      usuario: this.usuario,
      password: this.password
    }

    try {
      this.utils.mostrarLoading()
      const response: any = await this.web.login(data)
      this.utils.ocultarLoading()
      if(response.status != 200){
        this.utils.mostrarError(response.mensaje)
        return
      }

      this.utils.mostrarExito(response.mensaje)
      this.utils.guardarSesion(response.rol)

      if(response.rol == 1) this.router.navigate(['/administracion']);
      if(response.rol == 2) this.router.navigate(['/cliente']);

    } catch (error) {}
  }

}
