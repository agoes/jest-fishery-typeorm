import { TestDataSource } from "../data-source";

export class TestHelper {
  private static instance: TestHelper;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): TestHelper {
    if(!this.instance) this.instance = new TestHelper();

    return this.instance;
  }

  async setUp(): Promise<void> {
    const initialized = TestDataSource.isInitialized;
    if (!initialized) {
      await TestDataSource.initialize();
    }
  }

  async tearDown(entities: any[]) {
    for(const entity of entities) {
      await TestDataSource.manager.getRepository(entity).clear()
    }
  } 
}