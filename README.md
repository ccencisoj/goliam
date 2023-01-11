# node-template

## Macros

#### Entity

```node create-entity user```

- Creará ```User.ts``` en ```src/entities```
- Creará ```UserMapper.ts``` en ```src/mappers```
- Creará ```UserRepository.ts``` en ```src/repositories```

```
src
  entities
    User.ts
  mappers
    UserMapper.ts
  repositories
    UserRepository.ts
```

```node delete-entity user```

- Eliminará ```User.ts``` de ```src/entities```
- Eliminará ```UserMapper.ts``` de ```src/mappers```
- Eliminará ```UserRepository.ts``` de ```src/repositories```

#### UseCase

```node create-use-case CreateUser```

- Creará la carpeta ```CreateUser``` en ```src/useCases```
- Creará ```CreateUser.ts``` en ```src/useCases/CreateUser```
- Creará ```CreateUserDTO.ts``` en ```src/useCases/CreateUser```
- Creará ```CreateUserController.ts``` en ```src/useCases/CreateUser```
- Creará ```CreateUser.test.ts``` en ```src/useCases/CreateUser```
- Creará ```CreateUser.http``` en ```src/useCases/CreateUser```
- Creará ```README.md``` en ```src/useCases/CreateUser```

```
src
  useCases
    CreateUser.ts
    CreateUserDTO.ts
    CreateUserController.ts
    CreateUser.test.ts
    CreateUser.http
    README.md
```

```node delete-use-case CreateUser```

- Eliminará la carpeta ```CreateUser``` de ```src/useCases```

#### Validators

```node create-validator validateId```

- Creará ```validateId.ts``` en ```src/validators```
- Creará ```validateId.test.ts``` en ```src/validators```

```
src
  validators
    validateId.t
    validateId.test.ts
```




