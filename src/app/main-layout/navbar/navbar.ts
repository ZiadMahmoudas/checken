import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  showDropdown: boolean = false;
  showMobileMenu: boolean = false;
  showMobileDropdown: boolean = false;

toggleMobileMenu(): void {
  this.showMobileMenu = !this.showMobileMenu;

  const toggleBtn = document.querySelector('.menu-toggle');
  if (toggleBtn) {
    if (this.showMobileMenu) {
      toggleBtn.classList.add('open'); 
    } else {
      toggleBtn.classList.remove('open');
    }
  }
}

  toggleMobileDropdown(): void {
    this.showMobileDropdown = !this.showMobileDropdown;
  }
  @HostListener('document:keydown', ['$event'])
  handleEscape(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.showMobileMenu) {
      this.showMobileMenu = false;
      const toggleBtn = document.querySelector('.menu-toggle');
      if (toggleBtn) toggleBtn.classList.remove('open');
    }
  }
    @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent) {
    const width = (event.target as Window).innerWidth;
    if (width >= 768 && this.showMobileMenu) {
      this.closeMobileMenu(); 
    }
  }
  closeMobileMenu(): void {
  this.showMobileMenu = false;
  const toggleBtn = document.querySelector('.menu-toggle');
  if (toggleBtn) toggleBtn.classList.remove('open');
}
}
