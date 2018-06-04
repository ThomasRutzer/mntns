export interface LevelDataLoaderInterface {
  loadByType(type: string): Promise<any>;
}