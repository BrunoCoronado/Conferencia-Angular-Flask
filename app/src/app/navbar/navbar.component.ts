import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public utils: UtilsService, private router: Router) { }

  ngOnInit(): void {
  }

  cerrarSesion(){
    this.utils.eliminarSesion()
    this.router.navigate(['/login']);
  }

}
