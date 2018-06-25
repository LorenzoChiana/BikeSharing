import { InsertDbModule } from './insert-db.module';

describe('InsertDbModule', () => {
  let insertDbModule: InsertDbModule;

  beforeEach(() => {
    insertDbModule = new InsertDbModule();
  });

  it('should create an instance', () => {
    expect(insertDbModule).toBeTruthy();
  });
});
