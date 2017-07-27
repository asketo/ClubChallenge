import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PlayersService } from '../../players/players.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private pService: PlayersService) { }

  ngOnInit() {
  }

}
