import { Component } from '@angular/core';
import { LanguageSwitcher} from "../language-switcher/language-switcher";
import { MatToolbar } from "@angular/material/toolbar";

@Component({
  selector: 'app-toolbar',
    imports: [
        LanguageSwitcher,
        MatToolbar
    ],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.css'
})
export class Toolbar {

}
