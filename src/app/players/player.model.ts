export class Player {
    $key: string;
    uid: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public gender: string;
    public rank: number;
    public challenged = false;
    public activeChallengeUID: string;
    public activeChallenge: {
      activeChallengeUID: string,
      opponentsFirstName: string,
      opponentsLastName: string,
      opponentsUID: string,
      isChallenger: string
    }
}
