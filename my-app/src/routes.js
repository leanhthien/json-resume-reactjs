import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const ResumeForm = React.lazy(() => import('./views/ResumeForm'));
const Detail = React.lazy(() => import('./views/Detail'));


const routes = [
    
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/resume/new', name: 'New Resume', component: ResumeForm },
    { path: '/resume/edit/:id', name: 'Edit Resume', component: ResumeForm },
    { path: '/resume/detail/:id', name: 'Detail Resume', component: Detail },

]

export default routes;