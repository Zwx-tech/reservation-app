import { inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeServiceService {
  //* inject dom document element
  document = inject(DOCUMENT);

  switchTheme(theme: string) {
    let themeLink = this.document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;

    if (themeLink) {
      themeLink.href = theme + '.css';
    }
  }
}
