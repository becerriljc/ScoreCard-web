import { Routes } from '@angular/router';

import { ComponentDialogComponent } from './pages/component-dialog/component-dialog.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ComponentButtonsComponent } from './pages/component-buttons/component-buttons.component';
import { ComponentProgressComponent } from './pages/component-progress/component-progress.component';
import { ChartsChartjsComponent } from './pages/charts-chartjs/charts-chartjs.component';
import { TablesDynamicComponent } from './pages/tables-dynamic/tables-dynamic.component';
import { TablesBasicComponent } from './pages/tables-basic/tables-basic.component';
import { FormsTreeComponent } from './pages/forms-tree/forms-tree.component';
import { ComponentCardComponent } from './pages/component-card/component-card.component';
import { ComponentBootstrapComponent } from './pages/component-bootstrap/component-bootstrap.component';
import { ComponentNotificationsComponent } from './pages/component-notifications/component-notifications.component';
import { ComponentRadioButtonComponent } from './pages/component-radio-button/component-radio-button.component';
import { ComponentCheckboxComponent } from './pages/component-checkbox/component-checkbox.component';
import { ComponentChipsComponent } from './pages/component-chips/component-chips.component';
import { ComponentDatePickerComponent } from './pages/component-date-picker/component-date-picker.component';
import { ComponentListComponent } from './pages/component-list/component-list.component';
import { ComponentMediaPlayerComponent } from './pages/component-media-player/component-media-player.component';
import { ComponentMenuComponent } from './pages/component-menu/component-menu.component';
import { ComponentGridListComponent } from './pages/component-grid-list/component-grid-list.component';
import { ComponentSelectComponent } from './pages/component-select/component-select.component';
import { ComponentSlideToggleComponent } from './pages/component-slide-toggle/component-slide-toggle.component';
import { ComponentSliderComponent } from './pages/component-slider/component-slider.component';
import { ComponentTabsComponent } from './pages/component-tabs/component-tabs.component';
import { ComponentTextEditorComponent } from './pages/component-text-editor/component-text-editor.component';
import { ComponentToolbarComponent } from './pages/component-toolbar/component-toolbar.component';
import { ComponentTooltipComponent } from './pages/component-tooltip/component-tooltip.component';
import { IconMaterialComponent } from './pages/icon-material/icon-material.component';
import { IconWeatherComponent } from './pages/icon-weather/icon-weather.component';
import { MapsGoogleComponent } from './pages/maps-google/maps-google.component';
import { IconFontawesomeComponent } from './pages/icon-fontawesome/icon-fontawesome.component';
import { FormsValidationComponent } from './pages/forms-validation/forms-validation.component';
import { FormsWizardComponent } from './pages/forms-wizard/forms-wizard.component';
import { FormsAutocompleteComponent } from './pages/forms-autocomplete/forms-autocomplete.component';
import { FormsUploadComponent } from './pages/forms-upload/forms-upload.component';
import { ChartsPeityComponent } from './pages/charts-peity/charts-peity.component';
import { WidgetsComponent } from './pages/widgets/widgets.component';
import { LayoutFlexComponent } from './pages/layout-flex/layout-flex.component';
import { LayoutTabsComponent } from './pages/layout-tabs/layout-tabs.component';
import { LayoutEdgesComponent } from './pages/layout-edges/layout-edges.component';
import { LayoutCardsComponent } from './pages/layout-cards/layout-cards.component';
import { LayoutFullscreenComponent } from './pages/layout-fullscreen/layout-fullscreen.component';
import { PagesErrorComponent } from './pages/pages-error/pages-error.component';
import { PagesLockscreenComponent } from './pages/pages-lockscreen/pages-lockscreen.component';
import { PagesInvoiceComponent } from './pages/pages-invoice/pages-invoice.component';
import { PagesNotfoundComponent } from './pages/pages-notfound/pages-notfound.component';
import { PagesSigninComponent } from './pages/pages-signin/pages-signin.component';
import { PagesSignupComponent } from './pages/pages-signup/pages-signup.component';
import { AppsCalendarComponent } from './pages/apps-calendar/apps-calendar.component';
import { AppsExplorerComponent } from './pages/apps-explorer/apps-explorer.component';
import { AppsMailComponent } from './pages/apps-mail/apps-mail.component';
import { MapsVectorExampleComponent } from './pages/maps-vector/maps-vector.component';
import { DashboardEdgeComponent } from './pages/dashboard-edge/dashboard-edge.component';
import { Aprendizaje } from './pages/aprendizaje/aprendizaje.component'
import { IniciarSesionComponent } from './pages/iniciar-sesion/iniciar-sesion.component'
import { AplicarEncuestaComponent } from './pages/aplicar-encuesta/aplicar-encuesta.component'

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
    redirectTo: '/dashboard',
    pathMatch: 'full',
    canActivate : [VerificaAuth]
  },
  // Emergency loading, need to import component form file.
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate : [VerificaAuth]
  },
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
    path: 'dashboard-edge',
    component: DashboardEdgeComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'aprendizaje',
    component: Aprendizaje,
    canActivate : [VerificaAuth]
  },
  {
    path: 'component-buttons',
    component: ComponentButtonsComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'component-progress',
    component: ComponentProgressComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'component-card',
    component: ComponentCardComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'component-bootstrap',
    component: ComponentBootstrapComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'component-dialog',
    component: ComponentDialogComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'component-notifications',
    component: ComponentNotificationsComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'radio-button',
    component: ComponentRadioButtonComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'component-checkbox',
    component: ComponentCheckboxComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'component-chips',
    component: ComponentChipsComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'component-date-picker',
    component: ComponentDatePickerComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'component-list',
    component: ComponentListComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'component-media-player',
    component: ComponentMediaPlayerComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'component-menu',
    component: ComponentMenuComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'component-grid-list',
    component: ComponentGridListComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'component-select',
    component: ComponentSelectComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'component-slide-toggle',
    component: ComponentSlideToggleComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'component-slider',
    component: ComponentSliderComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'component-tabs',
    component: ComponentTabsComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'component-text-editor',
    component: ComponentTextEditorComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'component-toolbar',
    component: ComponentToolbarComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'component-tooltip',
    component: ComponentTooltipComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'component-radio-button',
    component: ComponentRadioButtonComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'icon-material',
    component: IconMaterialComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'icon-weather',
    component: IconWeatherComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'icon-fontawesome',
    component: IconFontawesomeComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'maps-google',
    component: MapsGoogleComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'maps-vector',
    component: MapsVectorExampleComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'forms-validation',
    component: FormsValidationComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'forms-wizard',
    component: FormsWizardComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'forms-autocomplete',
    component: FormsAutocompleteComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'forms-upload',
    component: FormsUploadComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'forms-tree',
    component: FormsTreeComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'tables-basic',
    component: TablesBasicComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'tables-dynamic',
    component: TablesDynamicComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'charts-chartjs',
    component: ChartsChartjsComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'charts-peity',
    component: ChartsPeityComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'widgets',
    component: WidgetsComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'layout-flex',
    component: LayoutFlexComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'layout-tabs',
    component: LayoutTabsComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'layout-edges',
    component: LayoutEdgesComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'layout-cards',
    component: LayoutCardsComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'layout-fullscreen',
    component: LayoutFullscreenComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'pages-error',
    component: PagesErrorComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'pages-lockscreen',
    component: PagesLockscreenComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'pages-invoice',
    component: PagesInvoiceComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'pages-notfound',
    component: PagesNotfoundComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'pages-signin',
    component: PagesSigninComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'pages-signup',
    component: PagesSignupComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'apps-calendar',
    component: AppsCalendarComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'apps-explorer',
    component: AppsExplorerComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'apps-mail',
    component: AppsMailComponent,
    canActivate : [VerificaAuth]
  },
  {
    path: 'login',
    component: IniciarSesionComponent
  },
  {
    path: 'aplicarEncuesta/:idEncuesta',
    component: AplicarEncuestaComponent
  }
]
