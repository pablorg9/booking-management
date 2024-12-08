# security-ms

## Overview

This microservice is to manage users, this microservice belongs to booking-management ms ecosystem, orchestrated using Docker Compose

## Project structure

```bash
├── application
│   └── services
│       ├── UserAppService.ts
│       └── index.ts
├── domain
│   ├── entities
│   │   ├── User.ts
│   │   └── index.ts
│   ├── repositories
│   │   ├── IUserRepository.ts
│   │   └── index.ts
│   ├── services
│   │   ├── UserService.ts
│   │   └── index.ts
│   └── value-objects
├── infrastructure
│   ├── api
│   │   ├── Server.ts
│   │   ├── controllers
│   │   │   ├── UserController.ts
│   │   │   └── index.ts
│   │   ├── middlewares
│   │   │   ├── CommonMiddleware.ts
│   │   │   ├── ErrorMiddleware.ts
│   │   │   ├── JWTMiddleware.ts
│   │   │   └── index.ts
│   │   └── validators
│   │       ├── UserValidators.ts
│   │       ├── Validation.ts
│   │       └── index.ts
│   └── repositories
│       ├── UserRepository.ts
│       ├── config
│       │   ├── MysqlConfig.ts
│       │   └── index.ts
│       └── index.ts
└── setup
    ├── DependencyContainer.ts
    ├── Envs.ts
    ├── Symbols.ts
    ├── index.ts
    ├── interfaces
    │   ├── DTOs
    │   │   ├── IUserDTO.ts
    │   │   └── index.ts
    │   ├── ICommon.ts
    │   ├── index.ts
    │   └── models
    │       ├── IUserModel.ts
    │       └── index.ts
    ├── types.d.ts
    └── utils
        ├── Common.ts
        ├── Http.ts
        ├── QueryBuilder.ts
        └── index.ts
```

## Prerequisites

* Node.js v20
* Docker

## Endpoints

URI: http://localhost:8080/api/v1

### Users

* Sign-up
  - **URL**: `/users/sign-up`
  - **Method**: `POST`
  - **Description**: Creates a new user
  - **Request Body**:
    ```json
    {
        "name": "Juan Pablo Restrepo",
        "email":"emailtest@gmail.com",
        "password":"testingmail2024",
        "phone": "+5712345678"
    }
    ```
  - **Response**
      ```json
      {
          "isError": false,
          "status": 201,
          "code": "S001",
          "message": "Successful Operation",
          "data": "User created!"
      }
      ```

* Sign-in
    - **URL**: `/users/sign-in`
    - **Method**: `POST`
    - **Description**: signIn and get the token
    - **Request Body**:
        ```json
        {
            "email":"emailtest@gmail.com",
            "password":"testingmail2024"
        }
        ```
    - **Response**
      ```json
      {
          "isError": false,
          "status": 200,
          "code": "S001",
          "message": "Successful Operation",
          "data": {
              "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNTk5MzNkNzktZGY3ZC00MDAxLTg5YzYtYjg2ZDFlNGYwYTQ3IiwibmFtZSI6Ikp1YW4gUGFibG8gUmVzdHJlcG8iLCJlbWFpbCI6ImVtYWlsdGVzdEBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQwNSREbDkxMEU0QTEwanluUnZiTVZ2QlFPWXlHdTY4Z1p2T210NnZYendLTWZzdjJmMWxJaHZ0bSIsInBob25lIjoiKzU3MzEwNDUxNTQ1IiwiY3JlYXRlZEF0IjoiMjAyNC0xMi0wN1QxNjoyMjozNS4wMDBaIn0sImlhdCI6MTczMzU4ODU4OH0._8ZbPFRpy-iv2kIRO4swAZtc_wnHUrCDzeR-_zsblqE",
              "user_id": "59933d79-df7d-4001-89c6-b86d1e4f0a47",
              "name": "Juan Pablo Restrepo",
              "authenticated": true
          }
      }
      ```
