export interface IRepository<Entity> {
  save(entity: Entity): Promise<void>;
  delete(entity: Entity): Promise<void>;
  findOne(filter: any): Promise<Entity>;
  findMany(filter: any, skip?: number, limit?: number): Promise<Entity[]>
}
