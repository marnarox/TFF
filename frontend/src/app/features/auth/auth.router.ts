import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'user/login',
        loadComponent: () =>
            import('./pages/auth-login-page/user-login/user-login').then(
                (c) => c.UserLogin
            )
    },
    {
        path: 'user/register',
        loadComponent: () =>
            import('./pages/auth-register-page/user-register/user-register').then(
                (c) => c.UserRegister
            )
    },
];