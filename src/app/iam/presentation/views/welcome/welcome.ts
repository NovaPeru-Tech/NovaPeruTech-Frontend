import { Component } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {LanguageSwitcher} from '../../../../shared/presentation/components/language-switcher/language-switcher';
import { AuthenticationSection } from '../../components/authentication-section/authentication-section';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    MatToolbar,
    LanguageSwitcher,
    AuthenticationSection
  ],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css'
})
export class Welcome {

}
