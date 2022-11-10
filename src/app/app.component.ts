import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { fader, slider } from './animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    //fader,
    slider,
    //transformer,
    //stepper
  ]
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

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  async logout()
  {
    localStorage.removeItem("user");
    localStorage.removeItem("tipo");
    await this.r.navigateByUrl("/login");
  }

}


export function refresh()
{
  window.location.reload();
}