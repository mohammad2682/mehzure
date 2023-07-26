export interface WorkItem {
  op: string;
  path: string;
  from: string;
  value: string;
}
export interface Ticket {
  workItems: WorkItem[];
  workItemType: string;
}
