import { BoxFighterWebappPage } from './app.po';

describe('box-fighter-webapp App', () => {
  let page: BoxFighterWebappPage;

  beforeEach(() => {
    page = new BoxFighterWebappPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
