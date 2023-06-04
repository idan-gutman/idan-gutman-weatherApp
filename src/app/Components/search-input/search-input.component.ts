// search-input.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent {
  @Input()
  searchQuery!: FormControl;
  @Input()
  searchResults!:  any[] | null;
  @Input()
  loading!: boolean;
  @Input()
  errorMessage!: string | null;
  @Input()
  showNonEnglishMessage!: boolean;

  @Output() locationSelected: EventEmitter<any> = new EventEmitter<any>();

  onLocationSelected(result: any) {
    this.locationSelected.emit(result);
  }
}
