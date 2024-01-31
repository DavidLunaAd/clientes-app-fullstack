import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet, provideRouter } from '@angular/router';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrl: './directiva.component.css'
})
export class DirectivaComponent {

  listaCurso: string[] =['Typescript', 'Javascript', 'Java SE', 'C#', 'PHP'];
  habilitar: boolean = true;

  setHabilitar(): void{
    this.habilitar = this.habilitar = (this.habilitar==true)? false : true;
  }



}
