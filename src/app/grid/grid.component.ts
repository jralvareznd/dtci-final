import { Component, OnInit } from '@angular/core';
import {GridOptions} from "@ag-grid-community/all-modules";
import { TitleApiService } from '../services/title-api.service';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  private destroy$: ReplaySubject<boolean> = new ReplaySubject();

  public columnDefs;
  public rowData;
  public gridOptions:GridOptions;

  private pageCount: number = 1000;
  private startRow: number = 0;
  private endRow: number = this.pageCount;
  private totalCount: number = 0;
  
  constructor(private titleMasterService: TitleApiService) { 
    this.gridOptions = <GridOptions>{
      onGridReady: () => {
          this.gridOptions.api.sizeColumnsToFit();
        }
      };
      this.columnDefs = [
        { headerName: 'Id', field: 'id' },
        { headerName: 'Title', field: 'name' },
        { headerName: 'Title Desc', field: 'description' }
      ];
  }

  ngOnInit(): void {  } 

  onGridReady(params) {
    let tempData: any = [];
    const sortModel = [
      { colId: 'id', sort: 'desc' }
    ];

    this.titleMasterService.get(this.startRow, this.endRow).pipe(takeUntil(this.destroy$)).subscribe(res => {
      this.totalCount = res.totalCount;
      this.rowData = res.titles;
      tempData = res.titles;
      
      while (this.startRow < this.totalCount) {
        this.startRow = this.startRow + this.pageCount;
        this.fetchRowData().then(res => {
          let combined = [].concat(tempData, res.titles);
          tempData = combined;
          params.api.setRowData(tempData);
        });
      }
    });

    params.api.setSortModel(sortModel);
  }

  async fetchRowData(){
    return await this.titleMasterService.get(this.startRow, this.endRow).pipe(takeUntil(this.destroy$)).toPromise();
  }

}
