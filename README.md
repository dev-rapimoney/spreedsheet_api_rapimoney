# API Documentation

## Base URL
- Base URL: `https://localhost:3000`

## Endpoints

### `POST /write-sheet`

#### Description
This endpoint is used to write in Google SpreedSheet.

#### Request
- **Method:** POST
- **Headers:**
  - `Content-Type`: application/json
- **Body:**
  - `nombres`
  - `dni`
  - `celular`
  - `tarjeta`
  - `monto`
  - `region`
  - `ocupacion`

#### Response
- **Success Response:**
  - **Status Code:** 200 OK
  - **Body:**
    ```json
    {
      "success": "Data written successfully",
      "info": "<details about the writting datal>"
    }
    ```
- **Error Response:**
  - **Status Code:** 400 Bad Request or 500 Internal Server Error
  - **Body:**
    ```json
    {
      "error": "Internal Server Error",
      "details": "<error message>"
    }
    ```

## Environment Variables

Create a `.env` file in the root of your project and define the following variables:

- `API_PORT`:
- `SPREADSHEET_ID`:
- `KEY_FILE_PATH`:
- `SCOPES`:
- `SHEET_NAME`:
- `VALUE_INPUT_OPTION`:
- `URL_ORIGIN`:

# Running the Server
To start the server, run the following command in your terminal:

```bash
node server.js
```
# Trigger the API
```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "nombres": "John Doe",
  "dni": "123456789",
  "celular": "123", 
  "tarjeta": "1234 5678 9012 3456",
  "monto": 100.00,
  "region": "Some Region",
  "ocupacion": "Some ocupacion"
}' http://localhost:3326/write-sheet


```


