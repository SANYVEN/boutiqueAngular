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

  crearEmp: any = {
      anotacionesEmp: "",
      apellidosEmp: "",
      areaEmp: "",
      cargoEmp: "",
      celularEmp: "",
      contrasenaEmp: "",
      direccionEmp: "",
      emailEmp: "",
      fechaContratoEmp: "",
      fechaNacimientoEmp: "",
      identificacionEmp: "",
      nombresEmp: "",
      numeroContratoEmp: "",
      permisosEmp: ""    
  }

  constructor(private rou: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  guardarEmp(): void {

    this.http.post("http://localhost:8082/empleados/registrar", this.crearEmp)
      .subscribe((consulta: any) => {
        console.log(consulta);
       // alert("El empleado ha sido guardado");

        Swal.fire({
          icon: 'success',
          title: 'Atención!!!',
          text: 'El empleado ha sido guardado satisfactoriamente!',
          timer: 3000
        })

        this.rou.navigate(["/empleados"])
      });

  }


}
