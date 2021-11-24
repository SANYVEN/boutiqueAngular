import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

declare const $: any;
declare const Swal: any;

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {

  infoConsultaEmp: any;

  constructor(private rou: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.listar();
    setTimeout(function () {
      $('#idEmpleados').DataTable();
    }, 500)

  }

  listar(): void {

    this.http.get("http://localhost:8082/empleados/consulta", { responseType: "json" })
      .subscribe((consultaEmp: any) => {
        console.log(consultaEmp);
        this.infoConsultaEmp = consultaEmp;
      })

  }

  eliminarEmp(c: any): void {



    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Borrar el empleado',
      text: "Esta seguro de elimnar el registro del empleado!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, deseo eliminarlo!',
      cancelButtonText: 'No, No deseo eliminarlo!',
      reverseButtons: true
    }).then((result: any) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'ELIMINADO!',
          'EL registro del empleado ha sido eliminado satisfactoriamente',
          'success'
        )
        this.http.delete("http://localhost:8082/empleados/eliminar/" + c)
          .subscribe((consulta: any) => {
            console.log(consulta);
            // alert(c + " será eliminado");
            this.listar();
          });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'NO HA SIDO ELIMINADO',
          'No fue eliminado el resgistro :)',
          'error'
        )
      }
    })


  }

  formEditarEmp(c: any): void {
    this.rou.navigate(["/editarEmp", c])

  }


}
