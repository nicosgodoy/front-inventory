import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  getCategories() {
    const endpoint=`${this.apiUrl}/categories`;
    return this.http.get(endpoint);
  }
/**
 * save the category
 */
saveCategories(body:any){
  const endpoint = `${this.apiUrl}/categories`;
  return this.http.post(endpoint,body); 
}

/**
 * update categories
 */
updateCategorie(body:any,id:any){
  const endpoint = `${this.apiUrl}/categories/${id}`;
  return this.http.put(endpoint,body); 
}

deleteCategorie(id:any){
  const endpoint = `${this.apiUrl}/categories/${id}`;
  return this.http.delete(endpoint); 
}

getCategorieById(id:any){
  const endpoint = `${this.apiUrl}/categories/${id}`;
  return this.http.get(endpoint); 
}


}