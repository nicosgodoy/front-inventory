import { inject, Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  private keycloakService = inject(KeycloakService);

  getRoles():string[]{
    return this.keycloakService.getUserRoles();
  }

  isAdmin():boolean{
    let roles = this.keycloakService.getUserRoles().filter(role => role == 'admin');
   
    if(roles.length > 0){
      return true;
    }
    return false;
  }

  constructor() { }
}
