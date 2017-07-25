export class ConnectionParametersService {
  private malePlayersUrl = 'https://challenge-me-ca7c3.firebaseio.com/men.json';
  private femalePlayersUrl = 'https://challenge-me-ca7c3.firebaseio.com/women.json';

  public getMaleUrl() {
    return this.malePlayersUrl;
  }

  public getFemaleUrl() {
    return this.femalePlayersUrl;
  }

}
