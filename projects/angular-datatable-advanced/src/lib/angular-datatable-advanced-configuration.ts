import {InjectionToken} from '@angular/core';

export interface AngularDatatableAdvancedConfiguration {
    filterTranslate: FilterTranslate;
}

export interface FilterTranslate {
    contains: string;
    startsWith: string;
    endsWith: string;
    equals: string;
    notEquals: string;
    range: string;
    in: string;
    nin: string;
    greaterThan: string;
    greaterThanOrEquals: string;
    lessThan: string;
    lessThanOrEquals: string;

    applyFilter: string;
    clearFilter: string;
    filterOutOptions: string;
    filterRangeFrom: string;
    filterRangeTo: string;
    filterPlaceholder: string;
}

const DEFAULT_CONFIG: AngularDatatableAdvancedConfiguration = {
    filterTranslate: {
        contains: 'Contains',
        startsWith: 'Starts with',
        endsWith: 'Ends with',
        equals: 'Equals',
        notEquals: 'Not equals',
        range: 'Range',
        in: 'In',
        nin: 'Not in',
        greaterThan: 'Greater then',
        greaterThanOrEquals: 'Greater then or equals',
        lessThan: 'Less than',
        lessThanOrEquals: 'Less than or equals',

        applyFilter: 'Apply filter',
        clearFilter: 'Clear filter',
        filterOutOptions: 'Filter out options',
        filterRangeFrom: 'From',
        filterRangeTo: 'To',
        filterPlaceholder: 'Filter'
    }
};

export { DEFAULT_CONFIG };

export const ANGULAR_DATATABLE_ADVANCED_CONFIGURATION = new InjectionToken('ANGULAR_DATATABLE_ADVANCED_CONFIGURATION');
