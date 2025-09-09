import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  {
    path: 'Home',
    loadComponent: () => import('./pages/home/home').then((c) => c.Home),
    title: 'الرئيسية',
    data: {
      description: 'مرحباً بك في الصفحة الرئيسية، استكشف جميع معلوماتنا هنا.',
      image: 'https://www.example.com/home-image.jpg'
    },
  },
  {
    path: 'About',
    loadComponent: () => import('./pages/about/about').then((c) => c.About),
    title: 'عن الموقع',
    data: {
      description: 'تعرف على تفاصيل الموقع وأهدافه في هذه الصفحة.',
      image: 'https://www.example.com/about-image.jpg'
    },
  },
];
