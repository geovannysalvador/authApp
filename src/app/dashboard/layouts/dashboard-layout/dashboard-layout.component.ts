import { Component, computed, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {

  private authService = inject(AuthService);

  // Forma computada mas usada
  public user = computed( () => this.authService.currentUser() );

  // Forma dos de hacerlo
  // get user(){
  //   return this.authService.currentUser();
  // }

  onLougout(){
    this.authService.logout();
  }

}
