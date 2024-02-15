# API Documentation

## Base URL
- Base URL: `https://localhost:3000`

## Endpoints

### `POST /send-email`

#### Description
This endpoint is used to send an email with the specified parameters.

#### Request
- **Method:** POST
- **Headers:**
  - `Content-Type`: application/json
- **Body:**
  - `to_email` (string, required): Email address of the recipient.
  - `subject` (string, required): Subject of the email.
  - `message` (string): Additional message from the sender (optional).

#### Response
- **Success Response:**
  - **Status Code:** 200 OK
  - **Body:**
    ```json
    {
      "success": "Email sent successfully",
      "info": "<details about the sent email>"
    }
    ```
- **Error Response:**
  - **Status Code:** 400 Bad Request or 500 Internal Server Error
  - **Body:**
    ```json
    {
      "error": "Failed to send email",
      "details": "<error message>"
    }
    ```

## Environment Variables

Create a `.env` file in the root of your project and define the following variables:

- `MAIL_USER`: contacto@rapimoney.pe
- `MAIL_PASSWORD`: @contacto2024
- `MAIL_SERVER`: mail.rapimoney.pe
- `MAIL_IMAP_PORT`: 993
- `MAIL_POP3_PORT`: 995
- `MAIL_SMTP_PORT`: 465

- `API_SERVER_PORT:` 3000

# Running the Server
To start the server, run the following command in your terminal:

```bash
node server.js
```
# Trigger the API
```bash
curl -X POST \
  http://localhost:3000/send-email \
  -H 'Content-Type: application/json' \
  -d '{
    "to_email": "email@server.com",
    "subject": "Primer Envio",
    "message": "Email de prueba enviado desde curl (y)"
}'

```


