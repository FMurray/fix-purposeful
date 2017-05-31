import { SixVerticalPage } from './app.po';

describe('six-vertical App', () => {
  let page: SixVerticalPage;

  beforeEach(() => {
    page = new SixVerticalPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
