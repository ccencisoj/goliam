### CreateUser

Crea un usuario

## Entrada

```typescript

{
  token: string;
}

```

## Condiciones de entrada

- El "username" debe pasar la validación de "validateUsername" y debe ser unico
- El "email" debe pasar la validación de "validateUserEmail" y debe ser unico
- El "password" debe pasar la validación de "validateUserPassword" 
