import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'Home', title: 'الرئيسية', pathMatch: 'full' },
  {
    path: 'Home',
    title: 'الرئيسية',
    loadComponent: () => import('./pages/home/home').then((c) => c.Home),
  data: {
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
