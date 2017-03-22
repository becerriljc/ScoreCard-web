/*
<h1 md-dialog-title>Formulario</h1>
<div md-dialog-content>
    <div fxLayout="column" fxLayout.xs="column">
        <div fxFlex class="colorElem">
            <div fxLayout="row" fxLayout.xs="column" (mouseover)="show_quit(1, 1)" (mouseleave)="show_quit(2, 1)">
                <div fxFlex="60" fxLayoutAlign="center center" class="colorElem">
                    <md-input-container>
                        <input mdInput placeholder="PREGUNTA SIN TÍTULO" type="text"
                             [(ngModel)]="pregunta"  name="pregunta"  required>
                    </md-input-container>
                </div>
                <div fxFlex fxLayoutAlign="center center" class="colorElem"  [style.visibility]="showImg1">
                    <md-icon>photo</md-icon>
                </div>
                <div fxFlex="35" fxLayoutAlign="center center" class="colorElem">
                    <md-select placeholder="TIPO RESPUESTA" [(ngModel)]="tipoRespuesta">
                        <md-option *ngFor="let respuesta of respuestas" [value]="respuesta.item">{{ respuesta.value }}</md-option>
                    </md-select>
                </div>
            </div>
        </div>
        <div fxFlex class="colorElem">
            <div fxLayout="column" fxLayout.xs="column" class="colorElem">
                <div fxFlex>
                    <div fxLayout="row" fxLayout.xs="column" class="colorElem" (mouseover)="show_quit(1, 2)" (mouseleave)="show_quit(2, 2)">
                        <div fxFlex  fxLayoutAlign="left center"><md-icon>radio_button_unchecked</md-icon></div>
                        <div fxFlex="80"  fxLayoutAlign="left center">
                            <md-input-container>
                                <input mdInput placeholder="Opción" type="text"
                                name="respuesta"  required>
                            </md-input-container>
                        </div>
                        <div fxFlex fxLayoutAlign="center center" [style.visibility]="showImg2"><md-icon>photo</md-icon></div>
                        <div fxFlex fxLayoutAlign="center center"><md-icon>clear</md-icon></div>
                    </div>
                </div>
                <div fxFlex>
                    <div fxLayout="row" fxLayout.xs="column" class="colorElem">
                        <div fxFlex  fxLayoutAlign="left center"><md-icon>radio_button_unchecked</md-icon></div>
                        <div fxFlex="94"  fxLayoutAlign="left center"><button md-button>Añadir opción</button></div>
                    </div>
                </div>
                <div fxFlex [innerHtml]="htmlText"></div>
                <div fxFlex>
                    <div fxLayout="row" fxLayoutAlign="end center">
                        <md-icon (click)="addRow()">add_circle_outline</md-icon>
                        <md-icon>delete</md-icon>
                        <span class="colorElem"> | Obligatorio  </span>
                        <i *ngIf="obg == false" class="fa fa-toggle-off  fa-2x espacio" aria-hidden="true" (click)="status(true)"></i>
                        <i *ngIf="obg == true" class="fa fa-toggle-on  fa-2x espacio activo" aria-hidden="true"  (click)="status(false)"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div md-dialog-actions>
  <button md-button (click)="dialogRef.close('Option 1')">Guardar</button>
  <button md-button (click)="dialogRef.close('Option 2')">Cancelar</button>
</div>


*/