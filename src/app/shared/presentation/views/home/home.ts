import { Component } from '@angular/core';
import { AuthenticationSection } from '../../../../iam/presentation/components/authentication-section/authentication-section';
import {Toolbar} from '../../components/toolbar/toolbar';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AuthenticationSection,
    Toolbar,
    TranslatePipe
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
