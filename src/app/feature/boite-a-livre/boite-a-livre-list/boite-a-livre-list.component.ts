import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Box} from "../../../shared/models/box";
import {HttpClientModule} from "@angular/common/http";
import {BoxService} from "../../../shared/services/box.service";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {MatFormField} from "@angular/material/form-field";
import {Observable} from 'rxjs';
import {MatInput} from "@angular/material/input";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tableau',
  standalone: true,
  imports: [
    HttpClientModule,
    MatTable,
    MatColumnDef,
    MatSort,
    MatHeaderCellDef,
    MatHeaderCell,
    MatSortHeader,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatPaginatorModule,
    MatFormField,
    MatInput,
  ],
  templateUrl: './boite-a-livre-list.component.html',
  styleUrls: ['./boite-a-livre-list.component.css']
})
export class BoiteALivreListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nom', 'quantite', 'description', 'point_geo'];
  dataSource: MatTableDataSource<Box> = new MatTableDataSource<Box>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private boxService: BoxService,
              private router: Router) {}

  ngOnInit(): void {
    this.boxService.getAll().subscribe((data: Box[]) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterData(filterValue);
  }

  private filterData(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  goToForm(id: number) {
    this.router.navigate([`/boite-a-livres/${id}`]).then(r => r);
  }
}
