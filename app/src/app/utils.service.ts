import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private SESSION_COOKIE = 'sesion'

  private loading = Swal.mixin({
    allowOutsideClick: false,
    allowEscapeKey: false, 
    allowEnterKey: false,
    onBeforeOpen: () => {
      Swal.showLoading()
    }
  })

  private toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })


  constructor(private cookieService: CookieService) { }

  guardarSesion(data){
    this.cookieService.set(this.SESSION_COOKIE, data, 1, '/')
  }

  obtenerSesion(){
    if(this.cookieService.check(this.SESSION_COOKIE)){
      return this.cookieService.get(this.SESSION_COOKIE)
    }
    return undefined
  }

  eliminarSesion(){
    this.cookieService.delete(this.SESSION_COOKIE, '/')
  }

  mostrarLoading(){
    this.loading.fire()
  }

  ocultarLoading(){
    this.loading.close()
  }

  mostrarError(mensaje: string){
    this.toast.fire({
      icon: 'error',
      title: mensaje
    })
  }

  mostrarExito(mensaje: any){
    this.toast.fire({
      icon: 'success',
      title: mensaje
    })
  }

}
