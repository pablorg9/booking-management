# payment-ms

## Overview

This microservice is to manage payments, this microservice belongs to booking-management ms ecosystem, orchestrated using Docker Compose

## Project structure

```bash
├── application
│   └── services
│       ├── PaymentAppService.ts
│       └── index.ts
├── domain
│   ├── entities
│   │   ├── Payment.ts
│   │   └── index.ts
│   ├── repositories
│   │   ├── IBookingRepository.ts
│   │   ├── IPaymentRepository.ts
│   │   └── index.ts
│   ├── services
│   │   ├── PaymentService.ts
│   │   └── index.ts
│   └── value-objects
│       ├── PaymentStatus.ts
│       └── index.ts
├── infrastructure
│   ├── api
│   │   ├── Server.ts
│   │   ├── controllers
│   │   │   ├── PaymentController.ts
│   │   │   └── index.ts
│   │   ├── middlewares
│   │   │   ├── CommonMiddleware.ts
│   │   │   ├── ErrorMiddleware.ts
│   │   │   ├── JWTMiddleware.ts
│   │   │   └── index.ts
│   │   └── validators
│   │       ├── PaymentValidators.ts
│   │       ├── Validation.ts
│   │       └── index.ts
│   └── repositories
│       ├── BookingRepository.ts
│       ├── PaymentRepository.ts
│       ├── config
│       │   ├── PostgresConfig.ts
│       │   └── index.ts
│       └── index.ts
└── setup
    ├── DependencyContainer.ts
    ├── Envs.ts
    ├── Symbols.ts
    ├── index.ts
    ├── interfaces
    │   ├── DTOs
    │   │   ├── IPaymentDTO.ts
    │   │   └── index.ts
    │   ├── ICommon.ts
    │   ├── index.ts
    │   └── models
    │       ├── IPaymentModel.ts
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

URI: http://localhost:8082/api/v1

all endpoints needs JWT to autenticate, before call any endpoint you will have to get the `TOKEN` calling security-ms sign-in endpoint, then you can set the TOKEN in the Authorization header

If you're working with postman, we recommend use the Variables, it should looks like this:

![postman-variables](../../docs/postman-variables.png)

### Payments

* Create payment
  - **URL**: `/payments`
  - **Method**: `POST`
  - **Description**: Creates a new payment
  - **Request Body**:
    ```json
    {
        "userId": "2ea12ff9-3dc9-47f7-b8a4-032058b0631c",
        "amount": 50,
        "description": "Booking for Node.js DDD talk",
        "productId": "6750e44113d49bb0a3ac3779"
    }
    ```
  - **Response**
      ```json
      {
      "id": "12345",
      "name": "Event Name",
      "date": "2024-12-10",
      "location": "Venue Address"
      }
      ```

* My payments
  - **URL**: `/payments/my-payments`
  - **Method**: `GET`
  - **Description**: Get all payments made by the current user
  - **Response**
      ```json
      {
      "id": "12345",
      "name": "Event Name",
      "date": "2024-12-10",
      "location": "Venue Address"
      }
      ```
