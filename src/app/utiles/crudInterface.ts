
export interface CrudInterface<T> {
  wantCreate(item?: T): void;
  wantEdit(item?: T): void;
  wantDelete(item?: T): void;
}
