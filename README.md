# Api Folha do Saber

> Base url :

## Endpoints

### Cadastrar <br/>

1. Fazer cadastro de novo usuário

    `POST/users` <br/>

```json
{
    "name": "Lagartinha Raios Funde",
    "email": "lagartinha@gmail.com",
    "password": "123456"
}
```

Essa rota devera criar um usuário retornando todos os dados passados no corpo da requisição, exceto o hash de senha. Chave isAdm e isWriter são false por padrao.

Exemplo de resposta:

**Status 201 Created**

```json
   {
       "isAdm": false
       "isWriter": false,
       "createdAt": 07/09/2022,
       "updatedAt": 07/09/2022,
       "id": "723b83f4-ccbc-4ad3-9074-c5ef6726ce30"
       "name": "Lagartinha Raios Funde",
       "email": "lagartinha@gmail.com",
   }
```

OBS:O primeiro usuário cadastrado do banco de dados será um "isAdm: true", os demais serão i"sAdm: false" por padrão.

Possíveis Problemas:

-   Tentando criar um usuario que já existe

**Status 400 Bad Request**

```json
{
    "status": "Error",
    "code": 400,
    "message": "User already exists"
}
```

-Tentando criar um usuario sem passar algum dado do corpo da requisicao

**Status 400 Bad Request**

caso sem name:

```json
{
    "status": "error",
    "code": 400,
    "message": "Name is required"
}
```

caso sem email:

```json
{
    "status": "error",
    "code": 400,
    "message": "Email is required"
}
```

caso sem password:

```json
{
    "status": "error",
    "code": 400,
    "message": "Password is required"
}
```

### Logar <br/>

2- Fazendo login de usuários

`POST /login`<br/>

```json
{
    "email": "erick@gmail.com",
    "password": "123456"
}
```

Essa rota deve fazer o login do usuário já cadastrado retornando seu token de acesso.

Exemplo de resposta:

**Status 200 OK**

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbSI6ZmFsc2UsImlhdCI6MTY2MjA0NzQyMSwiZXhwIjoxNjYyMDU0NjIxLCJzdWIiOiJmYjY5OTlkMy04OTUyLTQ3NmQtODBjMi01Yjc5NzU1MzE1YTMifQ.1Ht6d00TvFwDQeNGO6l5UhFCsC9wC5GR2SDwjcgNu84"
}
```

Possiveis Problemas:

-   Se o usuario não existir

**Status 404 Not Found**

```json
{
    "status": "Error",
    "code": 404,
    "message": "User not found"
}
```

-   Se o usuario ja existir

**Status 400 Bad Request**

```json
{
    "status": "Error",
    "code": 400,
    "message": "User already exists"
}
```

-   Se email ou senha estiverem errados

**Status 403 Forbidden**

```json
{
    "status": "Error",
    "code": 403,
    "message": "Invalid Email or password"
}
```

Obs: Por questões de segurança quando existir conflito na comparacao de de email ou senha nunca especificar qual esta incorreto.

### listar <br/>

3- Listando usuarios

`GET/users`<br/>

```json
//no body
```

Essa rota deve retornar todos os usuarios se voce tiver token de acesso(admin ou redator).

Exemplo de Resposta:

**Status 200 OK**

```json
[
{
"id": "723b83f4-ccbc-4ad3-9074-c5ef6726ce30"
"name": "Lagartinha Raios Funde",
"email": "lagartinha@gmail.com",
"isAdm": false
"isWriter": false,
"createdAt": 07/09/2022,
"updatedAt": 07/09/2022,
}

{
"id": "123b4524-nbac-4c33-9555-c5ef6726ce55"
"name": "Dean Campbell Winchester",
"email": "Dean@gmail.com",
"isAdm": true
"isWriter": false,
"createdAt": 07/09/2022,
"updatedAt": 07/09/2022,
}

{
"id": "123b4524-nbac-4c33-9555-c5ef6726ce55"
"name": "Kushina Maria",
"email": "kusha@gmail.com",
"isAdm": false
"isWriter": true,
"createdAt": 07/09/2022,
"updatedAt": 07/09/2022,
"writer":{
"id": "217d3d86-e6dc-455a-9873-b077d9c6e84e",
"userId": "123b4524-nbac-4c33-9555-c5ef6726ce55",
"bio" : "Jornalismo por amor.!",
"profileImage":"https://i.ytimg.com/vi/nr229Fd9aiA/hqdefault.jpg"
}
}

]
```

Possiveis problemas

-   Se nao tiver token de administrador ou writer

**Status 401 Unauthorized**

```json
{
    "status": "Error",
    "code": 401,
    "message": "Invalid token"
}
```

-   Se nao tiver um token de acesso

**Status 401 Unauthorized**

```json
{
    "status": "Error",
    "code": 401,
    "message": "Missing token"
}
```

### Atualizar<br/>

3- Fazendo atualizacao de usuario

`PATCH /users/:id`<br/>

Essa rota deve permitir que o usuario possa editar informacoes dele mesmo colocando seu id gerado no monento de criacao na url.
Se for adiministrador pode modificar de qualquer forma.

Exemplo de mudança:

```json
{
"id": "723b83f4-ccbc-4ad3-9074-c5ef6726ce30"
"name": "Lagartinha Raios ", // <= Exemplo de mudança
"email": "lagartRaiss@gmail.com", // <= Exemplo de mudança
"isAdm": false
"isWriter": false,
"createdAt": 07/09/2022,
"updatedAt": 07/09/2022,
}
```

Exemplo de resposta:

**Status 201 Created**

```json
{
"id": "723b83f4-ccbc-4ad3-9074-c5ef6726ce30"
"name": "Lagartinha Raios ",
"email": "lagartRaiss@gmail.com",
"isAdm": false
"isWriter": false,
"createdAt": 07/09/2022,
"updatedAt": 07/09/2022,
}
```

Possiveis problemas:

-   Se o usuario que nao for administrador estiver tentando mudar o campo isAdm para true

**Status 401 Unauthorized**

```json
{
    "status": "Error",
    "code": 401,
    "message": "Invalid token"
}
```

-   Se o usuario estiver tentando modificar um usuario que nao seja ele mesmo

**Status 401 Unauthorized**

```json
{
    "status": "Error",
    "code": 401,
    "message": "Invalid token"
}
```

### Excluir<br/>

4- Fazendo exclusão de usuario

`DELETE/users/:id`<br/>

Essa rota deve permitir ao usuario que ele possa exluir ele mesmo se caso desejar, colocando seu id gerado no monento de criacao na url.
Se for adiministrador pode modificar de qualquer forma.

```json
//No body
```

Exemplo de resposta:

**Status 204 Not Content**

Possiveis Problemas:

-   Se o usuario nao for administrador

**Status 403 Forbidden**

```json
{
    "status": "Error",
    "code": 403,
    "message": "Missing adm permissions"
}
```

-   Se o usuario passar um id invalido

**Status 404 Not found**

```json
{
    "status": "Error",
    "code": 404,
    "message": "User not found"
}
```
