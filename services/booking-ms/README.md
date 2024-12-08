# booking-ms

## Overview

This microservice is to manage bookings and events, this microservice belongs to booking-management ms ecosystem, orchestrated using Docker Compose

## Project structure

```bash
├── application
│   └── services
│       ├── BookingAppService.ts
│       ├── EventAppService.ts
│       └── index.ts
├── domain
│   ├── entities
│   │   ├── Booking.ts
│   │   ├── Event.ts
│   │   └── index.ts
│   ├── repositories
│   │   ├── IBookingRepository.ts
│   │   ├── IEventRepository.ts
│   │   ├── IPaymentRepository.ts
│   │   └── index.ts
│   ├── services
│   │   ├── BookingService.ts
│   │   ├── EventService.ts
│   │   └── index.ts
│   └── value-objects
│       ├── BookingStatus.ts
│       └── index.ts
├── infrastructure
│   ├── api
│   │   ├── Server.ts
│   │   ├── controllers
│   │   │   ├── BookingController.ts
│   │   │   ├── EventController.ts
│   │   │   └── index.ts
│   │   ├── middlewares
│   │   │   ├── CommonMiddleware.ts
│   │   │   ├── ErrorMiddleware.ts
│   │   │   ├── JWTMiddleware.ts
│   │   │   └── index.ts
│   │   └── validators
│   │       ├── BookingValidators.ts
│   │       ├── EventValidators.ts
│   │       ├── Validation.ts
│   │       └── index.ts
│   └── repositories
│       ├── BookingRepository.ts
│       ├── EventRepository.ts
│       ├── PaymentRepository.ts
│       ├── config
│       │   ├── MongoConfig.ts
│       │   └── index.ts
│       └── index.ts
└── setup
    ├── DependencyContainer.ts
    ├── Envs.ts
    ├── Symbols.ts
    ├── index.ts
    ├── interfaces
    │   ├── DTOs
    │   │   ├── IBookingDTO.ts
    │   │   ├── IEventDTO.ts
    │   │   └── index.ts
    │   ├── ICommon.ts
    │   ├── index.ts
    │   └── models
    │       ├── IBookingModel.ts
    │       ├── IEventModel.ts
    │       └── index.ts
    ├── types.d.ts
    └── utils
        ├── Http.ts
        └── index.ts
```

## Prerequisites

* Node.js v20
* Docker

## Endpoints

URI: http://localhost:8081/api/v1

all endpoints needs JWT to autenticate, before call any endpoint you will have to get the `TOKEN` calling security-ms sign-in endpoint, then you can set the TOKEN in the Authorization header

If you're working with postman, we recommend use the Variables, it should looks like this:

![postman-variables](../../docs/postman-variables.png)

### Events

* Create event
  - **URL**: `/events`
  - **Method**: `POST`
  - **Description**: Creates a new event
  - **Request Body**:
    ```json
    {
        "name": "Node.js DDD talk",
        "maxTotalAttenders": 20,
        "price": 50,
        "description": "Node.js talk about DDD",
        "details": {
            "contact": "3506602345",
            "dress_code": "no too fancy please :D"
        },
        "datetime": "2025-05-10 20:00:00"
    }
    ```
  - **Response**
      ```json
      {
          "isError": false,
          "status": 201,
          "code": "S001",
          "message": "Successful Operation",
          "data": {
              "id": "675476f142c13404ef320629",
              "userId": "59933d79-df7d-4001-89c6-b86d1e4f0a47",
              "name": "Node.js DDD talk",
              "maxTotalAttenders": 20,
              "totalAttenders": 0,
              "price": 50,
              "description": "Node.js talk about DDD",
              "details": {
                  "contact": "3506602345",
                  "dress_code": "no too fancy please :D"
              },
              "datetime": "2025-05-10T20:00:00.000Z",
              "createdAt": "2024-12-07T16:25:21.211Z"
          }
      }
      ```

* Move event
  - **URL**: `/events/${eventId}/move`
  - **Method**: `PUT`
  - **Description**: Reschedule the event to another date
  - **Request Body**:
    ```json
    {
        "datetime": "2026-03-20 15:00:00"
    }
    ```
  - **Response**
      ```json
      {
          "isError": false,
          "status": 200,
          "code": "S001",
          "message": "Successful Operation",
          "data": "Event moved successfully"
      }
      ```

* Comming soon
  - **URL**: `/events/comming-soon`
  - **Method**: `GET`
  - **Description**: Fetch up to the next 20 events
  - **Response**
      ```json
      {
          "isError": false,
          "status": 201,
          "code": "S001",
          "message": "Successful Operation",
          "data": [
              {
                  "id": "675476f142c13404ef320629",
                  "userId": "59933d79-df7d-4001-89c6-b86d1e4f0a47",
                  "name": "Node.js DDD talk",
                  "maxTotalAttenders": 20,
                  "totalAttenders": 0,
                  "price": 50,
                  "description": "Node.js talk about DDD",
                  "details": {
                      "contact": "3506602345",
                      "dress_code": "no too fancy please :D"
                  },
                  "datetime": "2026-01-20T15:00:00.000Z",
                  "createdAt": "2024-12-07T16:25:21.211Z"
              }
          ]
      }
      ```

* Delete event
  - **URL**: `/events/${eventId}`
  - **Method**: `DELETE`
  - **Description**: Delete the event only if there are no bookings made
  - **Response**
      ```json
      {
          "isError": false,
          "status": 200,
          "code": "S001",
          "message": "Successful Operation",
          "data": "675476f142c13404ef320629"
      }
      ```

### Bookings

* Create booking
  - **URL**: `/bookings`
  - **Method**: `POST`
  - **Description**: Request a booking for an specific event
  - **Request Body**:
    ```json
    {
        "eventId":  "6751f409b3da0328d9da0496"
    }
    ```
  - **Response**
      ```json
      {
          "isError": false,
          "status": 201,
          "code": "S001",
          "message": "Successful Operation",
          "data": {
              "id": "675477b042c13404ef32062a",
              "userId": "59933d79-df7d-4001-89c6-b86d1e4f0a47",
              "eventId": "675476f142c13404ef320629",
              "paymentId": "",
              "eventName": "Node.js DDD talk",
              "status": "PENDING",
              "price": 50,
              "createdAt": "2024-12-07T16:28:32.890Z",
              "updatedAt": null
          }
      }
      ```

* My bookings
  - **URL**: `/bookings/my-bookings`
  - **Method**: `GET`
  - **Description**: Get all bookings made by the current user
  - **Response**
      ```json
      {
          "isError": false,
          "status": 200,
          "code": "S001",
          "message": "Successful Operation",
          "data": [
              {
                  "id": "675477b042c13404ef32062a",
                  "userId": "59933d79-df7d-4001-89c6-b86d1e4f0a47",
                  "eventId": "675476f142c13404ef320629",
                  "paymentId": "81ad1714-5032-49f2-84ef-2ce0e96cf1c1",
                  "eventName": "Node.js DDD talk",
                  "status": "APPROVED",
                  "price": 50,
                  "createdAt": "2024-12-07T16:28:32.890Z",
                  "updatedAt": "2024-12-07T16:28:33.707Z"
              }
          ]
      }
      ```

* Delete booking
  - **URL**: `/bookings/${bookingId}`
  - **Method**: `DELETE`
  - **Description**: Delete booking.
  - **Response**
      ```json
      {
          "isError": false,
          "status": 200,
          "code": "S001",
          "message": "Successful Operation",
          "data": "675477b042c13404ef32062a"
      }
      ```

* Update booking status (Called from payment-ms)
  - **URL**: `/bookings/status`
  - **Method**: `PUT`
  - **Description**: This request is called after the payment to update the booking status according to the payment status, if the payment was `APPROVED` it means booking-ms will recieved the status from payment and the booking will be approved same case for `DECLINED`, if the payment was `DECLINED` the totalAttenders will subtract one. In this case I'm not sharing the response because this endpoints should not be call from postman, it is actually call from payment-ms
