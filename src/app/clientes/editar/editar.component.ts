import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

declare const Swal: any;

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

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

  constructor(private rou:Router, private rouvar: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.crearCle.identificacionCle = this.rouvar.snapshot.params["x"];

    this.http.get("http://localhost:8082/clientes/consulta/" + this.crearCle.identificacionCle, { responseType: "json" })
      .subscribe((consulta: any) => {
        console.log(consulta);

        this.crearCle.identificacionCle = consulta.identificacionCle;
        this.crearCle.nombresCle = consulta.nombresCle;
        this.crearCle.apellidosCle = consulta.apellidosCle;
        this.crearCle.celularCle = consulta.celularCle;
        this.crearCle.direccionCle = consulta.direccionCle;
        this.crearCle.emailCle = consulta.emailCle;
        this.crearCle.fechaRegistroCle = consulta.fechaRegistroCle;
        this.crearCle.contrasenaCle = consulta.contrasenaCle;
      });
  }

  actualizarCle() {

    this.http.put("http://localhost:8082/clientes/actualizar/" + this.crearCle.identificacionCle, this.crearCle)
      .subscribe((consulta: any) => {
        console.log(consulta);
        this.rou.navigate(["/clientes"])
        //alert("El cliente ha sido actualizado satisfactoriamente");
        Swal.fire({
          icon: 'success',
          title: 'Atención!!!',
          text: 'El cliente ha sido actualizado satisfactoriamente!',
          timer: 3000
        })
        
      });

  }

}
