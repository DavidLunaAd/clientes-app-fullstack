import { Component } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from '../../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent {

  public titulo: string = "Crear Cliente";
  public cliente: Cliente = new Cliente();

  constructor(private clienteService: ClienteService,
      private router: Router,
      private activatedRoute: ActivatedRoute){}

      ngOnInit(){
        this.cargarCliente();
      }

   cargarCliente(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe( (cliente) => this.cliente = cliente)
      }
    })

   }

  public create(): void {
    this.clienteService.create(this.cliente).subscribe(
      response => {
      this.router.navigate(['/clientes'])
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Cliente${this.cliente.nombre} creado con exito`,
        showConfirmButton: false,
        timer: 1500
      });
    }
    )
  }

  update(): void{
    this.clienteService.update(this.cliente)
    .subscribe( cliente => {
      this.router.navigate(['/clientes'])
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Cliente ${cliente.nombre} actualizado con éxito!`,
        showConfirmButton: false,
        timer: 1500
      });
    })
  }

}
