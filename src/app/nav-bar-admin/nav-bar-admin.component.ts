import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar-admin',
  templateUrl: './nav-bar-admin.component.html',
  styleUrls: ['./nav-bar-admin.component.css']
})

export class NavBarAdminComponent implements OnInit {
  @Input() client=false;
  @Input() specialiste=false;
  @Input() rendu=false;
  @Input() enquete=false;
  // @Input() client=false;

  constructor() { }

  ngOnInit(): void {
  }

}
