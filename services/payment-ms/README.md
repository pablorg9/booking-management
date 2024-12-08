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
  - **Description**: Creates a new payment. This request is called after the booking creation. In this case I'm not sharing the response because this endpoints should not be call from postman, it is actually call from payment-ms

* My payments
  - **URL**: `/payments/my-payments`
  - **Method**: `GET`
  - **Description**: Get all payments made by the current user.
  - **Response**
      ```json
      {
          "isError": false,
          "status": 200,
          "code": "S001",
          "message": "Successful Operation",
          "data": [
              {
                  "id": "81ad1714-5032-49f2-84ef-2ce0e96cf1c1",
                  "userId": "59933d79-df7d-4001-89c6-b86d1e4f0a47",
                  "productId": "675477b042c13404ef32062a",
                  "amount": "50.00",
                  "description": "Node.js DDD talk",
                  "status": "APPROVED",
                  "currency": "USD",
                  "createdAt": "2024-12-08T02:37:49.025Z"
              }
          ]
      }
      ```
