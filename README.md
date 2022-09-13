# Api Folha do Saber 

> Base url : https://folha-do-saber.herokuapp.com/

## Endpoints

### USUÁRIO:

#### Cadastrar Usuário <br/>

1. Fazer cadastro de novo usuário

    `POST/users` <br/>

```json
{
    "name": "Lagartinha Raios Funde",
    "email": "lagartinha@gmail.com",
    "password": "123456"
}
```

Essa rota deverá criar um usuário retornando todos os dados passados no corpo da requisição, exceto o hash de senha. Chave isAdm e isWriter são false por padrão.
OBS:O primeiro usuário cadastrado do banco de dados será um "isAdm: true", os demais serão "isAdm: false" por padrão.

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

Possíveis Problemas:

-Tentando criar um usuario que já existe

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

Caso sem name:

```json
{
    "status": "error",
    "code": 400,
    "message": "Name is required"
}
```

Caso sem email:

```json
{
    "status": "error",
    "code": 400,
    "message": "Email is required"
}
```

Caso sem password:

```json
{
    "status": "error",
    "code": 400,
    "message": "Password is required"
}
```

#### Logar Usuário <br/>

2- Fazendo login de usuários

`POST /login`<br/>

```json
{
    "email": "erick@gmail.com",
    "password": "123456"
}
```

Essa rota deve fazer o login do usuário já cadastrado retornando seu id e token de acesso.

Exemplo de resposta:

**Status 200 OK**

```json
{
    "id": "a43ab5ee-d7e7-4aec-98c7-612276091a06",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbSI6dHJ1ZSwiaXNXcml0ZXIiOmZhbHNlLCJ1c2VySWQiOiJhNDNhYjVlZS1kN2U3LTRhZWMtOThjNy02MTIyNzYwOTFhMDYiLCJpYXQiOjE2NjI5OTMzMTgsImV4cCI6MTY2MzA3OTcxOH0.qgWxle8gDSz8yv-eHv-4brFBs2SNbixGuz0SrnfCsmM"
}
```

Possiveis Problemas:

-Se email ou senha estiverem incorretos

**Status 403 Forbidden**

```json
{
    "status": "Error",
    "code": 403,
    "message": "Invalid Credentials"
}
```

-Se não for passado o campo de email

**Status 400 Bad Request**

```json
{
    "status": "error",
    "code": 400,
    "message": "Email is required"
}
```

-Se não for passado o campo de password
**Status 400 Bad Request**

```json
{
    "status": "error",
    "code": 400,
    "message": "Email is required"
}
```

OBS: Por questões de segurança quando existir conflito na comparacao de email ou senha nunca especificar qual esta incorreto

#### listar Usuário <br/>

3- Fazendo Listagem de Usuário

`GET/users`<br/>

```json
//no body
```

Essa rota deve retornar todos os usuarios se voce tiver token de acesso(admin WRITER).

Exemplo de Resposta:

**Status 200 OK**

```json
[
    {
        "createdAt": "2022-09-12T13:03:05.316Z",
        "updatedAt": "2022-09-12T13:03:05.316Z",
        "id": "a43ab5ee-d7e7-4aec-98c7-612276091a06",
        "name": "Tiberio",
        "email": "tiberio@bruno.com",
        "isAdm": true,
        "isWriter": false
    },
    {
        "createdAt": "2022-09-12T13:03:20.171Z",
        "updatedAt": "2022-09-12T13:03:20.171Z",
        "id": "0e2c2c70-d72c-4f1a-afff-e64a26237142",
        "name": "joao",
        "email": "joao@bruno.com",
        "isAdm": false,
        "isWriter": false
    },
    {
        "createdAt": "2022-09-12T13:03:25.657Z",
        "updatedAt": "2022-09-12T13:03:25.657Z",
        "id": "3fa4f7c1-1cea-4e3b-9544-6929c3081af1",
        "name": "Pedro",
        "email": "pedro@bruno.com",
        "isAdm": false,
        "isWriter": false
    },
    {
        "createdAt": "2022-09-12T13:06:05.853Z",
        "updatedAt": "2022-09-12T13:06:05.853Z",
        "id": "794d3577-b19e-4fe5-9a36-4f5404a9591f",
        "name": "Bruno Writer",
        "email": "writer@bruno.com",
        "isAdm": false,
        "isWriter": true
    },
    {
        "createdAt": "2022-09-12T14:35:56.227Z",
        "updatedAt": "2022-09-12T14:35:56.227Z",
        "id": "ae082774-99d9-426d-99a8-55149807a727",
        "name": "Bruno aaa Update/Delete",
        "email": "brunoupdate@bruno.com",
        "isAdm": false,
        "isWriter": false
    }
]
```

Possíveis Problemas:

-Se o usuário não tiver token de administrador

**Status 401 Unauthorized**

```json
{
    "status": "Error",
    "code": 401,
    "message": "Invalid token"
}
```

-   Se o usuário não tiver token de acesso

**Status 401 Unauthorized**

```json
{
    "status": "Error",
    "code": 401,
    "message": "Missing token"
}
```

-Se o usuário passar um token invalido

**Status 401 Unauthorized**

```json
    "status": "Error",
    "code": 401,
    "message": "User is not a writer neither an admnistrator"
```

#### Atualizar Usuário<br/>

3- Fazendo Atualização de Usuário

`PATCH /users/:id`<br/>

Exemplo de mudança:

```json
{
    "id": "723b83f4-ccbc-4ad3-9074-c5ef6726ce30",
    "name": "Lagartinha Raios ", // <= Exemplo de mudança
    "email": "lagartRaiss@gmail.com" // <= Exemplo de mudança
}
```

Essa rota deve permitir que o usuario possa editar informacoes dele mesmo colocando seu id gerado no monento de criacao na url E O TOKEN.
Se for adiministrador pode modificar de qualquer forma.

Exemplo de resposta:

**Status 200 OK**

```json
{
"id": "723b83f4-ccbc-4ad3-9074-c5ef6726ce30",
"name": "Lagartinha Raios ",
"email": "lagartRaiss@gmail.com",
"isAdm": false,
"isWriter": false,
"createdAt": 07/09/2022,
"updatedAt": 07/09/2022,
}
```

Possiveis problemas:

-   Se o usuario que não for administrador estiver tentando mudar o campo isAdm para true

**Status 401 Unauthorized**

```json
{
    "status": "Error",
    "code": 401,
    "message": "Unauthorized"
}
```

-Se o usuario estiver tentando modificar um usuario que nao seja ele mesmo ou admnistrador

**Status 401 Unauthorized**

```json
{
    "status": "Error",
    "code": 401,
    "message": "Unauthorized"
}
```

-Se o usuario nãopassar um token

**Status 401 Unauthorized**

```json
{
    "status": "Error",
    "code": 401,
    "message": "Token not found !"
}
```

#### Excluir Usuário<br/>

4- Fazendo exclusão de usuario

`DELETE/users/:id`<br/>

```json
//No body
```

Essa rota deve permitir ao usuario que ele possa exluir ele mesmo se caso desejar, colocando seu id gerado no monento de criacao na url.
Se for adiministrador pode modificar de qualquer forma.

Exemplo de resposta:

**Status 204 No Content**

Possiveis Problemas:

-Se o usuario nao for administrador

**Status 401 Unauthorized**

```json
{
    "status": "Error",
    "code": 401,
    "message": "Unauthorized"
}
```

-Se o usuario passar um id invalido

**Status 404 Not Found**

```json
{
    "status": "Error",
    "code": 404,
    "message": "News not found"
}
```

-Se o usuario nao passar um token de acesso

**Status 401 Unauthorized**

```json
{
    "status": "Error",
    "code": 401,
    "message": "Invalid token!"
}
```

-Se o usuario passar um token invalido
**Status 401 Unauthorized**

```json
{
    "status": "Error",
    "code": 401,
    "message": "Unauthorized"
}
```

-Se o usuario quiser deletar o coleguinha

**Status 401 Unauthorized**

```json
{
    "status": "Error",
    "code": 401,
    "message": "Invalid token"
}
```

### WRITER

#### Cadastrar Jornalista <br/>

1. Fazer cadastro de novo jornalista

`POST/writers` <br/>

```json
{
    "userId": "217d3d86-e6dc-455a-9873-b077d9c6e84e",
    "bio": "Jornalista, Radialista e Professor",
    "profileImage": "https://yt3.ggpht.com/ytc/AMLnZu9l69ERDapKp036CRUt4l8-uLFgRslXDaEyCq6RDDk=s900-c-k-c0x00ffffff-no-rj"
}
```

Essa rota deve permitir que um administrador cadastre um novo escritor.
OBS: Apenas administradores podem cadastrar novos escritores.

Exemplo de resposta:

**Status 201 Created**

```json
{
    "profileImage": "https://yt3.ggpht.com/ytc/AMLnZu9l69ERDapKp036CRUt4l8-uLFgRslXDaEyCq6RDDk=s900-c-k-c0x00ffffff-no-rj",
    "id": "e118d585-35ae-4438-b233-e3e52061960c",
    "user": {
        "createdAt": "2022-09-12T13:06:05.853Z",
        "updatedAt": "2022-09-12T13:06:05.853Z",
        "id": "794d3577-b19e-4fe5-9a36-4f5404a9591f",
        "name": "Bruno Writer",
        "email": "writer@bruno.com",
        "isAdm": false,
        "isWriter": true
    },
    "bio": "Jornalista, Radialista e Professor"
}
```

Possiveis Problemas:

-Se o usuario que não for administrador estiver tentando criar um jornalista

**Status 401 Unauthorized**

```json
{
    "status": "Error",
    "code": 401,
    "message": "User is not Administrator"
}
```

-Se o admin nao passar um token
**Status 401 Unauthorized**

```json
{
    "status": "Error",
    "code": 401,
    "message": "invalid tokren !"
}
```

-Se o administrador passar um userId invalido

**Status 404 Not Found**

```json
{
    "status": "Error",
    "code": 404,
    "message": "User not found"
}
```

-Tentando criar um escritor que ja existe

**Status 400 Bad Request**

```json
{
    "status": "Error",
    "code": 400,
    "message": "This user is already a writer"
}
```

-Tentando criar um escritor sem passar algum dado do corpo da requisicao

**Status 400 Bad Request**

Caso sem name:

```json
{
    "status": "error",
    "code": 400,
    "message": "Name is required"
}
```

#### listar Jornalista <br/>

2. Fazendo Listagem de Jornalistas

`GET/writers` <br/>

```json
//no body
```

Esta rota deve permmitir que apenas administradores possam listar os redatores.

Exemplo de resposta:

**Status 200 OK**

```json
[
    {
        "profileImage": "https://www.superprof.com.br/imagens/anuncios/professor-home-professor-com-anos-experiencia-ensina-informatica-rotinas-administrativas-presencial-ead.jpg",
        "id": "e118d585-35ae-4438-b233-e3e52061960c",
        "bio": "Jornalista e radialista, Update ele mesmo",
        "user": {
            "createdAt": "2022-09-12T13:06:05.853Z",
            "updatedAt": "2022-09-12T13:06:05.853Z",
            "id": "794d3577-b19e-4fe5-9a36-4f5404a9591f",
            "name": "Bruno Writer",
            "email": "writer@bruno.com",
            "isAdm": false,
            "isWriter": true
        }
    }
]
```

Possives problemas:

-Se um usuario que nao for administrador estiver tentando listar os jornalistas

**Status 401 Unauthorized**

```json
{
    "status": "Error",
    "code": 401,
    "message": "User is not administrator"
}
```

-se nao passar um token
**status 401 Unauthorized**

```json
{
    "status": "Error",
    "code": 401,
    "message": "Invalid token !"
}
```

#### Atualizar Jornalista <br/>

3- Fazendo Atualização de Um Jornalista

`PATCH /writers/:id`<br/>
Exemplo de mudança:

```json
{
    "bio": "Jornalismo por amor.!", // <= Exemplo de mudança
    "profileImage": "https://i.ytimg.com/vi/nr229Fd9aiA/hqdefault.jpg" // <= Exemplo de mudança
}
```

Essa rota recebe o id do jornalista que deseja alterar seus dados no parametro da requisição
OBS:Apenas o administrador e o joprnalista podem fazer a modificacao

Exemplo de resposta:

**Status 200 OK**

```json
{
    "profileImage": "https://www.superprof.com.br/imagens/anuncios/professor-home-professor-com-anos-experiencia-ensina-informatica-rotinas-administrativas-presencial-ead.jpg",
    "id": "721ad33d-575b-4b0d-946b-685ae08faec1",
    "bio": "Jornalista e radialista",
    "user": {
        "createdAt": "2022-09-12T16:53:35.956Z",
        "updatedAt": "2022-09-12T16:53:35.956Z",
        "id": "1fd616c4-e929-489b-b3cf-4e24ecc2241f",
        "name": "Bruno Writer",
        "email": "writer@bruno.com",
        "isAdm": false,
        "isWriter": true
    }
}
```

Possiveis problemas:

-   Se o escritor estiver tentando modificar um redator que nao seja ele mesmo

**Status 401 Unauthorized**

```json
{
    "status": "Error",
    "code": 401,
    "message": "Unauthorized"
}
```

-   Se o usuario nao passar um token
    **Status 401 Unauthorized**

```json
{
    "status": "Error",
    "code": 401,
    "message": "Unauthorized!"
}
```

#### Deletar Jornalista<br/>

3- Fazendo Deleção de Um Jornalista

`DELETE/users/:id`<br/>

```json
//No body
```

Essa rota deve permitir ao usuario que ele possa exluir ele mesmo se caso desejar, colocando seu id gerado no monento de criacao na url, se for adiministrador pode modificar de qualquer forma.
OBS:O delete do jornalista é feito pelo delete de usuario.

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

### NEWS

#### Cadastrar Notícias <br/>

1. Fazendo Cadastro de Nova Notícia

`POST/news`<br/>

```json
{
    "title": "Copa do mundo 2022",
    "subtitle": "Brasil será campeão",
    "urlImage": "https://www.lance.com.br/galerias/wp-content/uploads/2022/09/Neymar-Pedro-e-Gabriel-Jesus-843x474.jpg",
    "category": "Esportes",
    "body": "Brasil será campeão e se você não aceitar é sinal que você não aceita"
}
```

Essa rota permite ao escritor criar noticias.
Apenas url e categoria não precisam ser passados no corpo da requisição.

Exemplo de resposta:

**Status 201 Created**

```json
{
    "createdAt": "2022-09-12T18:39:21.802Z",
    "updatedAt": "2022-09-12T18:39:21.802Z",
    "id": "d20d4961-f648-48d8-a23c-09acc8366497",
    "writer": {
        "profileImage": "https://www.superprof.com.br/imagens/anuncios/professor-home-professor-com-anos-experiencia-ensina-informatica-rotinas-administrativas-presencial-ead.jpg",
        "id": "9ac048aa-8998-49bb-86d4-157cfa85dc89",
        "bio": "Jornalista e radialista Mudança Writer",
        "user": {
            "createdAt": "2022-09-12T18:22:00.359Z",
            "updatedAt": "2022-09-12T18:22:00.359Z",
            "id": "60639c0b-179f-49eb-97c1-ffed21e35475",
            "name": "Bruno Writer",
            "email": "writer@bruno.com",
            "isAdm": false,
            "isWriter": true
        }
    },
    "title": "Copa do mundo 2024",
    "subtitle": "Brasil será campeão",
    "urlImage": "https://www.lance.com.br/galerias/wp-content/uploads/2022/09/Neymar-Pedro-e-Gabriel-Jesus-843x474.jpg",
    "body": "Brasil será campeão e se você não aceitar é sinal que você não aceita",
    "category": {
        "id": "d5cb230a-73a1-4460-b872-355d8374e71e",
        "name": "Esportes"
    }
}
```

Possiveis Problemas

-Caso nao seja passado title no corpo da requisição

**Status 400 Bad Request**

```json
{
    "status": "error",
    "code": 400,
    "message": "Title is required"
}
```

-Caso nao seja passado subtitle no corpo da requisição

**Status 400 Bad Request**

```json
{
    "status": "error",
    "code": 400,
    "message": "Subtitle is required"
}
```

-Caso nao seja passado body no corpo da requisição

**Status 400 Bad Request**

```json
{
    "status": "error",
    "code": 400,
    "message": "Body is required"
}
```

-Caso o usuario nao seja um jornalista

**Status 401 Unauthorized**

```json
{
    "status": "error",
    "code": 401,
    "message": "User is not redator "
}
```

-Se o jornalista não passar um token

**Status 401 Unauthorized**

```json
{
    "status": "error",
    "code": 401,
    "message": "Invalid token !"
}
```

#### Listar Notícias <br/>

2.1. Fazendo Listagem de Noticias

`GET/news`<br/>

```json
//NO BODY
```

Essa rota permite que os usuários tenham acesso a todas as noticias publicadas

Exemplo de resposta

**Status 200 OK**

```json
[
    {
        "createdAt": "2022-09-12T18:39:21.802Z",
        "updatedAt": "2022-09-12T18:39:21.802Z",
        "id": "d20d4961-f648-48d8-a23c-09acc8366497",
        "title": "Copa do mundo 2024",
        "subtitle": "Brasil será campeão",
        "urlImage": "https://www.lance.com.br/galerias/wp-content/uploads/2022/09/Neymar-Pedro-e-Gabriel-Jesus-843x474.jpg",
        "body": "Brasil será campeão e se você não aceitar é sinal que você não aceita",
        "writer": {
            "profileImage": "https://www.superprof.com.br/imagens/anuncios/professor-home-professor-com-anos-experiencia-ensina-informatica-rotinas-administrativas-presencial-ead.jpg",
            "id": "9ac048aa-8998-49bb-86d4-157cfa85dc89",
            "bio": "Jornalista e radialista Mudança Writer",
            "user": {
                "createdAt": "2022-09-12T18:22:00.359Z",
                "updatedAt": "2022-09-12T18:22:00.359Z",
                "id": "60639c0b-179f-49eb-97c1-ffed21e35475",
                "name": "Bruno Writer",
                "email": "writer@bruno.com",
                "isAdm": false,
                "isWriter": true
            }
        },
        "category": {
            "id": "d5cb230a-73a1-4460-b872-355d8374e71e",
            "name": "Esportes"
        }
    }
]
```

Possiveis Problemas:

-Se não houver noticias retornará um array vazio

```json
[]
```

2.2. Fazendo Listagem de Todas as Notícias Pelo Id do Jornalista

`GET/news/:id/writers` <br/>

```json
//NO BODY
```

Essa rota permite que os usuários tenham acesso a todas as noticias relacionadas ao id do jornalista

Exemplo de resposta

**Status 200 OK**

```json
[
    {
        "createdAt": "2022-09-12T18:39:21.802Z",
        "updatedAt": "2022-09-12T18:39:21.802Z",
        "id": "d20d4961-f648-48d8-a23c-09acc8366497",
        "title": "Copa do mundo 2024",
        "subtitle": "Brasil será campeão",
        "urlImage": "https://www.lance.com.br/galerias/wp-content/uploads/2022/09/Neymar-Pedro-e-Gabriel-Jesus-843x474.jpg",
        "body": "Brasil será campeão e se você não aceitar é sinal que você não aceita",
        "writer": {
            "profileImage": "https://www.superprof.com.br/imagens/anuncios/professor-home-professor-com-anos-experiencia-ensina-informatica-rotinas-administrativas-presencial-ead.jpg",
            "id": "9ac048aa-8998-49bb-86d4-157cfa85dc89",
            "bio": "Jornalista e radialista Mudança Writer",
            "user": {
                "createdAt": "2022-09-12T18:22:00.359Z",
                "updatedAt": "2022-09-12T18:22:00.359Z",
                "id": "60639c0b-179f-49eb-97c1-ffed21e35475",
                "name": "Bruno Writer",
                "email": "writer@bruno.com",
                "isAdm": false,
                "isWriter": true
            }
        },
        "category": {
            "id": "d5cb230a-73a1-4460-b872-355d8374e71e",
            "name": "Esportes"
        }
    }
]
```

Possiveis problemas:

-Se não houver noticias retornará um array vazio

```json
[]
```

-Se o id do jornalista for invalido

**Status 404 Not Found**

```json
{
    "status": "Error",
    "code": 404,
    "message": "Writer not found"
}
```

-Se nao for passado um id

**Status 404 not found**

```json
{
    "status": "error",
    "code": 404,
    "message": "News not found"
}
```

2.3. Fazendo Listagem de Todas as Notícias por Categoria

`GET/news/:categoryName/categories`<br/>

```json
//NO BODY
```

Essa rota permite que os usuários tenham acesso a todas as noticias por categoria
OBS: Nome da categoria tem que ser exatamente igual a categoria existente.

Exemplo de resposta

**Status 200 OK**

```json
[
    {
        "createdAt": "2022-09-12T18:39:21.802Z",
        "updatedAt": "2022-09-12T18:39:21.802Z",
        "id": "d20d4961-f648-48d8-a23c-09acc8366497",
        "title": "Copa do mundo 2024",
        "subtitle": "Brasil será campeão",
        "urlImage": "https://www.lance.com.br/galerias/wp-content/uploads/2022/09/Neymar-Pedro-e-Gabriel-Jesus-843x474.jpg",
        "body": "Brasil será campeão e se você não aceitar é sinal que você não aceita",
        "writer": {
            "profileImage": "https://www.superprof.com.br/imagens/anuncios/professor-home-professor-com-anos-experiencia-ensina-informatica-rotinas-administrativas-presencial-ead.jpg",
            "id": "9ac048aa-8998-49bb-86d4-157cfa85dc89",
            "bio": "Jornalista e radialista Mudança Writer",
            "user": {
                "createdAt": "2022-09-12T18:22:00.359Z",
                "updatedAt": "2022-09-12T18:22:00.359Z",
                "id": "60639c0b-179f-49eb-97c1-ffed21e35475",
                "name": "Bruno Writer",
                "email": "writer@bruno.com",
                "isAdm": false,
                "isWriter": true
            }
        },
        "category": {
            "id": "d5cb230a-73a1-4460-b872-355d8374e71e",
            "name": "Esportes"
        }
    }
]
```

possiveis problemas

-Caso a categoria nÃo exista, ou noticia vinculada a ela

**Status 404 News not Found**

```json
{
    "status": "error",
    "code": 404,
    "message": "News not found"
}
```

2.4. Fazendo Listagem de Todas as Notícias Por Id da Notiícia

`GET/news/:id` <br/>

```json
//NO BODY
```

Essa rota permite que os usuários tenham acesso a todas as noticias pelo seu id

Exemplo de resposta

**Status 200 OK**

```json
[
    {
        "createdAt": "2022-09-12T18:39:21.802Z",
        "updatedAt": "2022-09-12T18:39:21.802Z",
        "id": "d20d4961-f648-48d8-a23c-09acc8366497",
        "title": "Copa do mundo 2024",
        "subtitle": "Brasil será campeão",
        "urlImage": "https://www.lance.com.br/galerias/wp-content/uploads/2022/09/Neymar-Pedro-e-Gabriel-Jesus-843x474.jpg",
        "body": "Brasil será campeão e se você não aceitar é sinal que você não aceita",
        "writer": {
            "profileImage": "https://www.superprof.com.br/imagens/anuncios/professor-home-professor-com-anos-experiencia-ensina-informatica-rotinas-administrativas-presencial-ead.jpg",
            "id": "9ac048aa-8998-49bb-86d4-157cfa85dc89",
            "bio": "Jornalista e radialista Mudança Writer",
            "user": {
                "createdAt": "2022-09-12T18:22:00.359Z",
                "updatedAt": "2022-09-12T18:22:00.359Z",
                "id": "60639c0b-179f-49eb-97c1-ffed21e35475",
                "name": "Bruno Writer",
                "email": "writer@bruno.com",
                "isAdm": false,
                "isWriter": true
            }
        },
        "category": {
            "id": "d5cb230a-73a1-4460-b872-355d8374e71e",
            "name": "Esportes"
        }
    }
]
```

Possiveis Problemas:

-Caso o usuario passe um id erraDO

**Status 404 Not Found**

```json
{
    "status": "error",
    "code": 404,
    "message": "News not found"
}
```

### Atualizar Notícia

1. Fazer atualizacao de noticia

`PATCH/news/:id` <br/>

```json
{
    "title": "Copa do mundo 2024",
    "subtitle": "Brasil será campeão",
    "urlImage": "https://www.lance.com.br/galerias/wp-content/uploads/2022/09/Neymar-Pedro-e-Gabriel-Jesus-843x474.jpg",
    "category": "Esportes",
    "body": "Brasil será campeão e se você não aceitar é sinal que você não aceita"
}
```

Essa rota permite que o jornalista edite os dados da sua noticia se desejar
OBS: É necessário passar o id da noticia e o token de jornalista, e a unica pessoa que pode editar é o proprio jornalista

Exemplo de mudança:

**Status 200 OK**

```json
{
    "createdAt": "2022-09-12T18:39:21.802Z",
    "updatedAt": "2022-09-12T18:39:21.802Z",
    "id": "d20d4961-f648-48d8-a23c-09acc8366497",
    "title": "Brasil perdeu a copa do mundo 2022", //<= mudanca
    "subtitle": "Eu falei que ia ganhar mas perdeu", //<= mudanca
    "urlImage": "https://alemdoplacar.files.wordpress.com/2012/06/vanucci.jpg", //<= mudanca
    "body": "O Brasil perdeu a copa do mundo ", //<= mudanca
    "writer": {
        "profileImage": "https://www.superprof.com.br/imagens/anuncios/professor-home-professor-com-anos-experiencia-ensina-informatica-rotinas-administrativas-presencial-ead.jpg",
        "id": "9ac048aa-8998-49bb-86d4-157cfa85dc89",
        "bio": "Jornalista e radialista Mudança Writer",
        "user": {
            "createdAt": "2022-09-12T18:22:00.359Z",
            "updatedAt": "2022-09-12T18:22:00.359Z",
            "id": "60639c0b-179f-49eb-97c1-ffed21e35475",
            "name": "Bruno Writer",
            "email": "writer@bruno.com",
            "isAdm": false,
            "isWriter": true
        }
    },
    "category": {
        "id": "d5cb230a-73a1-4460-b872-355d8374e71e",
        "name": "Esportes"
    }
}
```

possiveis erros :

-Se o escritor, ou usuario qualquer tentar alterar uma noticia que nao é dele

**Status 401 Unauthorized**

```json
{
    "status": "error",
    "code": 401,
    "message": "User is not redator "
}
```

-Passando um id errado
**Status 404 Not Found**

```json
{
    "status": "error",
    "code": 404,
    "message": "Not Found"
}
```

-Sem um token de writer
**Status 401 Unauthorized**

```json
{
    "status": "error",
    "code": 401,
    "message": "invalid topken "
}
```

### Excluir Notícia

1. Fazer delecao de noticia

`DELETE/news/:id` <br/>

```json
//NO BODY
```

Essa rota permite que apenas o jornalista e o administrador possam excluir a noticia publicada
Exemplon de Resposta:

**Status 204 no content**

possiveis problemas

-Usuario comum tentando excluir a noticia

**Status 401 Unauthorized**

```json
{
    "status": "error",
    "code": 401,
    "message": "Unauthorized"
}
```

-Id invalido
**Status 404 Not Found**

```json
{
    "status": "error",
    "code": 404,
    "message": "News not found"
}
```
