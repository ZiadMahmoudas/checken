import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:"",redirectTo:"Home",title:"Home",pathMatch:"full"},
    {path:"Home",title:"Home",loadComponent:()=>import("./pages/home/home").then((c)=>c.Home)}
];
