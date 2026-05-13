import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

private productService = inject(ProductService);

  ngOnInit(): void {
    this.getProducts();
  }
  
  displayedColumns: string[] = ['id', 'name', 'price', 'account', 'category', 'picture', 'actions'];
    dataSource= new MatTableDataSource<ProductElement>();
  
    @ViewChild(MatPaginator)
    paginator!: MatPaginator;

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
      const dateProduct: ProductElement[] = [];
      if(resp && resp.metadata && resp.metadata[0].code == "00"){
      //if(resp && resp.metadata && resp.metadata[0].code == "00" && resp.product && resp.product.products){
        let listProduct = resp.productResponse.products;

      listProduct.forEach((element: ProductElement) => {
        element.category = element.category.name;
        element.picture = 'data:image/jpeg;base64,'  +element.picture;
        dateProduct.push(element);
      });
      //set the dataSource
      this.dataSource = new MatTableDataSource<ProductElement>(dateProduct);
      this.dataSource.paginator = this.paginator;
    }else{
      console.log("Respuesta invalida")
    }
     
    }

}

export interface ProductElement {
  id: number;
  name: string;
  price: number;
  account: number;
 category: any;
 picture: any;
}
