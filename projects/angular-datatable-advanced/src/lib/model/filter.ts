export enum FilterType {
  CONTAINS = 'CONTAINS',
  STARTS_WITH = 'STARTS_WITH',
  ENDS_WITH = 'ENDS_WITH',
  EQUALS = 'EQUALS',
  NOT_EQUALS = 'NOT_EQUALS',
  // IN = 'IN',
  RANGE = 'RANGE'
}

export class Filter {
  type?: FilterType;
  value1?: any;
  value2?: any;
}

