import { LoginRegModule } from './login-reg.module';

describe('LoginRegModule', () => {
  let loginRegModule: LoginRegModule;

  beforeEach(() => {
    loginRegModule = new LoginRegModule();
  });

  it('should create an instance', () => {
    expect(loginRegModule).toBeTruthy();
  });
});
