import { WorkItemService } from 'src/app/services/work-item.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { WorkItemDialogService } from 'src/app/services/work-item-dialog.service';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css'],
})
export class BacklogComponent {
  displayedColumns: string[] = ['id', 'title', 'assignedTo', 'state', 'action'];

  loading: boolean = false;

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _workItemList: WorkItemService,
    private _dialog: MatDialog,
    private _workItemDialogService: WorkItemDialogService
  ) {}

  ngOnInit(): void {
    this._workItemDialogService.formSubmitted$.subscribe((result: boolean) => {
      if (result === true) {
        this.getWorkItemList();
      }
    });

    this.getWorkItemList();
  }

  getWorkItemList() {
    this.loading = true;
    this._workItemList.getWorkItems().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.loading = false;
      },
      error: console.error,
    });
  }

  onFormSubmitted() {
    this.getWorkItemList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEditForm(data: any) {}
  deleteEmployee(data: any) {}
}
