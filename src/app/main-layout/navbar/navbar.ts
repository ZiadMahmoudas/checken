import { Component, ElementRef, HostListener, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive,CommonModule,FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
    standalone:true,
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('slideFromTop', [
      state(
        'closed',
        style({
          transform: 'translateY(-100%)', // Start off-screen at the top
        })
      ),
      state(
        'open',
        style({
          transform: 'translateY(0%)', // End at its normal position
        })
      ),
      transition('closed => open', [
        animate('300ms ease-out'), // Smoothly slide down
      ]),
      transition('open => closed', [
        animate('250ms ease-in'), // Smoothly slide up
      ]),
    ]),
    trigger('slideSubmenu', [
      state(
        'closed',
        style({
          height: '0',
          paddingTop: '0',
          paddingBottom: '0',
          overflow: 'hidden', // مهم جداً لإخفاء المحتوى الزائد
        })
      ),
      state(
        'open',
        style({
          height: '*', // يجعل الارتفاع يتغير ديناميكيًا بناءً على المحتوى
          paddingTop: '0',
          paddingBottom: '0',
          overflow: 'visible',
        })
      ),
      transition('closed <=> open', [animate('300ms ease-in-out')]),
    ]),
    trigger('fadeAndScale', [
      state(
        'closed',
        style({
          opacity: 0,
          transform: 'scale(0.9)',
          visibility: 'hidden',
        })
      ),
      state(
        'open',
        style({
          opacity: 1,
          transform: 'scale(1)',
          visibility: 'visible',
        })
      ),
      transition('closed <=> open', [
        animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)'),
      ]),
    ]),
  ],
  
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
    searchTerm: string = '';
  filteredResults: { name: string; url: string }[] = [];
  predefinedKeywords = [
    { name: 'DEFENCE', url: '/defence' },
    { name: 'MINING', url: '/mining' },
    { name: 'MARINE', url: '/marine' },
    { name: 'PROJECTS', url: '/projects' },
  ];

  selectedIndex: number = -1;
  isSearchPopupOpen: boolean = false;

  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(private router: Router, private elementRef: ElementRef) {}

  toggleSearchPopup(): void {
    this.isSearchPopupOpen = !this.isSearchPopupOpen;

    if (this.isSearchPopupOpen) {
      this.searchTerm = '';
      this.filteredResults = [];
      this.selectedIndex = -1;

      setTimeout(() => {
        this.searchInput.nativeElement.focus();
      }, 0);
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapePress(event: any): void {
    if (this.isSearchPopupOpen) {
      this.isSearchPopupOpen = false;
    }
  }

  filterResults(): void {
    if (this.searchTerm.length > 0) {
      this.filteredResults = this.predefinedKeywords.filter((keyword) =>
        keyword.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredResults = [];
    }
    this.selectedIndex = -1; // Reset selection index when filtering
  }

  navigateResults(event: any, direction: 1 | -1): void {
    event.preventDefault();

    const totalResults = this.filteredResults.length;
    if (totalResults === 0) return;

    this.selectedIndex += direction;

    if (this.selectedIndex < 0) {
      this.selectedIndex = totalResults - 1;
    } else if (this.selectedIndex >= totalResults) {
      this.selectedIndex = 0;
    }
  }

  handleSearch(): void {
    let keywordToNavigate;

    // First, check if a result is selected via keyboard
    if (this.selectedIndex !== -1 && this.filteredResults.length > 0) {
      keywordToNavigate = this.filteredResults[this.selectedIndex];
    } else {
      // If not, find a direct match from the typed term
      keywordToNavigate = this.predefinedKeywords.find(
        (keyword) => keyword.name.toLowerCase() === this.searchTerm.toLowerCase()
      );
    }

    this.toggleSearchPopup();

    if (keywordToNavigate) {
      this.router.navigate([keywordToNavigate.url]);
    } else {
      this.router.navigate(['/page-not-found']);
    }

    // Reset selected index after navigation
    this.selectedIndex = -1;
  }

  selectResult(): void {
    this.toggleSearchPopup();
  }

  // To close the popup when clicking outside it
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedInsideSearchPopup = this.elementRef.nativeElement.querySelector('.search-popup-content')?.contains(event.target as Node);
    const clickedInsideSearchBox = this.elementRef.nativeElement.querySelector('.search-box')?.contains(event.target as Node);
    
    if (this.isSearchPopupOpen && !clickedInsideSearchPopup && !clickedInsideSearchBox) {
      this.toggleSearchPopup();
    }
  }
}
