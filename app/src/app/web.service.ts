import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  private PROTOCOLO = 'http://'
  private HOST = 'localhost:3000'
  private PATH_RAIZ = ''

  constructor(private http: HttpClient) { }

  async login(data){
    return this.http.post(`${this.PROTOCOLO}${this.HOST}${this.PATH_RAIZ}/login`, data).toPromise();
  }

  async getProductos(){
    return this.http.get(`${this.PROTOCOLO}${this.HOST}${this.PATH_RAIZ}/productos`).toPromise();
  }

  async postProducto(data){
    return this.http.post(`${this.PROTOCOLO}${this.HOST}${this.PATH_RAIZ}/producto`, data).toPromise();
  }

}
