import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

declare const Swal: any;

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})

export class CrearComponent implements OnInit {

  crearCle: any = {
    identificacionCle: "",
    nombresCle: "",
    apellidosCle: "",
    celularCle: "",
    direccionCle: "",
    emailCle: "",
    fechaRegistroCle: "",
    contrasenaCle: ""
  }

  constructor(private rou: Router, private http: HttpClient) { }

  ngOnInit(): void {

  }

  guardarCle(): void {

    this.http.post("http://localhost:8082/clientes/registrar", this.crearCle)
      .subscribe((consulta: any) => {
        console.log(consulta);
       // alert("El cliente ha sido guardado");

        Swal.fire({
          icon: 'success',
          title: 'Atención!!!',
          text: 'El cliente ha sido guardado satisfactoriamente!',
          timer: 3000
        })

        this.rou.navigate(["/clientes"])
      });

  }

}
