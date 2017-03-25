/**
 * 
 * <h1 md-dialog-title>Formulario</h1>
<div md-dialog-content>
    
    <form (ngSubmit)="guardar(forma)" #forma="ngForm" novalidate>
        <div fxLayout="row" (mouseover)="show_quit(1, 1)" (mouseleave)="show_quit(1, 2)">
            <div fxFlex="60">
                <md-input-container>
                    <input  mdInput placeholder="Pregunta sin título" 
                                    name="pregunta" ,
                                    [(ngModel)]="dato.pregunta" 
                                    #pregunta = "ngModel"
                                    required>
                </md-input-container>
            </div>
            <div fxFlex fxLayoutAlign="center center" [style.visibility]="showImg1">
                <md-icon>photo</md-icon>
            </div>
            <div fxFlex="30" fxLayoutAlign="center center">
                <md-select placeholder="Tipo Respuesta" 
                        name="tipoRespuesta" 
                        [(ngModel)]="x_value" 
                        #tipoRespuesta = "ngModel"
                        required>
                    <md-option *ngFor="let respuesta of respuestas" [value]="respuesta.value">
                        {{ respuesta.item }}
                     </md-option>
                </md-select>
            </div>
            <div fxFlex fxLayoutAlign="center center">
                <div class="example-tooltip-host" mdTooltip="Añadir pregunta" mdTooltipPosition="above">
                    <button md-button 
                        type="submit"
                        [disabled] = "forma.invalid"><md-icon>add_circle</md-icon></button>
                </div>
            </div>
        </div>
        <div fxLayout="row">
            <div fxFlex="60">
                <div *ngIf="pregunta.errors?.required && pregunta.touched"><span>Es necesario conocer el contenido de la pregunta.</span></div>
            </div>
            <div fxFlex>
                <div *ngIf="tipoRespuesta.errors?.required && tipoRespuesta.touched"><span>Indica el tipo de respuesta a la pregunta.</span></div>
            </div>
        </div>
        <div fxLayout="column" [ngSwitch]="x_value">
            <div fxFlex *ngSwitchCase="1">
                <md-input-container>
                    <input mdInput placeholder="Pregunta realizada" disabled value="Texto de Respuesta Corta">
                </md-input-container>
            </div>
            <div fxFlex *ngSwitchCase="2">
                <md-input-container>
                    <input mdInput placeholder="Pregunta realizada" disabled value="Texto de Respuesta Larga">
                </md-input-container>
            </div>
            <div fxFlex *ngSwitchCase="3">
                <div fxLayout="column">
                    <div fxFlex>
                        <div fxLayout="row" (mouseover)="show_quit(2, 1)" (mouseleave)="show_quit(2, 2)">
                            <div fxFlex fxLayoutAlign="center center">
                                <md-radio-button value="1" disabled></md-radio-button>
                            </div>
                            <div fxFlex="70" fxLayoutAlign="center center">
                                <md-input-container>
                                    <input mdInput placeholder="Pregunta realizada">
                                </md-input-container>
                            </div>
                            <div fxFlex fxLayoutAlign="center center" [style.visibility]="showImg2">
                                <md-icon>photo</md-icon>
                            </div>
                            <div fxFlex fxLayoutAlign="center center">
                                <md-icon>clear</md-icon>
                            </div>
                        </div>
                    </div>
                    <div fxFlex>
                        <div fxLayout="row">
                            <div fxFlex fxLayoutAlign="center center">
                                <md-radio-button value="1" disabled></md-radio-button>
                            </div>
                            <div fxFlex="70" fxLayoutAlign="start center">
                                <button md-button>Añadir respuesta</button>
                            </div>
                            <div fxFlex></div>
                            <div fxFlex > </div>
                        </div>
                    </div>
                </div>
            </div>
            <div fxFlex *ngSwitchCase="4">
                <div fxLayout="column">
                    <div fxFlex>
                        <div fxLayout="row" (mouseover)="show_quit(3, 1)" (mouseleave)="show_quit(3, 2)">
                            <div fxFlex fxLayoutAlign="center center">
                                <md-checkbox value="1" disabled></md-checkbox>
                            </div>
                            <div fxFlex="70" fxLayoutAlign="center center">
                                <md-input-container>
                                    <input mdInput placeholder="Pregunta realizada">
                                </md-input-container>
                            </div>
                            <div fxFlex fxLayoutAlign="center center" [style.visibility]="showImg3">
                                <md-icon>photo</md-icon>
                            </div>
                            <div fxFlex fxLayoutAlign="center center">
                                <md-icon>clear</md-icon>
                            </div>
                        </div>
                    </div>
                    <div fxFlex>
                        <div fxLayout="row">
                            <div fxFlex fxLayoutAlign="center center">
                                <md-checkbox value="1" disabled></md-checkbox>
                            </div>
                            <div fxFlex="70" fxLayoutAlign="start center">
                                <button md-button>Añadir respuesta</button>
                            </div>
                            <div fxFlex></div>
                            <div fxFlex > </div>
                        </div>
                    </div>
                </div>
            </div>
            <div fxFlex *ngSwitchCase="5">
                <div fxLayout="column">
                    <div fxFlex>
                        <div fxLayout="row">
                            <div fxFlex fxLayoutAlign="center center"><span>Desp.</span></div>
                            <div fxFlex="80" fxLayoutAlign="center center">
                                <md-input-container>
                                    <input mdInput placeholder="Desplegar opción">
                                </md-input-container>
                            </div>
                            <div fxFlex fxLayoutAlign="center center">
                                <md-icon>clear</md-icon>
                            </div>
                        </div>
                    </div>
                    <div fxFlex>
                        <div fxLayout="row">
                            <div fxFlex fxLayoutAlign="center center"><span>Desp.</span></div>
                            <div fxFlex="80">
                                <button md-button>Añadir respuesta</button>
                            </div>
                            <div fxFlex></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div fxLayout="row" fxLayoutAlign="center center">
            <div fxFlex></div>
            <div fxFlex="15">
                <div class="example-tooltip-host" mdTooltip="Eliminar pregunta" mdTooltipPosition="above">
                    <button md-button type="reset" color="danger">Eliminar</button>
                </div>
            </div>
        </div>
    </form>
</div>
<div md-dialog-actions>
  <button md-button (click)="dialogRef.close('Option 1')">Guardar</button>
  <button md-button (click)="dialogRef.close('Option 2')">Cancelar</button>
</div>

 */