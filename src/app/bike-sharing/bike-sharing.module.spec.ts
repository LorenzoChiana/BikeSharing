import { BikeSharingModule } from './bike-sharing.module';

describe('BikeSharingModule', () => {
  let bikeSharingModule: BikeSharingModule;

  beforeEach(() => {
    bikeSharingModule = new BikeSharingModule();
  });

  it('should create an instance', () => {
    expect(bikeSharingModule).toBeTruthy();
  });
});
