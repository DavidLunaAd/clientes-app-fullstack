import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() paginador: any;
  paginas: number[] = [];
  desde: number = 0;
  hasta: number = 0;

  constructor(){}


  ngOnInit(){
    this.initPaginator();
  }

  ngOnChanges(changes: SimpleChanges): void {
   let paginadorActualizdo = changes['paginador'];

   if(paginadorActualizdo.previousValue){
    this.initPaginator();
   }
  }

  private initPaginator(): void{
     //Para mostrar entre rango 1-6 o 7-11, etc
     this.desde = Math.min( Math.max(1, this.paginador.number-4), this.paginador.totalPages-5);
     this.hasta = Math.max( Math.min( this.paginador.totalPages, this.paginador.number+4), 6 )
     if(this.paginador.totalPages>5){
       this.paginas = new Array(this.hasta - this.desde +1).fill(0).map((valor, indice) => indice + this.desde);
     }else{
     this.paginas = new Array(this.paginador.totalPages).fill(0).map((valor, indice) => indice + 1);
     }

  }


}
