# Prueba Técnica - Tokenización de Tarjetas

## Pasos de instalación:

1. Clonar el repositorio.
2. instalar las depencias: `npm install`
3. Opcional, instalar docker para las BDs Postgres y Redis.
4. Se tiene que setear el stage en la carpeta config, realiza una copia dev.example.json a dev.json y actualiza los datos necesarios.
5. Si tienes docker, correr: `docker compose -f "docker-compose.yml" up -d --build`
6. Correr el seed para poblar los comercio demo: `npm run seed`
7. Correr el proyecto en modo local: `npm run start:dev`
8. Correr los test: `npm run test`
9. Correr el linter: `npm run lint`
10. Build para producción: `npm run build`

## Enpoints

- **Creación de un Token:**

**Url**: http://localhost:5000/tokens 
**Method**: POST 
**Headers**:

```json
{
  "authorization": "Bearer pk_test_pAgXyHTBMS4DTGdB"
}
```

**Body**:

```json
{
  "email":"user@hotmail.com",
  "card_number": "370000000000002",
  "cvv": "123",
  "expiration_year": "2023",
  "expiration_month": "5"
}
```

**Response**:

```json
{
  "token": "nJa5nfqTALLnjUUq"
}
```

![Capture Response](image.png)

- **Obtener datos de una tarjeta:**

**Url**: http://localhost:5000/card 
**Method**: POST 
**Headers**:

```json
{
  "authorization": "Bearer pk_test_pAgXyHTBMS4DTGdB"
}
```

**Body**:

```json
{
  "token":"nJa5nfqTALLnjUUq"
}
```

**Response**:

```json
{
  "email": "user@hotmail.com",
  "card_number": "370000000000002",
  "expiration_year": "2023",
  "expiration_month": "5"
}
```

![Capture Response](image-1.png)
