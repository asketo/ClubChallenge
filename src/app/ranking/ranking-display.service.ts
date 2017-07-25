import { Injectable } from '@angular/core';

import { DataStorageService } from '../shared/data-storage.service';
import { PlayersService } from '../players/players.service';
import { ConnectionParametersService } from '../hidden/connection-parameters.service';

@Injectable()
export class RankingDisplayService {
  private malePlayersUrl = this.connectionService.getMaleUrl();
  private femalePlayersUrl = this.connectionService.getFemaleUrl();
  private gender =  '';

  constructor(
    private dss: DataStorageService,
    private pService: PlayersService,
    private connectionService: ConnectionParametersService) {}

  onGenderChangetoMale() {
    this.gender = 'male';
    this.dss.getPlayers(this.malePlayersUrl);
    this.pService.genderChanged();
  }

  onGenderChangetoFemale() {
    this.gender = 'female';
    this.dss.getPlayers(this.femalePlayersUrl);
    this.pService.genderChanged();
  }

  getGender() {
    return this.gender;
  }

  getMaleUrl() {
    return this.malePlayersUrl;
  }

  getFemaleUrl() {
    return this.femalePlayersUrl;
  }
}
