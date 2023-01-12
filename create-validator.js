const { camelCaseValue, createFile } = require("macrox");

createFile(`./src/validators/${camelCaseValue}/${camelCaseValue}.ts`, `
  import { ValidationResult } from "../../common/ValidationResult";
  
  export const ${camelCaseValue} = (value: string): ValidationResult => {
    return ValidationResult.ok();
  }
`);

createFile(`./src/validators/${camelCaseValue}/${camelCaseValue}.test.ts`, `
  import { ${camelCaseValue} } from "./${camelCaseValue}";
  
`);
