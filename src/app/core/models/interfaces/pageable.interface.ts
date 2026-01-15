export interface Pageable<T> {
  content: T[];
  size: number;
  number: number;
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}
