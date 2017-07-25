import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// import { DataStorageService } from '../../shared/data-storage.service';
import { RankingDisplayService } from '../../ranking/ranking-display.service';
import { PlayersService } from '../../players/players.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private rankingService: RankingDisplayService,
    private pService: PlayersService) { }

  ngOnInit() {
  }

  setMale() {
    this.pService.genderChanged();
    this.rankingService.onGenderChangetoMale();
  }
  setFemale() {
    this.pService.genderChanged();
    this.rankingService.onGenderChangetoFemale();
  }

}
