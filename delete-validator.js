const { camelCaseValue, removeFile } = require("macrox");

removeFile(`./src/validators/${camelCaseValue}.ts`);
removeFile(`./src/validators/${camelCaseValue}.test.ts`);
