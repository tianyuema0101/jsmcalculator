import { Component, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ViewChild } from '@angular/core'
import { AdditionalInscriptionServiceService } from '../../services/additional-inscription-service.service';

@Component({
  selector: 'app-additional-inscription',
  templateUrl: './additional-inscription.component.html',
  styleUrls: ['./additional-inscription.component.css']
})
export class AdditionalInscriptionComponent implements OnInit {

  displayedColumns: string[] = ['name', 'type', 'price', 'edit'];
  dataSource: MatTableDataSource<AdditionalInscriptionServiceService>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private inscriptionService: AdditionalInscriptionServiceService) {
    this.inscriptionService.getAllInscriptions().subscribe((result)=>{
      console.log(result);
      this.dataSource = new MatTableDataSource(result["data"]["inscription"])
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  });
   }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
  }


}
