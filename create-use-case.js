const { capitalizedValue, createFile, camelCaseValue } = require("macrox");

createFile(`./src/useCases/${capitalizedValue}/${capitalizedValue}.ts`, `
  import { ${capitalizedValue}DTO } from "./${capitalizedValue}DTO";
  import { hasPermission } from "../../helpers/hasPermission";
  import { ${capitalizedValue}Validator } from "./${capitalizedValue}Validator";
  import { ValidationException } from "../../exceptions/ValidationException";
  import { RequiredPermissionException } from "../../exceptions/RequiredPermissionException";

  type Response = Promise<void>;

  export class ${capitalizedValue} {
    public static execute = async (dto: ${capitalizedValue}DTO): Response => {
      const validationResult = await ${capitalizedValue}Validator.validateDTO(dto);

      if(validationResult.isError) {
        throw new ValidationException(validationResult.error);
      }

      const ${camelCaseValue}Permission = \`${capitalizedValue}\`;
      const has${capitalizedValue}Permission = await hasPermission(dto.token, ${camelCaseValue}Permission);

      if(!has${capitalizedValue}Permission) {
        throw new RequiredPermissionException(${camelCaseValue}Permission);
      }
    }
  }

`);

createFile(`./src/useCases/${capitalizedValue}/${capitalizedValue}Validator.ts`, `
  import { ${capitalizedValue}DTO } from "./${capitalizedValue}DTO";
  import { ValidationResult } from "../../common/ValidationResult";

  type Response = Promise<ValidationResult>;

  export class ${capitalizedValue}Validator {
    public static validateDTO = async (dto: ${capitalizedValue}DTO): Response => {
      return ValidationResult.ok();
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
  import { GenericContainer } from "testcontainers";

`);

createFile(`./src/useCases/${capitalizedValue}/${capitalizedValue}.spec.ts`, `
  import { ${capitalizedValue} } from "./${capitalizedValue}";
  import { ${capitalizedValue}DTO } from "./${capitalizedValue}DTO";
  import { hasPermission } from "../../helpers/hasPermission";
  import { ${capitalizedValue}Validator } from "./${capitalizedValue}Validator";
  import { ValidationResult } from "../../common/ValidationResult";
  import { ValidationException } from "../../exceptions/ValidationException";
  import { RequiredPermissionException } from "../../exceptions/RequiredPermissionException";

  jest.mock("./${capitalizedValue}Validator");
  jest.mock("../../helpers/hasPermission");

  const mocked${capitalizedValue}Validator = jest.mocked(${capitalizedValue}Validator);
  const mockedHasPermission = jest.mocked(hasPermission);

  test("${capitalizedValue}.execute should throw ValidationException if the dto contain a invalid value", async ()=> {
    // Simulate that the dto contain a invalid value
    mocked${capitalizedValue}Validator.validateDTO.mockImplementation(()=> {
      return Promise.resolve(ValidationResult.error("Invalid DTO"));
    })

    const resultPromise = ${capitalizedValue}.execute({} as ${capitalizedValue}DTO);

    await expect(resultPromise).rejects.toBeInstanceOf(ValidationException);
  })

  test("${capitalizedValue}.execute should throw RequiredPermissionException if the token doesn't has '${capitalizedValue}' permission", async ()=> {
    // Simulate that the dto contain a invalid value
    mocked${capitalizedValue}Validator.validateDTO.mockImplementation(()=> {
      return Promise.resolve(ValidationResult.ok());
    })

    // Simulate that the token doesn't has '${capitalizedValue}' permission
    mockedHasPermission.mockImplementation(()=> {
      return Promise.resolve(false);
    })

    const resultPromise = ${capitalizedValue}.execute({} as ${capitalizedValue}DTO);

    await expect(resultPromise).rejects.toBeInstanceOf(RequiredPermissionException);
  })

`);

createFile(`./src/useCases/${capitalizedValue}/README.md`, `
  # ${capitalizedValue}

  Aqui va una descripción...

  ${"```"}typescript 
  ${capitalizedValue}.execute(dto: ${capitalizedValue}DTO): Promise<void>;
  ${"```"}

  ## Permisos requeridos

  ${"```"}${capitalizedValue}${"```"}

`);

createFile(`./src/useCases/${capitalizedValue}/${capitalizedValue}.http`, ``);
