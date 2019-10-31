import React from 'react';

const Login = React.lazy(() => import('./views/Pages/Login'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));

const routes = [
    { path: '/', exact: true, name: 'Log in', component: Login },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },


]

export default routes;