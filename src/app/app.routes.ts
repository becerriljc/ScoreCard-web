import { Routes } from '@angular/router';

import { Aprendizaje } from './pages/aprendizaje/aprendizaje.component'
import { IniciarSesionComponent } from './pages/iniciar-sesion/iniciar-sesion.component'
import { AplicarEncuestaComponent } from './pages/aplicar-encuesta/aplicar-encuesta.component'
import { CursosComponent } from './pages/cursos/cursos.component'
import { AplicarCursoComponent } from './pages/aplicar-curso/aplicar-curso.component'

//servicio de autenticación

import { VerificaAuth } from './app.guard'

/**
 * Router Setting
 *
 * Write your component (Page) here to load.
 */
export const ROUTES: Routes = [
  // This default is router like '/'.
  {
    path: '',
    redirectTo: '/aprendizaje',
    pathMatch: 'full',
    canActivate : [VerificaAuth]
  },
  // Emergency loading, need to import component form file.
  // Lazy loading, you need to create a module file.
  //
  // 1. Find file dashboard.module.lazy at folder dashboard
  // 2. Rename file dashboard.module.lazy to dashboard.module.ts
  // 3. Modify this file
  //    change Line "component: DashboardComponent" to "loadChildren: './dashboard/dashboard.module#DashboardModule'"
  // 4. Modify file app.module.ts
  //    remove line "DashboardComponent," and "import { DashboardComponent } from './pages/dashboard/dashboard.component';"
  //
  // {
  //   path: 'dashboard',
  //   loadChildren: './dashboard/dashboard.module#DashboardModule'
  // },
  {
    path: 'aprendizaje',
    component: Aprendizaje,
    canActivate : [VerificaAuth]
  },
  {
    path: 'aprendizaje/:idPestana',
    component: Aprendizaje,
    canActivate : [VerificaAuth]
  },
  {
    path: 'login',
    component: IniciarSesionComponent
  },
  {
    path: 'aplicarEncuesta/:idEncuesta',
    component: AplicarEncuestaComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'cursos',
    component: CursosComponent,
    canActivate : [VerificaAuth]
  }
]
