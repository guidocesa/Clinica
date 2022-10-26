import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Clinica';

  loggedin:boolean = false;
  tipo : string | null | undefined;
  constructor(private r:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('user') != null)
    {
      this.loggedin = true;
      this.tipo = localStorage.getItem('tipo');
    }
    
  }

  logout()
  {
    localStorage.removeItem("user");
    localStorage.removeItem("tipo");
    window.location.reload();
    this.r.navigateByUrl("/login");
  }

}


export function refresh()
{
  window.location.reload();
}