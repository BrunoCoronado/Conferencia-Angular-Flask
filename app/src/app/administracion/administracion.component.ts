import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UtilsService } from '../utils.service';
import { WebService } from '../web.service';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {

  productos: any = []
  producto: any = {
    nombre: undefined,
    precio: undefined,
    imagen: undefined
  }

  constructor(private utils: UtilsService, private web: WebService, private sanitizer: DomSanitizer) { }

  async ngOnInit(): Promise<void> {
    await this.cargarProductos()
  }

  async cargarProductos(){
    try {
      this.utils.mostrarLoading()
      const response: any = await this.web.getProductos()
      if(response.status != 200){
        this.utils.mostrarError(response.mensaje)
        return
      }
      this.productos = response.productos
      for (let i = 0; i < this.productos.length; i++) {
        this.productos[i].img = this.sanitizer.bypassSecurityTrustResourceUrl(this.productos[i].imagen);  
      }
      this.utils.ocultarLoading()    
    } catch (error) {
    }
  }

  onUploadChange(event: any) {
    if(!event.srcElement.files[0].name.endsWith(".jpg")){
      (<HTMLInputElement>document.getElementById(`imagen`)).value = ""
      this.utils.mostrarError('Archivo invalido. Debe ser .jpg!')
      return
    }

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
        let match =  reader.result.toString().match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        // this.producto.imagen = match[2]
        this.producto.imagen = reader.result.toString()
    };
  }

  async ingresarProducto(){
    if(!this.producto.nombre){
      this.utils.mostrarError('Debe ingresar un nombre de producto')
      return
    }
    if(!this.producto.precio){
      this.utils.mostrarError('Debe ingresar un precio de producto')
      return
    }
    if(!this.producto.imagen){
      this.utils.mostrarError('Debe cargar una imagen de producto')
      return
    }

    try {
      this.utils.mostrarLoading()
      const response: any = await this.web.postProducto(this.producto)
      this.utils.ocultarLoading()
      await this.cargarProductos()
      if(response.status == 200){
        (<HTMLInputElement>document.getElementById(`imagen`)).value = ""
        this.utils.mostrarExito(response.mensaje)
        this.producto = {
          nombre: undefined,
          precio: undefined,
          imagen: undefined
        }
        return
      }
      this.utils.mostrarError(response.mensaje)
    } catch (error) {}
  }

}
