import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./main-layout/navbar/navbar";
declare var $:any;
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  
     private scrollHandler = this.onScroll.bind(this);
  private backToTopBtn!: HTMLElement;

  ngAfterViewInit(): void {
    this.backToTopBtn = document.getElementById('backToTop') as HTMLElement;

    window.addEventListener('scroll', this.scrollHandler);
    this.backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollHandler);
  }

  private onScroll(): void {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (scrollTop > 200) {
      this.backToTopBtn.classList.add('show');
    } else {
      this.backToTopBtn.classList.remove('show');
    }

    const progress = (scrollTop / docHeight) * 100;
    this.updateProgress(progress);
  }

  private updateProgress(percent: number): void {
    document.documentElement.style.setProperty('--progress', `${percent}%`);
  }
}
