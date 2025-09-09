import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  {
    path: 'Home',
    loadComponent: () => import('./pages/home/home').then((c) => c.Home),
    data: {
      title: 'الرئيسية',
      description: 'مرحباً بك في الصفحة الرئيسية، استكشف جميع معلوماتنا هنا.',
      image: 'https://www.example.com/home-image.jpg'
    },
  },
//   {
//     path: 'About',
//     // component: AboutComponent,
//     title: 'عن الموقع',
//     data: {
//       description: 'تعرف على تفاصيل الموقع وأهدافه في هذه الصفحة.',
//       image: 'https://www.example.com/about-image.jpg'
//     },
//   },
];
