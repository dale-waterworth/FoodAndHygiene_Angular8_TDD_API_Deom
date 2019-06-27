import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-establishment-list',
  templateUrl: './establishment-list.component.html',
  styleUrls: ['./establishment-list.component.css']
})
export class EstablishmentListComponent implements OnInit {

  @Input() establishments;

  constructor() { }

  ngOnInit() {
  }

}
