import { Component, inject, OnInit, ViewChild }  from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';
import { MatPaginator } from '@angular/material/paginator';
import { UtilService } from 'src/app/modules/shared/services/util.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  isAdmin: any;

  private categoryService = inject(CategoryService)
  private snackBar = inject(MatSnackBar);
  public dialogRef = inject(MatDialog);
  public dialog = inject(MatDialog);
  private util = inject(UtilService);
  ngOnInit(): void {
   this.getCategories();
   this.isAdmin = this.util.isAdmin();

  }

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource= new MatTableDataSource<CategoryElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getCategories() {
    this.categoryService.getCategories()
    .subscribe((data: any) =>{

     console.log("respuesta categories: ",data);
     this.processCategoryResponse(data);
    },(error:any) => {
      console.log("error: ",error);
    })
  }

  processCategoryResponse(resp: any){

    const dataCategory: CategoryElement[] = [];
    if(resp.metadata[0].code =="00"){
      let listCategory = resp.categoryResponse.category;
    listCategory.forEach((element: CategoryElement) => {
      dataCategory.push(element);
    });
    this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);
    this.dataSource.paginator = this.paginator;
    };
  }

openCategoryDiualog() {
 const dialogRef = this.dialog.open(NewCategoryComponent , {
      width: '450px'
     
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result ==1){
        this.openSnackBar('Categoria creada con exito', 'Exitosa')
        this.getCategories();
      }else if(result == 2){
        this.openSnackBar('Se produjo un error al guardar la categoria', 'Error')
       
      }
    });
  
}

edit(id:number,name:string,description: string){
  const dialogRef = this.dialog.open(NewCategoryComponent , {
    width: '450px',
     data: {id: id, name: name, description: description},
});
dialogRef.afterClosed().subscribe((result:any) => {

      if(result ==1){
        this.openSnackBar('Categoria Actualizada con exito', 'Exitosa')
        this.getCategories();
      }else if(result == 2){
        this.openSnackBar('Se produjo un error al Actualizar la categoria', 'Error')
        this.getCategories(); 
      }
    });
  }

delete(id: any){
   const dialogRef = this.dialog.open(ConfirmComponent , {
   
     data: {id: id, module: "category"},
});
dialogRef.afterClosed().subscribe((result:any) => {

      if(result ==1){
        this.openSnackBar('Categoria Eliminada', 'Exitosa')
        this.getCategories();
      }else if(result == 2){
        this.openSnackBar('Se produjo un error al Eliminar la categoria', 'Error')
        this.getCategories(); 
      }
    });
}

buscar(termino: string){

  if(termino.length === 0){
    return this.getCategories();
  }
  this.categoryService.getCategorieById(termino)
  .subscribe((data: any) =>{
   this.processCategoryResponse(data);
  },(error:any) => {
    console.log("error: ",error);
})}

openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar>{
  return this.snackBar.open(message, action, {  
    duration: 2000
  })
}

exportExcel(){
  this.categoryService.exportCategories()
  .subscribe({
    next: (data: Blob) => {
      try {
        const fileUrl = URL.createObjectURL(data);
        const anchor = document.createElement("a");
        anchor.download = "categorias.xlsx";
        anchor.href = fileUrl;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        URL.revokeObjectURL(fileUrl);
        
        this.openSnackBar('Archivo exportado correctamente', 'Exitosa');
      } catch (error) {
        console.error('Error al crear la descarga:', error);
        this.openSnackBar('Error al procesar el archivo', 'Error');
      }
    },
    error: (error: any) => {
      console.error('Error en la exportación:', error);
      this.openSnackBar('Error al exportar el archivo', 'Error');
    }
  });
}
}
export interface CategoryElement {
  id: number;
  name: string;
  description: string;
}
