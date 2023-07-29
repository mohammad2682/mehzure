import { TestBed } from '@angular/core/testing';

import { WorkItemDialogService } from './work-item-dialog.service';

describe('WorkItemDialogService', () => {
  let service: WorkItemDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkItemDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
