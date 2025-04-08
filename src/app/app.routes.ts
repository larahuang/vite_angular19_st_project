import { Routes } from '@angular/router';
import { AuthGuard } from './@guard/auth.guard';

export const routes: Routes = [
  { path: "", redirectTo: 'index', pathMatch: 'full' },
  {
    path: "index",
    loadComponent: () => import('./layout/front-layout/front-layout.component').then((m) => m.FrontLayoutComponent),
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: "home",
        loadComponent: () => import('./front/home/home.component').then((m) => m.HomeComponent),
       //  resolve: { todoDataList: TodoResolver }
      },
      {
        path: "products",
        loadComponent: () => import('./front/products/products.component').then((m) => m.ProductsComponent),
      },
      {
        path: "product/:id",
        loadComponent: () => import('./front/product/product.component').then((m) => m.ProductComponent),
      },
      {
        path: "login",
        loadComponent: () => import('./front/login/login.component').then((m) => m.LoginComponent),
       //  resolve: { todoDataList: TodoResolver }
      },
     ]
  },
  {
    path: "admin",
    loadComponent: () => import('./layout/back-layout/back-layout.component').then((m) => m.BackLayoutComponent),
    canActivateChild: [AuthGuard], //包含child router 的導航守衛
    children: [
      { path: '', redirectTo: 'admin_board', pathMatch: 'full' },
      {
        path: "admin_board", loadComponent:()=>import('./backstage/board-admin/board-admin.component').then((m)=>m.BoardAdminComponent)
      },
     ]
  },
  {
    path: '**',
    loadComponent: () => import('./page-not-found/page-not-found.component').then((m) => m.PageNotFoundComponent)
  },
];
