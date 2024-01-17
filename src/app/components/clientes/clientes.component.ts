import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from '../../services/cliente.service';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';
import { response } from 'express';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit{

  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService){

  }

  ngOnInit(){

    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
    );
  }

  delete(cliente: Cliente): void{

    Swal.fire({
      title: "Está seguro?",
      text: `Seguro que desea eliminar al cliente ${cliente.nombre}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borralo!",
      cancelButtonText:"No, cancela",
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe(
          response =>{
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            Swal.fire({
              title: "Ha sido borrado!",
              text: `El cliente ${cliente.nombre}ha sido borrado`,
              icon: "success"
            });
          }
        )

      }
    });
  }
}
