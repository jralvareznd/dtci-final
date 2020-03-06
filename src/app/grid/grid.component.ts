import { Component, OnInit } from '@angular/core';
import {GridOptions} from "@ag-grid-community/all-modules";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  
  public columnDefs;
  public rowData;
  public gridOptions:GridOptions;
  
  constructor() { 
    this.gridOptions = <GridOptions>{
      onGridReady: () => {
          this.gridOptions.api.sizeColumnsToFit();
        }
      };
      this.columnDefs = [
          {headerName: "Make", field: "make", sortable: true, filter: true},
          {headerName: "Model", field: "model", sortable: true, filter: true},
          {headerName: "Price", field: "price", sortable: true, filter: true}
      ];
      this.rowData = [
          {make: "Toyota", model: "Celica", price: 35000},
          {make: "Ford", model: "Mondeo", price: 32000},
          {make: "Porsche", model: "Boxter", price: 72000}
      ];
  }

  ngOnInit(): void {  } 
}
