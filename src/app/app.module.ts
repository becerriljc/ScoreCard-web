import * as $ from 'jquery';
import { ROUTES } from './app.routes'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { MaterialModule, MdTabsModule } from '@angular/material';
import { Md2Module } from 'md2/module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, NoPreloading } from '@angular/router';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { FileDropModule } from 'angular2-file-drop'

import { CustomFormsModule } from 'ng2-validation';
import { TranslateStaticLoader, TranslateLoader, TranslateModule } from 'ng2-translate';

//firebase 
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2'
import { firebaseConfig } from '../environments/firebase.config'

//servicios => todos los inyectables
import { InnovaService } from './services/innova.service'
import { FuncionesService } from './services/funciones.service'
import { VerificaAuth } from './app.guard'
import { AuthServices } from './services/auth.services'
import { FormulariosService } from './services/formularios.service'
import { GeneralService } from './services/gral.services'
import { CursosService } from './services/cursos.service'
import { UsuarioService } from './services/usuario.service'
import { EncuestasService } from './services/encuestas.services'
import { ClientesService } from './services/clientes.services'
import { XmlHttpRequestService } from './services/xmlhttprequest.service'

// páginas sistema
import { Aprendizaje } from './pages/aprendizaje/aprendizaje.component'
import { GeneraForm } from './pages/apps-forms/form.component'
import { VistaPrevia } from './pages/visor-cuestionarios/visor.component'
import { GenerarFormComponent } from './pages/generar-form/generar-form.component'
import { ListaFormComponent } from './pages/lista-form/lista-form.component'
import { IniciarSesionComponent } from './pages/iniciar-sesion/iniciar-sesion.component'
import { NotificacionesComponent } from './shared/dialog/notificaciones/notificaciones.component'
import { AplicarEncuestaComponent } from './pages/aplicar-encuesta/aplicar-encuesta.component'
import { CursosComponent } from './pages/cursos/cursos.component'
import { GenerarCursosComponent } from './pages/generar-cursos/generar-cursos.component'
import { ListarCursosComponent } from './pages/listar-cursos/listar-cursos.component'
import { NuevoCursoComponent } from './shared/dialog/nuevo-curso/nuevo-curso.component'
import { ReportesComponent } from './pages/reportes/reportes.component'
import { AplicaCursoComponent } from './shared/dialog/aplica-curso/aplica-curso.component'
import { AdminUserComponent } from './pages/admin-user/admin-user.component';
import { ListUserComponent } from './pages/list-user/list-user.component';
import { FormUserComponent } from './pages/form-user/form-user.component';
import { PerfilComponent } from './pages/perfil/perfil.component'

//pipes
import { KeysPipe } from './pipes/convertir-array'
import { FiltrosPipe } from './pipes/filtros.pipe'
import { FiltroCursosPipe } from './pipes/filtro-cursos.pipe';
import { FiltroTestPipe } from './pipes/filtro-test.pipe';
import { FiltroReportesPipe } from './pipes/filtro-reportes.pipe';
import { FiltroUsuarioPipe } from './pipes/filtro-usuario.pipe';
import { PruebasWebServiceComponent } from './pages/pruebas-web-service/pruebas-web-service.component';

/**
 * Root Module
 *
 * App bootstrap here, add your component (Page) to var [declarations] for load.
 */
@NgModule({
  declarations: [
    // Page
    Aprendizaje,
    GeneraForm,
    VistaPrevia,
    AppComponent,
    GenerarFormComponent,
    ListaFormComponent,
    IniciarSesionComponent,
    NotificacionesComponent,
    AplicarEncuestaComponent,
    ReportesComponent,
    KeysPipe,
    CursosComponent,
    GenerarCursosComponent,
    ListarCursosComponent,
    NuevoCursoComponent,
    FiltrosPipe,
    AplicaCursoComponent,
    FiltroCursosPipe,
    FiltroTestPipe,
    FiltroReportesPipe,
    AdminUserComponent,
    ListUserComponent,
    FormUserComponent,
    PerfilComponent,
    FiltroUsuarioPipe,
    PruebasWebServiceComponent
  ],
  imports: [
    // Angular Imports
    BrowserModule,
    BrowserAnimationsModule,
    MdTabsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    // If you using lazy loading, var [preloadingStrategy] can change to PreloadAllModules or NoPreloading.
    RouterModule.forRoot(ROUTES, {useHash: true, preloadingStrategy: NoPreloading}),
    MaterialModule,
    FlexLayoutModule,
    Md2Module,
    FileDropModule,
    //Modulo firebase inicialización
    AngularFireModule.initializeApp(firebaseConfig),
    // Replace to your Google map API key.
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC4-U6Eo0eHV7UFGjAIO6ZRB4X5z7hWS-8'
    }),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  providers: [
    // Global service (Global state)
    AppService,
    InnovaService,
    FuncionesService,
    AuthServices,
    VerificaAuth,
    FormulariosService,
    GeneralService,
    CursosService,
    UsuarioService,
    EncuestasService,
    ClientesService,
    XmlHttpRequestService
  ],
  entryComponents: [
    // Customize dialog must be import here.
    GeneraForm,
    VistaPrevia,
    NotificacionesComponent,
    NuevoCursoComponent,
    AplicaCursoComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}
