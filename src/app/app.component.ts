import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientTableComponent } from './components/client-table/client-table.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'app-alianza';
}
