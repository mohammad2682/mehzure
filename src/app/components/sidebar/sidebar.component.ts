import { Component } from '@angular/core';
import { SendTicketComponent } from '../send-ticket/send-ticket.component';
import { MatDialog } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(private _dialog: MatDialog, private _coreService: CoreService) {}

  ngOnInit(): void {
    // this.getWorkItems();
  }

  openAddEditWorkItem() {
    const dialogRef = this._dialog.open(SendTicketComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          // this.getWorkItems();
        }
      },
    });
  }
}
