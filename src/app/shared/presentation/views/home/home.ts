import { Component } from '@angular/core';
import {Toolbar} from '../../components/toolbar/toolbar';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    Toolbar,
    TranslatePipe
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
