import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private utils: UtilsService) {
        
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    try {
      if(route.data.rol_acceso == this.utils.obtenerSesion()){
        return true
      }
      this.router.navigate(['/login']);
      return false
    } catch (error) {
      this.router.navigate(['/login']);
      return false
    }
  }
  
}
