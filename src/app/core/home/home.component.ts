import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'handy-app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(
    Breakpoints.Handset).pipe(map(result => result.matches));

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  public timeOfDay(): string {
    const hour = new Date().getHours();
    if (hour >= 4 && hour <= 11) { return 'Buenos días'; }
    if (hour >= 12 && hour <= 16) { return 'Buenas tardes'; }
    if (hour >= 17 && hour <= 20) {return 'Buenas noches'; }
    if (hour >= 21 || hour <= 3) {return 'Buenas noches'; }
  }

  public redirect(url: string): void {
    this.router.navigate([`./home/${url}`]);
  }
}
