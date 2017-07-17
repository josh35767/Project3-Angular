import { PracticeLyricsPage } from './app.po';

describe('practice-lyrics App', () => {
  let page: PracticeLyricsPage;

  beforeEach(() => {
    page = new PracticeLyricsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
