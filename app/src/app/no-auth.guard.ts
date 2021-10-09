import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(private router: Router, private utils: UtilsService) {
        
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    try {
      let rol: any = this.utils.obtenerSesion()
      if(rol == 1){
        this.router.navigate(['/administracion']);
        return false
      }
      if(rol == 2){
        this.router.navigate(['/cliente']);
        return false
      }
      return true
    } catch (error) {
      return true
    }
  }
  
}
