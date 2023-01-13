const { camelCaseValue, capitalizedValue, createFile } = require("macrox");

createFile(`./src/entities/${capitalizedValue}.ts`, `
  import { IEntity } from "../common/IEntity";

  export interface ${capitalizedValue} extends IEntity { }

`);

createFile(`./src/mappers/${capitalizedValue}Mapper.ts`, `
  import { ${capitalizedValue} } from "../entities/${capitalizedValue}";

  export class ${capitalizedValue}Mapper {
    public static toJSON = (${camelCaseValue}: ${capitalizedValue})=> {
      return {
        id: ${camelCaseValue}.id,
        createdAt: ${camelCaseValue}.createdAt,
        updatedAt: ${camelCaseValue}.updatedAt,
        deletedAt: ${camelCaseValue}.deletedAt,
        isDeleted: ${camelCaseValue}.isDeleted
      }
    }
  }

`);

createFile(`./src/repositories/${capitalizedValue}Repository/${capitalizedValue}Repository.ts`, `
  import { Schema, model } from "mongoose";
  import { ${capitalizedValue} } from "../../entities/${capitalizedValue}";
  import { MongoRepository } from "../../common/MongoRepository";

  const ${capitalizedValue}Schema = new Schema<${capitalizedValue}>({
    id: {type: String, required: true},
    createdAt: {type: String, required: true},
    updatedAt: {type: String, required: true},
    deletedAt: {type: String, required: false},
    isDeleted: {type: Boolean, required: true}
  })

  const ${capitalizedValue}Model = model("${capitalizedValue}", ${capitalizedValue}Schema);

  const ${capitalizedValue}Repository = new MongoRepository<${capitalizedValue}>(${capitalizedValue}Model);

  export { ${capitalizedValue}Repository };

`);

createFile(`./src/repositories/${capitalizedValue}Repository/${capitalizedValue}Repository.test.ts`, `
  import { UserRepository } from "./UserRepository";
  
`);

createFile(`./src/repositories/${capitalizedValue}Repository/${capitalizedValue}Repository.spec.ts`, `
  import { UserRepository } from "./UserRepository";
  
`);

createFile(`./src/repositories/${capitalizedValue}Repository/README.md`, `
  # ${capitalizedValue}Repository

  Aqui va una descripción...

  ${"```"}typescript
  ${capitalizedValue}Repository.save(${camelCaseValue}: ${capitalizedValue}): Promise<void>;
  ${capitalizedValue}Repository.findOne(filter: any): Promise<${capitalizedValue}>;
  ${capitalizedValue}Repository.findMany(filter: any, skip?: number, limit?: number): Promise<${capitalizedValue}[]>;
  ${"```"}

`);
