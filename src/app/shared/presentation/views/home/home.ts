import { Component } from '@angular/core';
import {Toolbar} from '../../components/toolbar/toolbar';
import {TranslatePipe} from '@ngx-translate/core';
import {
  AuthenticationSection
} from '../../../../iam/presentation/components/authentication-section/authentication-section';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    Toolbar,
    TranslatePipe,
    AuthenticationSection
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
