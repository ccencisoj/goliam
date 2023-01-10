const { capitalizedValue, removeFile } = require("macrox");

removeFile(`./src/entities/${capitalizedValue}.ts`);
removeFile(`./src/mappers/${capitalizedValue}Mapper.ts`);
removeFile(`./src/repositories/${capitalizedValue}Repository.ts`);
