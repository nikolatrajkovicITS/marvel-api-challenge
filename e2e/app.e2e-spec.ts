import { NikolaTrajkovicTestAppPage } from './app.po';

describe('nikola-trajkovic-test-app App', () => {
  let page: NikolaTrajkovicTestAppPage;

  beforeEach(() => {
    page = new NikolaTrajkovicTestAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
