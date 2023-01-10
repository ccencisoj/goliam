const { capitalizedValue, createFile, camelCaseValue } = require("macrox");

createFile(`./src/useCases/${capitalizedValue}/${capitalizedValue}.ts`, `
  import { ${capitalizedValue}DTO } from "./${capitalizedValue}DTO";
  import { hasPermission } from "../../helpers/hasPermission";
  import { ValidationResult } from "../../common/ValidationResult";
  import { ValidationException } from "../../exceptions/ValidationException";
  import { RequiredPermissionException } from "../../exceptions/RequiredPermissionException";

  type Response = Promise<void>;

  export class ${capitalizedValue} {
    public static execute = async (req: ${capitalizedValue}DTO): Response => {
      const validationResult = ValidationResult.combine([]);

      if(validationResult.isError) {
        throw new ValidationException(validationResult.error);
      }

      const ${camelCaseValue}Permission = \`${capitalizedValue}\`;
      const has${capitalizedValue}Permission = hasPermission(req.token, ${camelCaseValue}Permission);

      if(!has${capitalizedValue}Permission) {
        throw new RequiredPermissionException(${camelCaseValue}Permission);
      }
    }
  }

`);

createFile(`./src/useCases/${capitalizedValue}/${capitalizedValue}DTO.ts`, `
  export interface ${capitalizedValue}DTO {
    token: string;
  }

`);

createFile(`./src/useCases/${capitalizedValue}/${capitalizedValue}Controller.ts`, `
  import { Request, Response } from "express";
  import { ${capitalizedValue} } from "./${capitalizedValue}";
  import { ${capitalizedValue}DTO } from "./${capitalizedValue}DTO";
  import { getTokenFromRequest } from "../../helpers/getTokenFromRequest";
  import { handleControllerError } from "../../helpers/handleControllerError";

  export class ${capitalizedValue}Controller {
    public static execute = async (req: Request, res: Response): Promise<void> => {
      try {
        const reqToken = getTokenFromRequest(req);

        const reqData = {
          token: reqToken
        } as ${capitalizedValue}DTO;

        await ${capitalizedValue}.execute(reqData);

        res.json({success: true});

      }catch(error) {
        handleControllerError(req, res, error);
      }
    }
  }

`);

createFile(`./src/useCases/${capitalizedValue}/${capitalizedValue}.test.ts`, `
  import { ${capitalizedValue} } from "./${capitalizedValue}";
  import { ${capitalizedValue}DTO } from "./${capitalizedValue}DTO";

`);

createFile(`./src/useCases/${capitalizedValue}/${capitalizedValue}.http`, ``);

createFile(`./src/useCases/${capitalizedValue}/README.md`, ``);
