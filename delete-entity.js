const { capitalizedValue, removeFile, removeDir } = require("macrox");

removeFile(`./src/entities/${capitalizedValue}.ts`);
removeFile(`./src/mappers/${capitalizedValue}Mapper.ts`);
removeDir(`./src/repositories/${capitalizedValue}Repository.ts`);
