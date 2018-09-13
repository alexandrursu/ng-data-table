import {Component, OnInit, OnDestroy, ViewChild, Renderer2} from '@angular/core';
import {routes} from './products';
import {Route} from './route.model';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import {ProductsService} from './products.service';
import {AddEvent, EditEvent, GridComponent} from '@progress/kendo-angular-grid';
import {groupBy, GroupDescriptor} from '@progress/kendo-data-query';

const createFormGroup = dataItem => new FormGroup({
  'DestinationIP': new FormControl(dataItem.DestinationIP),
  'Gateway': new FormControl(dataItem.Gateway),
  'SubnetMask': new FormControl(dataItem.SubnetMask, Validators.required),
});

const matches = (el, selector) => (el.matches || el.msMatchesSelector).call(el, selector);

const headerStyles = {'background-color': '#666', 'color': '#fff', 'line-height': '1em'};
const headerStyleMiddle = {'background-color': '#888', 'color': '#fff'};

@Component({
  selector: 'app-root',
  styleUrls: ['../assets/app.component.scss'],
  template: `
    <section class="navbar"></section>
    <div class="container-fluid">
      <section class="sidebar"></section>
      <h4>Network Configuration</h4>
      <section class="flex-container">
        <div class="table-section">
          <div class="table-title">Dig Routes</div>
          <form novalidate #myForm="ngForm">
            <kendo-grid
              [kendoGridTemplateEditing]="createNewProduct"
              [kendoGridBinding]="routes"
              [height]="405"
              [pageSize]="10"
              [pageable]="true"
              [navigable]="true"
              [filterable]="true"
              [sort]="{
              field: 'Gateway',
              dir: 'desc'
            }"
              [sortable]="{
              allowUnsort: allowUnsort,
              mode: multiple ? 'multiple' : 'single'
          }"
              (sortChange)="sortChange($event)"
            >
              <kendo-grid-column
                [headerStyle]="{'background-color': 'transparent', 'border-bottom': '1px solid rgba(255,255,255,0.2)','color': '#fff','line-height': '1em', 'padding':'8 12px'}"
                field="DestinationIP" title="Destination IP">
                <ng-template kendoGridEditTemplate let-dataItem="dataItem">
                  <input [(ngModel)]="dataItem.DestinationIP" kendoGridFocusable name="DestinationIP" class="k-textbox" required/>
                </ng-template>
              </kendo-grid-column>
              <kendo-grid-column
                [headerStyle]="{'background-color': 'transparent', 'border-bottom': '1px solid rgba(255,255,255,0.2)','color': '#fff','line-height': '1em', 'padding':'8 12px'}"
                field="Gateway" editor="numeric" title="Gateway">
                <ng-template kendoGridEditTemplate let-dataItem="dataItem">
                  <input [(ngModel)]="dataItem.Gateway" kendoGridFocusable name="Gateway" class="k-textbox"/>
                </ng-template>
              </kendo-grid-column>
              <kendo-grid-column
                [headerStyle]="{'background-color': 'transparent', 'border-bottom': '1px solid rgba(255,255,255,0.2)','color': '#fff','line-height': '1em', 'padding':'8 12px'}"
                field="SubnetMask" editor="boolean"
                title="Subnet mask">
                <ng-template kendoGridEditTemplate let-dataItem="dataItem">
                  <input [(ngModel)]="dataItem.SubnetMask" kendoGridFocusable name="SubnetMask"/>
                </ng-template>
              </kendo-grid-column>
              <kendo-grid-command-column
                [headerStyle]="{'background-color': 'transparent','color': '#fff','line-height': '1em', 'padding':'8 12px'}"
                title="" [width]="70">
                <ng-template kendoGridHeaderTemplate let-column let-columnIndex="columnIndex">
                  <button kendoGridAddCommand [icon]="'plus-outline'" style="color: blue;"> Add</button>
                </ng-template>
                <ng-template kendoGridCellTemplate let-isNew="isNew">
                  <button kendoGridEditCommand [icon]="'edit'" [primary]="true"></button>
                  <button kendoGridRemoveCommand [icon]="'delete'"></button>
                  <button kendoGridSaveCommand [icon]="'check'" [disabled]="myForm.invalid"></button>
                  <button kendoGridCancelCommand [icon]="'close'"></button>
                </ng-template>
              </kendo-grid-command-column>
            </kendo-grid>
          </form>
        </div>
          <div class="table-section">
          <div class="table-title">Mag Routes</div>
          <form novalidate #myForm="ngForm">
            <kendo-grid
              [kendoGridTemplateEditing]="createNewProduct"
              [kendoGridBinding]="routes"
              [height]="405"
              [pageSize]="10"
              [pageable]="true"
              [navigable]="true"
              [filterable]="true"
              [sort]="{
              field: 'Gateway',
              dir: 'desc'
            }"
              [sortable]="{
              allowUnsort: allowUnsort,
              mode: multiple ? 'multiple' : 'single'
          }"
              (sortChange)="sortChange($event)"
            >
              <kendo-grid-column
                [headerStyle]="{'background-color': 'transparent', 'border-bottom': '1px solid rgba(255,255,255,0.2)','color': '#fff','line-height': '1em', 'padding':'8 12px'}"
                field="DestinationIP" title="Destination IP">
                <ng-template kendoGridEditTemplate let-dataItem="dataItem">
                  <input [(ngModel)]="dataItem.DestinationIP" kendoGridFocusable name="DestinationIP" class="k-textbox" required/>
                </ng-template>
              </kendo-grid-column>
              <kendo-grid-column
                [headerStyle]="{'background-color': 'transparent', 'border-bottom': '1px solid rgba(255,255,255,0.2)','color': '#fff','line-height': '1em', 'padding':'8 12px'}"
                field="Gateway" editor="numeric" title="Gateway">
                <ng-template kendoGridEditTemplate let-dataItem="dataItem">
                  <input [(ngModel)]="dataItem.Gateway" kendoGridFocusable name="Gateway" class="k-textbox"/>
                </ng-template>
              </kendo-grid-column>
              <kendo-grid-column
                [headerStyle]="{'background-color': 'transparent', 'border-bottom': '1px solid rgba(255,255,255,0.2)','color': '#fff','line-height': '1em', 'padding':'8 12px'}"
                field="SubnetMask" editor="boolean"
                title="Subnet mask">
                <ng-template kendoGridEditTemplate let-dataItem="dataItem">
                  <input [(ngModel)]="dataItem.SubnetMask" kendoGridFocusable name="SubnetMask"/>
                </ng-template>
              </kendo-grid-column>
              <kendo-grid-command-column
                [headerStyle]="{'background-color': 'transparent','color': '#fff','line-height': '1em', 'padding':'8 12px'}"
                title="" [width]="70">
                <ng-template kendoGridHeaderTemplate let-column let-columnIndex="columnIndex">
                  <button kendoGridAddCommand [icon]="'plus-outline'" style="color: blue;"> Add</button>
                </ng-template>
                <ng-template kendoGridCellTemplate let-isNew="isNew">
                  <button kendoGridEditCommand [icon]="'edit'" [primary]="true"></button>
                  <button kendoGridRemoveCommand [icon]="'delete'"></button>
                  <button kendoGridSaveCommand [icon]="'check'" [disabled]="myForm.invalid"></button>
                  <button kendoGridCancelCommand [icon]="'close'"></button>
                </ng-template>
              </kendo-grid-command-column>
            </kendo-grid>
          </form>
        </div> 
        <div class="table-section">
        <div class="table-title">Mag DNS</div>
        <form novalidate #myForm="ngForm">
            <kendo-grid
              [kendoGridTemplateEditing]="createNewProduct"
              [kendoGridBinding]="routes"
              [pageSize]="6"
              [sort]="{
              field: 'Gateway',
              dir: 'desc'
            }"
              [sortable]="{
              allowUnsort: allowUnsort,
              mode: multiple ? 'multiple' : 'single'
          }"
              (sortChange)="sortChange($event)"
            >
              <kendo-grid-column
                [headerStyle]="{'background-color': 'transparent', 'border-bottom': '1px solid rgba(255,255,255,0.2)','color': '#fff','line-height': '1em', 'padding':'8 12px'}"
                field="DestinationIP" title="Destination IP">
                <ng-template kendoGridEditTemplate let-dataItem="dataItem">
                  <input [(ngModel)]="dataItem.DestinationIP" kendoGridFocusable name="DestinationIP" class="k-textbox" required/>
                </ng-template>
              </kendo-grid-column>
              <kendo-grid-column
                [headerStyle]="{'background-color': 'transparent', 'border-bottom': '1px solid rgba(255,255,255,0.2)','color': '#fff','line-height': '1em', 'padding':'8 12px'}"
                field="Gateway" editor="numeric" title="Gateway">
                <ng-template kendoGridEditTemplate let-dataItem="dataItem">
                  <input [(ngModel)]="dataItem.Gateway" kendoGridFocusable name="Gateway" class="k-textbox"/>
                </ng-template>
              </kendo-grid-column>
              <kendo-grid-column
                [headerStyle]="{'background-color': 'transparent', 'border-bottom': '1px solid rgba(255,255,255,0.2)','color': '#fff','line-height': '1em', 'padding':'8 12px'}"
                field="SubnetMask" editor="boolean"
                title="Subnet mask">
                <ng-template kendoGridEditTemplate let-dataItem="dataItem">
                  <input [(ngModel)]="dataItem.SubnetMask" kendoGridFocusable name="SubnetMask"/>
                </ng-template>
              </kendo-grid-column>
              <kendo-grid-command-column
                [headerStyle]="{'border-bottom': '1px solid #ff007f','background-color': 'transparent','color': '#fff','line-height': '1em', 'padding':'8 12px'}"
                title="" [width]="70">
                <ng-template kendoGridHeaderTemplate let-column let-columnIndex="columnIndex">
                  <button kendoGridAddCommand [icon]="'plus-outline'" style="color: blue;"> Add</button>
                </ng-template>
                <ng-template kendoGridCellTemplate let-isNew="isNew">
                  <button kendoGridEditCommand [icon]="'edit'" [primary]="true"></button>
                  <button kendoGridRemoveCommand [icon]="'delete'"></button>
                  <button kendoGridSaveCommand [icon]="'check'" [disabled]="myForm.invalid"></button>
                  <button kendoGridCancelCommand [icon]="'close'"></button>
                </ng-template>
              </kendo-grid-command-column>
            </kendo-grid>
          </form>
        </div>
        <div class="table-section">
          <div class="table-title">Dig DNS</div>
          <form novalidate #myForm="ngForm">
            <kendo-grid
              [kendoGridTemplateEditing]="createNewProduct"
              [kendoGridBinding]="routes"
              [pageSize]="6"
              [sort]="{
              field: 'Gateway',
              dir: 'desc'
            }"
              [sortable]="{
              allowUnsort: allowUnsort,
              mode: multiple ? 'multiple' : 'single'
          }"
              (sortChange)="sortChange($event)"
            >
              <kendo-grid-column
                [headerStyle]="{'background-color': 'transparent', 'border-bottom': '1px solid rgba(255,255,255,0.2)','color': '#fff','line-height': '1em', 'padding':'8 12px'}"
                field="DestinationIP" title="Destination IP">
                <ng-template kendoGridEditTemplate let-dataItem="dataItem">
                  <input [(ngModel)]="dataItem.DestinationIP" kendoGridFocusable name="DestinationIP" class="k-textbox" required/>
                </ng-template>
              </kendo-grid-column>
              <kendo-grid-column
                [headerStyle]="{'background-color': 'transparent', 'border-bottom': '1px solid rgba(255,255,255,0.2)','color': '#fff','line-height': '1em', 'padding':'8 12px'}"
                field="Gateway" editor="numeric" title="Gateway">
                <ng-template kendoGridEditTemplate let-dataItem="dataItem">
                  <input [(ngModel)]="dataItem.Gateway" kendoGridFocusable name="Gateway" class="k-textbox"/>
                </ng-template>
              </kendo-grid-column>
              <kendo-grid-column
                [headerStyle]="{'background-color': 'transparent', 'border-bottom': '1px solid rgba(255,255,255,0.2)','color': '#fff','line-height': '1em', 'padding':'8 12px'}"
                field="SubnetMask" editor="boolean"
                title="Subnet mask">
                <ng-template kendoGridEditTemplate let-dataItem="dataItem">
                  <input [(ngModel)]="dataItem.SubnetMask" kendoGridFocusable name="SubnetMask"/>
                </ng-template>
              </kendo-grid-column>
              <kendo-grid-command-column
                [headerStyle]="{'border-bottom': '1px solid #ff007f','background-color': 'transparent','color': '#fff','line-height': '1em', 'padding':'8 12px'}"
                title="" [width]="70">
                <ng-template kendoGridHeaderTemplate let-column let-columnIndex="columnIndex">
                  <button kendoGridAddCommand [icon]="'plus-outline'" style="color: blue;"> Add</button>
                </ng-template>
                <ng-template kendoGridCellTemplate let-isNew="isNew">
                  <button kendoGridEditCommand [icon]="'edit'" [primary]="true"></button>
                  <button kendoGridRemoveCommand [icon]="'delete'"></button>
                  <button kendoGridSaveCommand [icon]="'check'" [disabled]="myForm.invalid"></button>
                  <button kendoGridCancelCommand [icon]="'close'"></button>
                </ng-template>
              </kendo-grid-command-column>
            </kendo-grid>
          </form>
        </div>
      </section>
    </div>
  `
})
export class AppComponent {
  public routes: any[] = routes;
  public headerStyles: any = this.headerStyles;
  public headerStyleMiddle: any;
  public multiple = false;
  public allowUnsort = false;
  public sort: SortDescriptor[] = [{
    field: 'Gateway',
    dir: 'asc'
  }];
  public gridView: GridDataResult;

  constructor() {
    this.loadProducts();
  }

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.loadProducts();
  }

  private loadProducts(): void {
    this.gridView = {
      data: orderBy(this.routes, this.sort),
      total: this.routes.length
    };
  }
  createNewProduct(): Route {
    return new Route();
  }
}
