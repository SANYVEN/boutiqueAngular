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

  constructor(private rou:Router, private rouvar: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {

    this.crearEmp.identificacionEmp = this.rouvar.snapshot.params["x"];
    this.http.get("http://localhost:8082/empleados/consulta/" + this.crearEmp.identificacionEmp, { responseType: "json" })
      .subscribe((consulta: any) => {
        console.log(consulta);

        this.crearEmp.identificacionEmp = consulta.identificacionEmp;
        this.crearEmp.nombresEmp = consulta.nombresEmp;
        this.crearEmp.apellidosEmp = consulta.apellidosEmp;
        this.crearEmp.celularEmp = consulta.celularEmp;
        this.crearEmp.direccionEmp = consulta.direccionEmp;
        this.crearEmp.emailEmp = consulta.emailEmp;
        this.crearEmp.fechaContratoEmp = consulta.fechaContratoEmp;
        this.crearEmp.contrasenaEmp = consulta.contrasenaEmp;
        this.crearEmp.anotacionesEmp = consulta.anotacionesEmp;
        this.crearEmp.areaEmp = consulta.areaEmp;
        this.crearEmp.cargoEmp = consulta.cargoEmp;
        this.crearEmp.fechaNacimientoEmp = consulta.fechaNacimientoEmp;
        this.crearEmp.numeroContratoEmp = consulta.numeroContratoEmp;
        this.crearEmp.permisosEmp = consulta.permisosEmp;
      });
  }

  actualizarEmp() {

    this.http.put("http://localhost:8082/empleados/actualizar/" + this.crearEmp.identificacionEmp, this.crearEmp)
      .subscribe((consulta: any) => {
        console.log(consulta);
        this.rou.navigate(["/empleados"]);
        //alert("El empleado ha sido actualizado satisfactoriamente");

        Swal.fire({
          icon: 'success',
          title: 'Atención!!!',
          text: 'El empleado ha sido actualizado satisfactoriamente!',
          timer: 3000
        })

        
      });

  }
  

}
