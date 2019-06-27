import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface IDropDownList {
  name: string;
  value: number;
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  @Input() listItems: IDropDownList[];
  @Output() changedEvent = new EventEmitter(); 


  dropDownForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {

   this.dropDownForm = this.fb.group({
      dropDown: []
    });

  }

  changeItem(){
    this.changedEvent.emit(this.dropDownForm.get('dropDown').value);
  }

}
