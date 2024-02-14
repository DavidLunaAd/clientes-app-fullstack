import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from '../../services/cliente.service';
import localeEs from '@angular/common/locales/es';
import Swal from 'sweetalert2';
import { response } from 'express';
import { tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '../../services/detalle/modal.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit{

  clientes: Cliente[] = [];
  paginador: any;
  clienteSeleccionado!: Cliente;

  constructor(private clienteService: ClienteService, private modalService: ModalService,
    private activatedRoute: ActivatedRoute){

  }

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe( params =>{

      let page: number = +params.get('page')! | 0;
      // if(!page){
      //   page = 0;
      // }

      this.clienteService.getClientes(page).pipe(
        tap(response => {
          (response.content as Cliente[]).forEach(cliente =>{
            console.log(cliente.nombre)
          })
        })
      ).subscribe( response => {
        this.clientes = response.content as Cliente[];
        this.paginador = response;
      });
    });

    this.modalService.notificarUpload.subscribe(cliente =>{
        this.clientes = this.clientes.map(clienteOriginal => {
          if(cliente.id == clienteOriginal.id){
            clienteOriginal.foto = cliente.foto;
          }
          return clienteOriginal;
        })
    })
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

  abrirModal(cliente: Cliente){
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
  }
}
