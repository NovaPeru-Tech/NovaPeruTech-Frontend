import { Component } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {LanguageSwitcher} from '../../components/language-switcher/language-switcher';
import { AuthenticationSection } from '../../../../iam/presentation/components/authentication-section/authentication-section';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatToolbar,
    LanguageSwitcher,
    AuthenticationSection
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
