import { Component, OnInit, ViewChild } from '@angular/core';
import { AllCommunityModules, Module, GridOptionsWrapper } from '@ag-grid-community/all-modules'
import {GridOptions,IDatasource,IGetRowsParams} from "ag-grid-community/main";
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Subscription, forkJoin } from 'rxjs';
import { ITitle } from '../interfaces/Title';
import { ILocalizedTitle } from '../interfaces/localizedTitle';
import { BookService } from '../services/book.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import {AllModules} from '@ag-grid-enterprise/all-modules';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})

export class GridComponent implements OnInit {
  
        public gridApi;
        public gridColumnApi;
        public modules: Module[] = AllModules;
        public pivotedJson  = [];
        public titles:ITitle[];
        public localizedTitles:ILocalizedTitle[];
        public gridData : [];
        public autoGroupColumnDef;
        public columnDefs;
        public columnDefs1;
        public defaultColDef;
        public components;
        public rowBuffer;
        public rowSelection;
        public rowModelType;
        public paginationPageSize;
        public cacheOverflowSize;
        public maxConcurrentDatasourceRequests;
        public infiniteInitialRowCount;
        public maxBlocksInCache;
        //public rowData: [];
        public rowData;
        public sideBar;
        public subscription : Array<Subscription> =  [];
        public domLayout;
      
  constructor(private bookservice:BookService) { 
    
    this.columnDefs1 = [];  
    
    //   this.columnDefs1 = [
    //     {headerName: 'Make', field: 'make' },
    //     {headerName: 'Model', field: 'model' },
    //     {headerName: 'Price', field: 'price'}
    // ];

    // this.rowData = [
    //     { make: 'Toyota', model: 'Celica', price: 35000 },
    //     { make: 'Ford', model: 'Mondeo', price: 32000 },
    //     { make: 'Porsche', model: 'Boxter', price: 72000 }
    // ];

    this.defaultColDef = {                
      sortable:true,
      filter: true        
    };
    
      this.sideBar = {
      toolPanels:[
        {
          id: "columns",
          toolPanel: "agColumnsToolPanel",
          labelDefault: "Columns",
          labelKey: "columns",
          iconKey: "columns",
          toolPanelParams: {
            suppressRowGroups: false,
            suppressValues: true,
            suppressPivots: false,
            suppressPivotMode: false,
            suppressSideButtons: false,
            suppressColumnFilter: false,
            suppressColumnSelectAll: true,
            suppressColumnExpandAll: false
          }
        }
      ]
    };
   
  }
  
  ngOnInit() {      
    
  } 

  onGridReady(params){      

     this.gridApi = params.api;
     this.gridColumnApi = params.gridColumnApi;  
        

     this.bookservice.getPivotedTitles().subscribe(data => {
      this.rowData = data;
      this.gridData = data;
      this.columnDefs1 = this.generateColumns2(this.gridData);                  
    });            
      
  }

  generateColumns2(data:any[]){

    var colNames = [] = Object.keys(data[0]);      
    var finalColumnDef = [];      
    
    for (let i = 0; i < colNames.length; i++) {        
      
      if(colNames[i].includes('_') == false){
        if(finalColumnDef.length == 0 || finalColumnDef.findIndex(obj => obj.headerName == colNames[i]) == -1){            
          finalColumnDef.push({headerName:colNames[i],field:colNames[i]});
        }          
      }
      else {
        let splittedString = colNames[i].split('_');

        if(finalColumnDef.findIndex(obj => obj.headerName == splittedString[0]) == -1){
          finalColumnDef.push({
            headerName:splittedString[0]
            ,groupId:splittedString[0] + 'Group'
            ,children:[{
            headerName:splittedString[1]
            ,field:colNames[i]
            }]
          });
        }
        else{
          let existingHeader = finalColumnDef.findIndex(obj => obj.headerName == splittedString[0])
          finalColumnDef[existingHeader].children.push({
            headerName:splittedString[1]
            ,field:colNames[i]
          });            
        }          
      }
    }
    debugger;
    return finalColumnDef;  
  }
  

  generateColumns(data: any[]) {
    debugger;
    
    let columnDefinitions = [];
    


    let columnNames = [] = Object.keys(data[0]);

    data.map(object => {        
      Object.keys(object)
        .map(key => {
          let mappedColumn = {
            headerName: key.toUpperCase(),
            field: key,
            width:150,
            filter: "agTextColumnFilter",                
            filterParams: { defaultOption: "startsWith" }
          
            //enableRowGroup: true
          }
         columnDefinitions.push(mappedColumn);
       })
    })
    
    return columnDefinitions;
  }

}
