import { Component, OnInit, OnDestroy, ViewChild, Renderer2 } from '@angular/core';
import { routes } from './products';
import { Route } from './route.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductsService } from './products.service';
import { AddEvent, EditEvent, GridComponent } from '@progress/kendo-angular-grid';
import { groupBy, GroupDescriptor } from '@progress/kendo-data-query';

const createFormGroup = dataItem => new FormGroup({
  'DestinationIP': new FormControl(dataItem.DestinationIP),
  'Gateway': new FormControl(dataItem.Gateway),
  'SubnetMask': new FormControl(dataItem.SubnetMask, Validators.required),
});

const matches = (el, selector) => (el.matches || el.msMatchesSelector).call(el, selector);

@Component({
  selector: 'app-root',
  styleUrls: ['../assets/app.component.scss'],
  template: `
    <div class="container">
    <form novalidate #myForm="ngForm">
          <kendo-grid
              [kendoGridTemplateEditing]="createNewProduct"
              [kendoGridBinding]="routes"
              [height]="405"
              [pageSize]="6"
              [pageable]="true"
              [sortable]="true"
              [navigable]="true"
              [filterable]="true"

          >
            <ng-template kendoGridToolbarTemplate>
                <button kendoGridAddCommand type="button">Add new</button>
            </ng-template>
            <kendo-grid-column field="DestinationIP" title="Destination IP">
                <ng-template kendoGridEditTemplate let-dataItem="dataItem">
                    <input [(ngModel)]="dataItem.DestinationIP" kendoGridFocusable name="DestinationIP" class="k-textbox" required/>
                </ng-template>
            </kendo-grid-column>
            <kendo-grid-column field="Gateway" editor="numeric" title="Gateway">
                <ng-template kendoGridEditTemplate let-dataItem="dataItem">
                    <input [(ngModel)]="dataItem.Gateway" kendoGridFocusable name="Gateway" class="k-textbox" />
                </ng-template>
            </kendo-grid-column>
            <kendo-grid-column field="SubnetMask" editor="boolean" title="Subnet mask">
                <ng-template kendoGridEditTemplate let-dataItem="dataItem">
                    <input [(ngModel)]="dataItem.SubnetMask" kendoGridFocusable name="SubnetMask" />
                </ng-template>
            </kendo-grid-column>
            <kendo-grid-command-column title="command" [width]="110">
              <ng-template kendoGridCellTemplate let-isNew="isNew">
                <button kendoGridEditCommand [icon]="'edit'" [primary]="true"></button>
                <button kendoGridRemoveCommand [icon]="'delete'"></button>
                <button kendoGridSaveCommand [icon]="'check'" [disabled]="myFormMag.invalid"></button>
                <button kendoGridCancelCommand [icon]="'close'"></button>
              </ng-template>
            </kendo-grid-command-column>
          </kendo-grid>
      </form>    
    <form novalidate #myFormMag="ngForm">
          <kendo-grid
              [kendoGridTemplateEditing]="createNewProduct"
              [kendoGridBinding]="routes"
              [height]="405"
              [pageSize]="6"
              [pageable]="true"
              [sortable]="true"
              [navigable]="true"
              [filterable]="true"

          >
            <ng-template kendoGridToolbarTemplate>
                <button kendoGridAddCommand type="button">Add new</button>
            </ng-template>
            <kendo-grid-column field="DestinationIP" title="Destination IP">
                <ng-template kendoGridEditTemplate let-dataItem="dataItem">
                    <input [(ngModel)]="dataItem.DestinationIP" kendoGridFocusable name="DestinationIP" class="k-textbox" required/>
                </ng-template>
            </kendo-grid-column>
            <kendo-grid-column field="Gateway" editor="numeric" title="Gateway">
                <ng-template kendoGridEditTemplate let-dataItem="dataItem">
                    <input [(ngModel)]="dataItem.Gateway" kendoGridFocusable name="Gateway" class="k-textbox" />
                </ng-template>
            </kendo-grid-column>
            <kendo-grid-column field="SubnetMask" editor="boolean" title="Subnet mask">
                <ng-template kendoGridEditTemplate let-dataItem="dataItem">
                    <input [(ngModel)]="dataItem.SubnetMask" kendoGridFocusable name="SubnetMask" />
                </ng-template>
            </kendo-grid-column>
            <kendo-grid-command-column title="command" >
                <ng-template kendoGridCellTemplate let-isNew="isNew">
                  <button kendoGridEditCommand [icon]="'edit'" [primary]="true"></button>
                  <button kendoGridRemoveCommand [icon]="'delete'"></button>
                    <button kendoGridSaveCommand [icon]="'check'" [disabled]="myFormMag.invalid"></button>
                    <button kendoGridCancelCommand [icon]="'close'"></button>
                </ng-template>
            </kendo-grid-command-column>
          </kendo-grid>
      </form>
    </div>
  `
})
export class AppComponent {
  public routes: any[] = routes;

  createNewProduct(): Route {
    return new Route();
  }
}
