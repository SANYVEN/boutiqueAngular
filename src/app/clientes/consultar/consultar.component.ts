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

  infoConsultaCle: any;

  constructor(private rou: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.listar();
    setTimeout(function () {
      $('#idClientes').DataTable();
    }, 500)

  }

  listar(): void {

    this.http.get("http://localhost:8082/clientes/consulta", { responseType: "json" })
      .subscribe((consulta: any) => {
        console.log(consulta);
        this.infoConsultaCle = consulta;
      });

  }

  eliminarCle(c: any): void {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Borrar el cliente',
      text: "Esta seguro de elimnar el registro del cliente!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, deseo eliminarlo!',
      cancelButtonText: 'No, No deseo eliminarlo!',
      reverseButtons: true
    }).then((result: any) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'ELIMINADO!',
          'EL registro del cliente ha sido eliminado satisfactoriamente',
          'success'
        )
        this.http.delete("http://localhost:8082/clientes/eliminar/" + c)
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

  formEditar(c: any): void {
    this.rou.navigate(["/editarCle", c])

  }






}
