import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class SearchFilterPipe implements PipeTransform {
    transform(items: any[], searchText: string, subDataKey: string): any[] {
        if (!items || !searchText) {
          return items;
        }
        searchText = searchText.toLowerCase();
        return items.filter(item => 
          this.searchWithinProperties(item, searchText) || 
          this.searchWithinSubcategories(item, searchText, subDataKey)
        );
      }
    
      private searchWithinProperties(item: any, searchText: string): boolean {
        return item.name.toLowerCase().includes(searchText);
      }
    
      private searchWithinSubcategories(item: any, searchText: string, subDataKey: string): boolean {
        if (item[subDataKey] && item[subDataKey].length > 0) {
          for (const subcategory of item[subDataKey]) {
            for (const key in subcategory) {
              if (subcategory.hasOwnProperty(key)) {
                const value = subcategory[key];
                if (typeof value === 'string' && value.toLowerCase().includes(searchText)) {
                  return true;
                }
              }
            }
          }
        }
        return false;
      }
}