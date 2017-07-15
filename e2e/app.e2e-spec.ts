import { ChallengeMePage } from './app.po';

describe('challenge-me App', () => {
  let page: ChallengeMePage;

  beforeEach(() => {
    page = new ChallengeMePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
