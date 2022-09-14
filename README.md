# Api Folha do Saber

## Base URL:

    https://api-folha-do-saber.herokuapp.com/

---

# Índice

-   ## Usuário

    ### [Cadastro De Usuário](#cadastrar-usuário)

    ### [Login De Usuário](#logar-usuário)

    ### [Listagem De Usuário](#listar-usuário)

    ### [Atualização De Usuário](#atualizar-usuário)

    ### [Deleção De Usuário](#excluir-usuário)

-   ## Writer

    ### [Cadastro De Jornalista](#cadastrar-jornalista)

    ### [Listagem De Jornalista](#listar-jornalista)

    ### [Atualização De Jornalista](#atualizar-jornalista)

    ### [Deleção De Jornalista](#deletar-jornalista)

-   ## News

    ### [Cadastro De Notícia](#cadastrar-notícias)

    ### [Listagem De Notícia](#listar-notícias)

    ### [Atualização De Notícia](#atualizar-notícia)

    ### [Deleção De Notícia](#deletar-notícia)

---

# Endpoints

## USUÁRIO:

### Cadastrar usuário:

`POST/users`

```json
{
    "name": "Lagartinha Raios Funde",
    "email": "lagartinha@gmail.com",
    "password": "123456"
}
```

Essa rota deverá criar um usuário retornando todos os dados passados no corpo da requisição, exceto o hash de senha. Chave isAdm e isWriter são false por padrão.
OBS: O primeiro usuário cadastrado do banco de dados será um "isAdm: true", os demais serão "isAdm: false" por padrão.

-   Exemplo de resposta :

    <span style="color:green;">**Status 201 Created**</span>

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

*   Possíveis problemas :

    1. Tentando criar um usuario que já existe

        <span style="color:orange;">**Status 400 Bad Request**</span>

        ```json
        {
            "status": "Error",
            "code": 400,
            "message": "User already exists"
        }
        ```

    2. Tentando criar um usuario sem passar algum dado do corpo da requisicao

        <span style="color:orange;">**Status 400 Bad Request**</span>

        - Requisição sem o campo "name":

        ```json
        {
            "status": "error",
            "code": 400,
            "message": "'name' is required"
        }
        ```

        - Requisição sem o campo "email":

        ```json
        {
            "status": "error",
            "code": 400,
            "message": "'email' is required"
        }
        ```

        - Requisição sem o campo "password":

        ```json
        {
            "status": "error",
            "code": 400,
            "message": "'password' is required"
        }
        ```

    -   **Observação:**

        -   No caso de múltiplos campos faltantes na requisição, será gerada uma mensagem de erro concatenando todos os campos faltantes.

### Logar usuário

`POST /login`

```json
{
    "email": "erick@gmail.com",
    "password": "123456"
}
```

Essa rota deve fazer o login do usuário já cadastrado, retornando seu id e seu token de acesso.

-   Exemplo de resposta:

    <span style="color:green;">**Status 201 Created**</span>

    ```json
    {
        "id": "a43ab5ee-d7e7-4aec-98c7-612276091a06",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbSI6dHJ1ZSwiaXNXcml0ZXIiOmZhbHNlLCJ1c2VySWQiOiJhNDNhYjVlZS1kN2U3LTRhZWMtOThjNy02MTIyNzYwOTFhMDYiLCJpYXQiOjE2NjI5OTMzMTgsImV4cCI6MTY2MzA3OTcxOH0.qgWxle8gDSz8yv-eHv-4brFBs2SNbixGuz0SrnfCsmM"
    }
    ```

*   Possiveis problemas :

    1.  Se o email ou a senha estiverem incorretos:

        <span style="color:orange;">**Status 403 Forbidden**</span>

            ```json
            {
                "status": "Error",
                "code": 403,
                "message": "Invalid Credentials"
            }
            ```

    2.  Tentando logar um usuário sem passar algum dado do corpo da requisição:

    -   Requisição sem o campo "email":

        <span style="color:orange;">**Status 400 Bad Request**</span>

              ```json
              {
                  "status": "error",
                  "code": 400,
                  "message": "'email' is required"
              }
              ```

    -   Requisição sem o campo "password":

        <span style="color:orange;">**Status 400 Bad Request**<span>

        ````json
          {
               "status": "error",
               "code": 400,
               "message": "'password' is required"
           }
           ```

        ````

    -   **Observação:**

        -   No caso de múltiplos campos faltantes na requisição, será gerada uma mensagem de erro concatenando todos os campos faltantes.

        *   Por questões de segurança, quando existir conflito na comparação de email ou senha, nunca especificar qual está incorreto.

### Listar usuário:

`GET/users`

```json
//no body
```

Essa rota deve retornar todos os usuarios se voce tiver token de acesso(admin WRITER).

-   Exemplo de Resposta :

    <span style="color:green;">**Status 200 OK**</span>

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

*   Possíveis problemas :

    1. Se o usuário não tiver token com permissão de admin, nem de writer:

        <span style="color:orange;">**Status 401 Unauthorized**</span>

        ```json
        {
            "status": "Error",
            "code": 401,
            "message": "User is not a writer neither an admnistrator"
        }
        ```

    2. Se o usuário não tiver token de acesso:

        <span style="color:orange;">**Status 401 Unauthorized**</span>

        ```json
        {
            "status": "Error",
            "code": 401,
            "message": "Missing token"
        }
        ```

    3. Se o usuário passar um token inválido:

        <span style="color:orange;">**Status 401 Unauthorized**</span>

        ```json
            "status": "Error",
            "code": 401,
            "message": "Invalid token"
        ```

### Atualizar usuário:

`PATCH /users/:id`

-   Exemplo de mudança :

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

<span style="color:green;">**Status 200 Created**</span>

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

-   Possiveis problemas :

    1. Se o usuario que não for administrador estiver tentando mudar o campo isAdm para true.

        <span style="color:orange;">**Status 401 Unauthorized**</span>

        ```json
        {
            "status": "Error",
            "code": 401,
            "message": "Unauthorized"
        }
        ```

    2. Se o usuario estiver tentando modificar um usuario que nao seja ele mesmo ou admnistrador.

        <span style="color:orange;">**Status 401 Unauthorized**</span>

        ```json
        {
            "status": "Error",
            "code": 401,
            "message": "Unauthorized"
        }
        ```

    3. Se o usuario nãopassar um token

        <span style="color:orange;">**Status 401 Unauthorized**</span>

        ```json
        {
            "status": "Error",
            "code": 401,
            "message": "Token not found !"
        }
        ```

#### Excluir Usuário

`DELETE/users/:id`

```json
//No body
```

Essa rota deve permitir ao usuario que ele possa exluir ele mesmo se caso desejar, colocando seu id gerado no monento de criacao na url.
Se for adiministrador pode modificar de qualquer forma.

-   Exemplo de resposta:

<span style="color:green;">**Status 204 Created**</span>

-   Possiveis Problemas :

    1. Se o usuario nao for administrador

        <span style="color:orange;">**Status 401 Unauthorized**</span>

        ```json
        {
            "status": "Error",
            "code": 401,
            "message": "Unauthorized"
        }
        ```

    2. Se o usuario passar um id invalido

        <span style="color:orange;">**Status 404 Not Found**</span>

        ```json
        {
            "status": "Error",
            "code": 404,
            "message": "News not found"
        }
        ```

    3. Se o usuario nao passar um token de acesso

        <span style="color:orange;">**Status 401 Unauthorized**</span>

        ```json
        {
            "status": "Error",
            "code": 401,
            "message": "Invalid token!"
        }
        ```

    4. Se o usuario passar um token invalido

        <span style="color:orange;">**Status 401 Unauthorized**</span>

        ```json
        {
            "status": "Error",
            "code": 401,
            "message": "Unauthorized"
        }
        ```

    5. Se o usuario quiser deletar o coleguinha

        <span style="color:orange;">**Status 401 Unauthorized**</span>

        ```json
        {
            "status": "Error",
            "code": 401,
            "message": "Invalid token"
        }
        ```

## WRITER

#### Cadastrar Jornalista

`POST/writers`

```json
{
    "userId": "217d3d86-e6dc-455a-9873-b077d9c6e84e",
    "bio": "Jornalista, Radialista e Professor",
    "profileImage": "https://yt3.ggpht.com/ytc/AMLnZu9l69ERDapKp036CRUt4l8-uLFgRslXDaEyCq6RDDk=s900-c-k-c0x00ffffff-no-rj"
}
```

Essa rota deve permitir que um administrador cadastre um novo escritor.
Observação: Apenas administradores podem cadastrar novos escritores.

-   Exemplo de resposta :

<span style="color:orange;">**Status 201 Created**</span>

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

-   Possiveis Problemas :

    1. Se o usuario que não for administrador estiver tentando criar um jornalista

        <span style="color:orange;">**Status 401 Unauthorized**</span>

        ```json
        {
            "status": "Error",
            "code": 401,
            "message": "User is not Administrator"
        }
        ```

    2. Se o admin nao passar um token

        <span style="color:orange;">**Status 401 Unauthorized**</span>

        ```json
        {
            "status": "Error",
            "code": 401,
            "message": "invalid token !"
        }
        ```

    3. Se o administrador passar um userId invalido

        <span style="color:orange;">**Status 404 Not Found**</span>

        ```json
        {
            "status": "Error",
            "code": 404,
            "message": "User not found"
        }
        ```

    4. Tentando criar um escritor que ja existe

        <span style="color:orange;">**Status 400 Bad Request**</span>

        ```json
        {
            "status": "Error",
            "code": 400,
            "message": "This user is already a writer"
        }
        ```

    5. Tentando criar um escritor sem passar algum dado do corpo da requisicao

        <span style="color:orange;">**Status 400 Bad Request**</span>

        - Requisição sem o campo "name":

        ```json
        {
            "status": "error",
            "code": 400,
            "message": "Name is required"
        }
        ```

#### listar Jornalista

`GET/writers`

```json
 //no body
```

Esta rota deve permmitir que apenas administradores possam listar os redatores.

-   Exemplo de resposta :

<span style="color:green;">**Status 200 OK**</span>

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

-   Possives problemas :

    1.  Se um usuario que nao for administrador estiver tentando listar os jornalistas

        <span style="color:orange;">**Status 401 Unauthorized**</span>

        ```json
        {
            "status": "Error",
            "code": 401,
            "message": "User is not administrator"
        }
        ```

    2.  Se nao passar um token
        <span style="color:orange;">**Status 401 Unauthorized**</span>

        ```json
        {
            "status": "Error",
            "code": 401,
            "message": "Invalid token !"
        }
        ```

#### Atualizar Jornalista

`PATCH /writers/:id`

-   Exemplo de mudança :

```json
{
    "bio": "Jornalismo por amor.!", // <= Exemplo de mudança
    "profileImage": "https://i.ytimg.com/vi/nr229Fd9aiA/hqdefault.jpg" // <= Exemplo de mudança
}
```

Essa rota recebe o id do jornalista que deseja alterar seus dados no parametro da requisição
Observação: Apenas o administrador e o joprnalista podem fazer a modificacao

-   Exemplo de resposta :

<span style="color:green;">**Status 200 OK**</span>

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

-   Possiveis problemas :

    1.  Se o escritor estiver tentando modificar um redator que nao seja ele mesmo

        <span style="color:orange;">**Status 401 Unauthorized**</span>

        ```json
        {
            "status": "Error",
            "code": 401,
            "message": "Unauthorized"
        }
        ```

    2.  Se o usuario nao passar um token

        <span style="color:orange;">**Status 401 Unauthorized**</span>

        ```json
        {
            "status": "Error",
            "code": 401,
            "message": "Unauthorized!"
        }
        ```

#### Deletar Jornalista

`DELETE/users/:id`

```json
//No body
```

Essa rota deve permitir ao usuario que ele possa exluir ele mesmo se caso desejar, colocando seu id gerado no monento de criacao na url, se for adiministrador pode modificar de qualquer forma.
OBS:O delete do jornalista é feito pelo delete de usuario.

-   Exemplo de resposta :

<span style="color:green;">**Status 204 Not Content**</span>

-   Possiveis Problemas:

    1.  Se o usuario nao for administrador

        <span style="color:orange;">**Status 403 Not Forbidden**</span>

        ```json
        {
            "status": "Error",
            "code": 403,
            "message": "Missing adm permissions"
        }
        ```

    2.  Se o usuario passar um id invalido

        <span style="color:orange;">**Status 404 Not Found**</span>

        ```json
        {
            "status": "Error",
            "code": 404,
            "message": "User not found"
        }
        ```

## NEWS

#### Cadastrar Notícias

`POST/news`

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

-   Exemplo de resposta :

<span style="color:green;">**Status 201 Created**</span>

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

-   Possiveis problemas :

    1.  Caso nao seja passado title no corpo da requisição

        <span style="color:orange;">**Status 400 Bad Request**</span>

        ```json
        {
            "status": "error",
            "code": 400,
            "message": "Title is required"
        }
        ```

    2.  Caso nao seja passado subtitle no corpo da requisição

        <span style="color:orange;">**Status 400 Bad Request**</span>

        ```json
        {
            "status": "error",
            "code": 400,
            "message": "Subtitle is required"
        }
        ```

    3.  Caso nao seja passado body no corpo da requisição

        <span style="color:orange;">**Status 400 Bad Request**</span>

        ```json
        {
            "status": "error",
            "code": 400,
            "message": "Body is required"
        }
        ```

    4.  Caso o usuario nao seja um jornalista

        <span style="color:orange;">**Status 401 Unauthorized**</span>

        ```json
        {
            "status": "error",
            "code": 401,
            "message": "User is not redator "
        }
        ```

    5.  Se o jornalista não passar um token

        <span style="color:orange;">**Status 401 Unauthorized**</span>

        ```json
        {
            "status": "error",
            "code": 401,
            "message": "Invalid token !"
        }
        ```

#### Listar Notícias

`GET/news`

```json
//NO BODY
```

Essa rota permite que os usuários tenham acesso a todas as noticias publicadas

-   Exemplo de resposta :

<span style="color:green;">**Status 200 OK**</span>

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

-   Possiveis Problemas :

    1.  Se não houver noticias retornará um array vazio

        ```json
        []
        ```

---

`GET/news/:id/writers`

```json
//NO BODY
```

Essa rota permite que os usuários tenham acesso a todas as noticias relacionadas ao id do jornalista

-   Exemplo de resposta :

<span style="color:green;">**Status 200 OK**</span>

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

-   Possiveis problemas :

    1.  Se não houver noticias retornará um array vazio

        ```json
        []
        ```

    2.  Se o id do jornalista for invalido

        <span style="color:orange;">**Status 404 Not Found**</span>

        ```json
        {
            "status": "Error",
            "code": 404,
            "message": "Writer not found"
        }
        ```

    3.  Se nao for passado um id

        <span style="color:orange;">**Status 404 Not Found**</span>

        ```json
        {
            "status": "error",
            "code": 404,
            "message": "News not found"
        }
        ```

---

`GET/news/:categoryName/categories`<br/>

```json
//NO BODY
```

Essa rota permite que os usuários tenham acesso a todas as noticias por categoria
OBS: Nome da categoria tem que ser exatamente igual a categoria existente.

-   Exemplo de resposta :

<span style="color:green;">**Status 200 OK**</span>

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

-   Possiveis problemas :

    1.  Caso a categoria nÃo exista, ou noticia vinculada a ela

        <span style="color:orange;">**Status 404 Not Found**</span>

        ```json
        {
            "status": "error",
            "code": 404,
            "message": "News not found"
        }
        ```

---

`GET/news/:id` <br/>

```json
//NO BODY
```

Essa rota permite que os usuários tenham acesso a todas as noticias pelo seu id

Exemplo de resposta :

<span style="color:green;">**Status 200 OK**</span>

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

-   Possiveis Problemas :

    1.  Caso o usuario passe um id errado

        <span style="color:orange;">**Status 404 Not Found**</span>

        ```json
        {
            "status": "error",
            "code": 404,
            "message": "News not found"
        }
        ```

### Atualizar Notícia

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
Observação: É necessário passar o id da noticia e o token de jornalista, e a unica pessoa que pode editar é o proprio jornalista

-   Exemplo de mudança :

<span style="color:green;">**Status 200 OK**</span>

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

-   Possiveis problemas :

    1.  Se o escritor, ou usuario qualquer tentar alterar uma noticia que nao é dele

        <span style="color:orange;">**Status 401 Not Unauthorized**</span>

        ```json
        {
            "status": "error",
            "code": 401,
            "message": "User is not redator "
        }
        ```

    2.  Passando um id errado

        <span style="color:orange;">**Status 404 Not Found**</span>

        ```json
        {
            "status": "error",
            "code": 404,
            "message": "Not Found"
        }
        ```

    3.  Sem um token de writer

        <span style="color:orange;">**Status 401 Not Unauthorized**</span>

        ```json
        {
            "status": "error",
            "code": 401,
            "message": "invalid topken "
        }
        ```

### Deletar Notícia

`DELETE/news/:id` <br/>

```json
//NO BODY
```

Essa rota permite que apenas o jornalista e o administrador possam excluir a noticia publicada
Exemplon de Resposta:

<span style="color:orange;">**Status 204 Not Content**</span>

-   Possiveis problemas :

    1.  Usuario comum tentando excluir a noticia

        <span style="color:orange;">**Status 401 Not Unauthorized**</span>

        ```json
        {
            "status": "error",
            "code": 401,
            "message": "Unauthorized"
        }
        ```

    2.  Passsando um id inválido
        <span style="color:orange;">**Status 404 Not Found**</span>

        ```json
        {
            "status": "error",
            "code": 404,
            "message": "News not found"
        }
        ```

---

# Equipe Api Folha do Saber
