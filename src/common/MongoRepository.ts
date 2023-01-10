import { Model } from "mongoose";
import { IEntity } from "./IEntity";
import { IRepository } from "./IRepository";
import { getCurrentDate } from "../helpers/getCurrentDate"; 

type PartialEntity<Entity> = Omit<Entity, "createdAt" | "updatedAt" | "deletedAt" | "isDeleted">;

export class MongoRepository<Entity extends IEntity> implements IRepository<Entity> {
  public readonly model: Model<Entity>;
  
  public constructor(model: Model<Entity>) {
    this.model = model;
  }
  
  public save = async (entity: PartialEntity<Entity>): Promise<void> => {
    const repoEntity = await this.findOne({id: entity.id});
    const entityAlreadyCreated = !!repoEntity;
    
    if(entityAlreadyCreated) {
      const updatedAt = getCurrentDate(); 
      await this.model.updateOne({id: entity.id}, {...entity, updatedAt});

    }else {
      const createdAt = getCurrentDate();
      const updatedAt = getCurrentDate();
      await this.model.create({...entity, createdAt, updatedAt, isDeleted: false});
    }
  }

  public delete = async (entity: PartialEntity<Entity>): Promise<void> => {
    const repoEntity = await this.findOne({id: entity.id});
    const entityDeleted = !repoEntity || repoEntity.isDeleted;
    if(entityDeleted) return;
    const deletedAt = getCurrentDate();
    await this.model.updateOne({id: repoEntity.id}, {...repoEntity, deletedAt, isDeleted: true});
  }

  public findOne = async (filter: any): Promise<Entity> => {
    const entity = await this.model.findOne({isDeleted: false, ...filter});
    if(entity) return entity.toObject<Entity>();
    return null;
  }

  public findMany = async (filter: any, skip?: number, limit?: number): Promise<Entity[]> => {
    const entities = await this.model.find({isDeleted: false, ...filter}).skip(skip).limit(limit);
    const entitiesObj = entities.map((entity)=> entity.toObject<Entity>());
    return entitiesObj;
  }
}
