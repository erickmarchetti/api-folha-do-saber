# API Folha do Saber

## Base URL:

    https://api-folha-do-saber.herokuapp.com/

---

# Índice

-   ## Users

    ### [Cadastro De Usuário](#cadastrar-usuário)

    ### [Login De Usuário](#logar-usuário)

    ### [Listagem De Usuário](#listar-usuário)

    ### [Atualização De Usuário](#atualizar-usuário)

    ### [Deleção De Usuário](#deletar-usuário)

-   ## Writers

    ### [Cadastro De Jornalista](#cadastrar-jornalista)

    ### [Listagem De Jornalista](#listar-jornalista)

    ### [Atualização De Jornalista](#atualizar-jornalista)

```

```

    ### [Deleção De Jornalista](#deletar-jornalista)

-   ## News

    ### [Cadastro De Notícia](#cadastrar-notícias)

    ### [Listagem De Notícia](#listar-notícias)

    ### [Atualização De Notícia](#atualizar-notícia)

    ### [Deleção De Notícia](#deletar-notícia)

---

# Endpoints

## Users

### Cadastrar usuário:

`POST /users`

```json
{
    "name": "Raquel Carvalho",
    "email": "raquelcarvalho@email.com",
    "password": "123456Aa!"
}
```

Essa rota deverá criar um usuário retornando todos os dados passados no corpo da requisição, exceto o hash de senha. Chave isAdm e isWriter são false por padrão.
OBS: O primeiro usuário cadastrado do banco de dados será um "isAdm: true", os demais serão "isAdm: false" por padrão.

-   Exemplo de resposta:

    <span style="color:green;">**Status 201 Created**</span>

    ```json
    {
        "createdAt": "2022-09-15T09:00:00.000Z",
        "updatedAt": "2022-09-15T09:00:00.000Z",
        "id": "9ba84089-3aa4-4c27-851b-af37f41752d4",
        "name": "Raquel Carvalho",
        "email": "raquelcarvalho@email.com",
        "isAdm": true,
        "isWriter": false
    }
    ```

*   Possíveis problemas:

    1. Tentando criar um usuário que já existe:

        <span style="color:orange;">**Status 400 Bad Request**</span>

        ```json
        {
            "status": "error",
            "code": 400,
            "message": "User already exists."
        }
        ```

    2. Tentando criar um usuário sem informar algum dado do corpo da requisição:

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

        -   No caso de múltiplos campos faltantes na requisição, será gerada uma mensagem de erro concatenada, informando todos os campos faltantes.

### Logar usuário

`POST /login`

```json
{
    "email": "raquelcarvalho@email.com",
    "password": "123456Aa!"
}
```

Essa rota faz o login do usuário já cadastrado, retornando seu id e seu token de acesso.

-   Exemplo de resposta:

    <span style="color:green;">**Status 200 OK**</span>

    ```json
    {
        "id": "b6ed4b72-3175-4039-a87f-763efeb5ce9c",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbSI6ZmFsc2UsImlzV3JpdGVyIjpmYWxzZSwidXNlcklkIjoiYjZlZDRiNzItMzE3NS00MDM5LWE4N2YtNzYzZWZlYjVjZTljIiwiaWF0IjoxNjYzMTk4MjUyLCJleHAiOjE2NjMyODQ2NTJ9.8HpS6FaDlQi3SVYK91CctqMDzRWo1kD8JGOrX8kKBVU"
    }
    ```

*   Possíveis problemas :

    1.  Se o email ou a senha estiverem incorretos:

        <span style="color:orange;">**Status 403 Forbidden**</span>

        ```json
        {
            "status": "error",
            "code": 403,
            "message": "Invalid credentials."
        }
        ```

    2.  Tentando logar um usuário sem informar algum dado do corpo da requisição:

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

        -   No caso de múltiplos campos faltantes na requisição, será gerada uma mensagem de erro concatenada, informando todos os campos faltantes.

        -   Por questões de segurança, quando existir conflito na validação de email e/ou senha, nunca especificar qual está incorreto.

### Listar usuário:

`GET /users`

```json
//no body
```

Essa rota deve retornar todos os usuários caso você possua um token de acesso (admin/writer).

-   Exemplo de resposta:

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

    1. Se o usuário não tiver um token com permissão de admin, nem de writer:

        <span style="color:orange;">**Status 401 Unauthorized**</span>

        ```json
        {
            "status": "error",
            "code": 401,
            "message": "User is not a writer neither an admnistrator."
        }
        ```

    2. Se o usuário não tiver um token de acesso:

        <span style="color:orange;">**Status 401 Unauthorized**</span>

        ```json
        {
            "status": "error",
            "code": 401,
            "message": "Token not found!"
        }
        ```

    3. Se o usuário informar um token inválido:

        <span style="color:orange;">**Status 401 Unauthorized**</span>

        ```json
            "status": "error",
            "code": 401,
            "message": "Invalid token!"
        ```

### Atualizar usuário:

`PATCH /users/:id`

-   Exemplo de mudança :

```json
{
    "id": "9ba84089-3aa4-4c27-851b-af37f41752d4",
    "name": "Raquel Carvalho Updated", // <= Exemplo de mudança
    "email": "raquelcarvalho2@email.com" // <= Exemplo de mudança
}
```

Essa rota deve permitir que o usuário possa editar informações dele mesmo, informando seu id como parâmetro na URL e o token. Se o token informado possuir permissão de admin, poderá ser alterado qualquer usuário.

-   Exemplo de resposta:

    <span style="color:green;">**Status 200 Created**</span>

    ```json
    {
        "createdAt": "2022-09-15T09:00:00.000Z",
        "updatedAt": "2022-09-15T11:47:48.218Z",
        "id": "9ba84089-3aa4-4c27-851b-af37f41752d4",
        "name": "Raquel Carvalho Updated",
        "email": "raquelcarvalho2@email.com",
        "isAdm": true,
        "isWriter": false
    }
    ```

-   Possíveis problemas :

    1. Se o usuário que não for administrador estiver tentando alterar isAdm = true:

        <span style="color:orange;">**Status 401 Unauthorized**</span>

        ```json
        {
            "status": "error",
            "code": 401,
            "message": "Unauthorized."
        }
        ```

    2. Se o usuário estiver tentando modificar um usuário que não seja ele mesmo ou caso não seja administrador:

        <span style="color:orange;">**Status 401 Unauthorized**</span>

        ```json
        {
            "status": "error",
            "code": 401,
            "message": "Unauthorized."
        }
        ```

    3. Se o usuário não informar um token:

        <span style="color:orange;">**Status 401 Unauthorized**</span>

        ```json
        {
            "status": "error",
            "code": 401,
            "message": "Token not found!"
        }
        ```

### Deletar usuário:

`DELETE /users/:id`

```json
//No body
```

Essa rota deve permitir ao usuário que ele possa excluir ele mesmo, passando seu id gerado no momento de criação como parâmetro da URL. Se for administrador, poderá deletar qualquer usuário.

-   Exemplo de resposta:

    <span style="color:green;">**Status 204 Created**</span>

    ```json
    //No body
    ```

-   Possíveis problemas:

    1.  Se o usuário tentar deletar outro usuário e não possuir permissão de admin:

        <span style="color:orange;">**Status 401 Unauthorized**</span>

        ```json
        {
            "status": "error",
            "code": 401,
            "message": "Unauthorized."
        }
        ```

    2.  Se o usuário informar um id inválido:

        <span style="color:orange;">**Status 404 Not Found**</span>

        ```json
        {
            "status": "error",
            "code": 404,
            "message": "User not found."
        }
        ```

    3.  Se o usuário não informar um token de acesso:

        <span style="color:orange;">**Status 401 Unauthorized**</span>

        ```json
        {
            "status": "error",
            "code": 401,
            "message": "Token not found!"
        }
        ```

    4.  Se o usuário informar um token inválido:

        <span style="color:orange;">**Status 401 Unauthorized**</span>

        ```json
        {
            "status": "error",
            "code": 401,
            "message": "Invalid token!"
        }
        ```

## Writers

### Cadastrar jornalista:

`POST /writers`

```json
{
    "userId": "217d3d86-e6dc-455a-9873-b077d9c6e84e",
    "bio": "Jornalista, Radialista e Professor",
    "profileImage": "https://yt3.ggpht.com/ytc/AMLnZu9l69ERDapKp036CRUt4l8-uLFgRslXDaEyCq6RDDk=s900-c-k-c0x00ffffff-no-rj"
}
```

Essa rota deve permitir que um administrador cadastre um novo escritor.

**Observação:** Apenas administradores podem cadastrar novos escritores.

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

-   Possíveis problemas:

    1.  Se o usuário que não possuir permissão de admin tentar criar um jornalista:

        <span style="color:orange;">**Status 401 Unauthorized**</span>

        ```json
        {
            "status": "error",
            "code": 401,
            "message": "User is not an administrator."
        }
        ```

    2.  Se o administrador não informar um token:

        <span style="color:orange;">**Status 401 Unauthorized**</span>

        ```json
        {
            "status": "error",
            "code": 401,
            "message": "Token not found!"
        }
        ```

    3.  Se o administrador não informar um userId válido:

        <span style="color:orange;">**Status 404 Not Found**</span>

        ```json
        {
            "status": "error",
            "code": 404,
            "message": "User not found."
        }
        ```

    4.  Tentando criar um escritor que já existe:

        <span style="color:orange;">**Status 400 Bad Request**</span>

        ```json
        {
            "status": "error",
            "code": 400,
            "message": "This writer is already registered."
        }
        ```

    5.  Tentando criar um escritor sem informar algum dado do corpo da requisição:

        -   Requisição sem o campo "userId":

            <span style="color:orange;">**Status 400 Bad Request**</span>

            ```json
            {
                "status": "error",
                "code": 400,
                "message": "userId is required"
            }
            ```

        -   Requisição sem o campo "bio":

            <span style="color:orange;">**Status 400 Bad Request**</span>

            ```json
            {
                "status": "error",
                "code": 400,
                "message": "bio is required"
            }
            ```

        -   Requisição sem o campo "profileImage":

            <span style="color:orange;">**Status 400 Bad Request**</span>

            ```json
            {
                "status": "error",
                "code": 400,
                "message": "profileImage is required"
            }
            ```

    -   **Observação:**

        -   No caso de múltiplos campos faltantes na requisição, será gerada uma mensagem de erro concatenada, informando todos os campos faltantes.

### Listar jornalista:

`GET /writers`

```json
 //no body
```

Esta rota deve permmitir que apenas administradores possam listar os redatores.

-   Exemplo de resposta:

    <span style="color:green;">**Status 200 OK**</span>

-   <details></details>
    professor-home-professor-com-anos-experiencia-ensina-informatica-rotinas-administrativas-presencial-ead.jpg",
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
            }            ```json
                []
                ```

        3.  Se o usuário informar um token inválido:

            <span style="color:orange;">**Status 401 Unauthorized**</span>

            ```json
            {
                "status": "error",
                "code": 401,
                "message": "Invalid token!"
            }
            ```
        ````

### Atualizar jornalista:

`PATCH /writers/:id`

-   Exemplo de mudança:

    ```json
    {
        "bio": "Jornalismo por amor.!", // <= Exemplo de mudança
        "profileImage": "https://i.ytimg.com/vi/nr229Fd9aiA/hqdefault.jpg" // <= Exemplo de mudança
    }
    ```

Essa rota recebe o id do jornalista que terá os dados alterados.
Observação: Apenas administradores e o próprio jornalista podem fazer está alteração.

-   Exemplo de resposta:

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

-   Possíveis problemas:

    1.  Se o escritor estiver tentando modificar um escritor que não seja ele mesmo:

        <span style="color:orange;">**Status 401 Unauthorized**</span>

        ```json
        {
            "status": "error",
            "code": 401,
            "message": "Unauthorized"
        }
        ```

    2.  Se o usuário não informar um token

        <span style="color:orange;">**Status 401 Unauthorized**</span>

        ```json
        {
            "status": "error",
            "code": 401,
            "message": "Token not found!"
        }
        ```

### Deletar jornalista:

A exclusão de um jornalista é realizada pela rota de [deleção de usuário](#deletar-usuário).

## News

### Cadastrar notícias:

`POST /news`

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

-   Possíveis problemas:

    1.  Caso o usuário não seja um jornalista:

        <span style="color:orange;">**Status 401 Unauthorized**</span>

        ```json
        {
            "status": "error",
            "code": 401,
            "message": "User is not a writer."
        }
        ```

    2.  Se o jornalista não informar um token:

        <span style="color:orange;">**Status 401 Unauthorized**</span>

        ```json
        {
            "status": "error",
            "code": 401,
            "message": "Token not found!"
        }
        ```

    3.  Se o jornalista informar um token inválido:

        <span style="color:orange;">**Status 401 Unauthorized**</span>

        ```json
        {
            "status": "error",
            "code": 401,
            "message": "Invalid token!"
        }
        ```

    4.  Tentando criar uma notícia sem informar algum dado do corpo da requisição:

        <span style="color:orange;">**Status 400 Bad Request**</span>

        -   Requisição sem o campo "title":

            ```json
            {
                "status": "error",
                "code": 400,
                "message": "'title' is required"
            }
            ```

        -   Requisição sem o campo "subtitle":

            ```json
            {
                "status": "error",
                "code": 400,
                "message": "'subtitle' is required"
            }
            ```

        -   Requisição sem o campo "body":

            ```json
            {
                "status": "error",
                "code": 400,
                "message": "'body' is required"
            }
            ```

    -   **Observação:**

        -   No caso de múltiplos campos faltantes na requisição, será gerada uma mensagem de erro concatenada, informando todos os campos faltantes.

### Listar notícias:

#### Listar todas as notícias

`GET /news`

```json
//No body
```

Essa rota permite que os usuários tenham acesso a todas as noticias publicadas.

-   Exemplo de resposta:

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

*   **Observação:**

```

```

        ```json
        []
        ```

#### Listar notícias por categoria

`GET/news/:categoryName/categories`<br/>

```json
//No body
```

Essa rota retorna todas as noticias por categoria, informada por parâmetro na URL.

-   Exemplo de resposta:

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

-   Possíveis problemas :

    1.  Caso a categoria não seja encontrada:

        <span style="color:orange;">**Status 404 Not Found**</span>

        ```json
        {
            "status": "error",
            "code": 404,
            "message": "Category not found."
        }
        ```

#### Listar notícias por jornalista

`GET /news/:id/writers`

```json
//No body
```

Essa rota permite que os usuários tenham acesso a todas as noticias relacionadas ao id do jornalista

-   Exemplo de resposta:

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

-   Possíveis problemas :

    1.  Se o id do jornalista for inválido:

        <span style="color:orange;">**Status 404 Not Found**</span>

        ```json
        {
            "status": "error",
            "code": 404,
            "message": "Writer not found."
        }
        ```

    2.  Se não for passado um id como parâmetro:

        <span style="color:orange;">**Status 404 Not Found**</span>

        ```json
        {
            "status": "error",
            "code": 404,
            "message": "News not found"
        }
        ```

#### Listar notícias por id

`GET/news/:id` <br/>

```json
//No body
```

Essa rota permite que os usuários tenham acesso a todas as noticias pelo seu id

-   Exemplo de resposta:

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

-   Possíveis problemas:

    1.  Caso o usuário passe um id de notícia errado:

        <span style="color:orange;">**Status 404 Not Found**</span>

        ```json
        {
            "status": "error",
            "code": 404,
            "message": "News not found"
        }
        ```

### Atualizar notícia:

`PATCH/news/:id`

```json
{
    "title": "Copa do mundo 2024",
    "subtitle": "Brasil será campeão",
    "urlImage": "https://www.lance.com.br/galerias/wp-content/uploads/2022/09/Neymar-Pedro-e-Gabriel-Jesus-843x474.jpg",
    "category": "Esportes",
    "body": "Brasil será campeão e se você não aceitar é sinal que você não aceita"
}
```

Essa rota permite que o jornalista edite os dados da sua noticia se desejar. É necessário informar o id da noticia e o token de jornalista, e a única pessoa que pode editar é o proprio jornalista.

-   Exemplo de mudança:

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

-   Possíveis problemas :

    1.  Se o usuário tentar alterar uma noticia que não é dele:

        <span style="color:orange;">**Status 401 Not Unauthorized**</span>

        ```json
        {
            "status": "error",
            "code": 401,
            "message": "User is not a writer."
        }
        ```

    2.  Se um usuário informar um id errado:

        <span style="color:orange;">**Status 404 Not Found**</span>

        ```json
        {
            "status": "error",
            "code": 404,
            "message": "News not found."
        }
        ```

    3.  Se um usuário não informar um token:

        <span style="color:orange;">**Status 401 Not Unauthorized**</span>

        ```json
        {
            "status": "error",
            "code": 401,
            "message": "Token not found!"
        }
        ```

    4.  Se um usuário informar um token inválido:

        <span style="color:orange;">**Status 401 Not Unauthorized**</span>

        ```json
        {
            "status": "error",
            "code": 401,
            "message": "Invalid token!"
        }
        ```

### Deletar Notícia

`DELETE/news/:id` <br/>

```json
//No body
```

Essa rota permite a exclusão a notícia passada por id na URL. Apenas o jornalista e o administrador podem excluir.

-   Exemplo de resposta:

    <span style="color:green;">**Status 204 Not Content**</span>

    ```json
    //No body
    ```

-   Possíveis problemas:

    1.  Se o usuário não possuir autorização necessária:

        <span style="color:orange;">**Status 401 Not Unauthorized**</span>

        ```json
        {
            "status": "error",
            "code": 401,
            "message": "Unauthorized."
        }
        ```

    2.  Se um usuário informar um id errado:

        <span style="color:orange;">**Status 404 Not Found**</span>

        ```json
        {
            "status": "error",
            "code": 404,
            "message": "News not found."
        }
        ```

    3.  Se um usuário não informar um token:

        <span style="color:orange;">**Status 401 Not Unauthorized**</span>

        ```json
        {
            "status": "error",
            "code": 401,
            "message": "Token not found!"
        }
        ```

    4.  Se um usuário informar um token inválido:

        <span style="color:orange;">**Status 401 Not Unauthorized**</span>

        ```json
        {
            "status": "error",
            "code": 401,
            "message": "Invalid token!"
        }
        ```

---

# Equipe Api Folha do Saber
