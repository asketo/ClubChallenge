import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataStorageService } from '../../shared/data-storage.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private dService: DataStorageService) { }

  ngOnInit() {
  }

}
