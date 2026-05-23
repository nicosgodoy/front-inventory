import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Chart } from 'chart.js';
import { ProductElement } from 'src/app/modules/product/product/product.component';
import { ProductService } from 'src/app/modules/shared/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  chartBar: any;
  chartDoughnut: any;

  private productService = inject(ProductService)

  ngOnInit(): void {
    this.getProducts();
  }

   getProducts(){
        this.productService.getProducts().subscribe({
         next: (resp:any) => {
          console.log("respuesta de productos: ",resp);
          this.processProductResponse(resp);
        },error: (error:any) => {
          console.log("error en productos: ",error);
        }
        });
      }
  
      processProductResponse(resp: any){
       
        const nameProduct:String[] = [];
        const account:number [] = [];

        // arreglos de colores dinámicos
        const backgroundColors: string[] = [];
        const borderColors: string[] = [];

        if(resp && resp.metadata && resp.metadata[0].code == "00"){
          let listProduct = resp.productResponse.products;
  
        listProduct.forEach((element: ProductElement,index: number) => {
          nameProduct.push(element.name);
          account.push(element.account);


      // Generación automática de colores
      const hue = (index * 50) % 360;

      backgroundColors.push(
        `hsla(${hue}, 70%, 60%, 0.5)`
      );

      borderColors.push(
        `hsla(${hue}, 70%, 40%, 1)`
      );

        });
        //nuestro grafico de barras
        this.chartBar = new Chart('canvas-bar', {
          type:'bar',
          data: {
            labels: nameProduct,
            datasets: [{
  label: 'Productos',
  data: account,
  backgroundColor: backgroundColors,
  borderColor: borderColors,
  borderWidth: 1
}]
          }
        })

        //grafico de doughnut

         this.chartDoughnut = new Chart('canvas-doughnut', {
          type:'doughnut',
          data: {
            labels: nameProduct,
            datasets: [{
  label: 'Productos',
  data: account,
  backgroundColor: backgroundColors,
  borderColor: borderColors,
  borderWidth: 1
}]
          }
        })
       
      }
    }

}
