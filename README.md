# Simple Movies API 🎬

**🛠️Tech stack:** [Node.js](https://nodejs.org/en/), [Express.js](https://expressjs.com/), [PostgreSQL](https://www.postgresql.org/), [Docker](https://www.docker.com/)

Simple Movie API that provide four endpoints:

* `POST /movies`

    * Creates a new record in DB based on fetched data by title from [OMDb API](https://omdbapi.com/). Data are saved to the database in the following format:

    ```
    id: INTEGER (PrimaryKey)
    title: VARCHAR
    released: DATE
    genre: VARCHAR
    director: VARCHAR
    userid: VARCHAR
    created_at: DATE
    ```
    * Only authorized users can create a movie.
    * `Basic` users are restricted to create 5 movies per month (calendar
      month). `Premium` users have no limits.

* `GET /movies`

    * Fetches a list of all movies created by an authorized user in the following format:
    ```
    title: string
    released: date
    genre: string
    director: string
    userid: string
    ```
    
* `GET /`
    * Displays a simple HTML landing page.

* `GET /docs`
    * Displays a simple documentation page.

⚠️ To use /movies routes user has to be authorized with Bearer Token ([JWT](https://jwt.io/)) before making the
request. The token should be passed in request's `Authorization` header in the following format:

```
Authorization: Bearer <token>
```

# Authorization service

To authorize users use auth service based on JWT tokens.

**Request**

```
curl --location --request POST '0.0.0.0:3009/auth' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "provide_user_username_here_please",
    "password": "provide_user_password_here_please"
}'
```

**Response**

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywibmFtZSI6IkJhc2ljIFRob21hcyIsInJvbGUiOiJiYXNpYyIsImlhdCI6MTYwNjIyMTgzOCwiZXhwIjoxNjA2MjIzNjM4LCJpc3MiOiJodHRwczovL3d3dy5uZXRndXJ1LmNvbS8iLCJzdWIiOiIxMjMifQ.KjZ3zZM1lZa1SB8U-W65oQApSiC70ePdkQ7LbAhpUQg"
}
```

Put received token in every request. The token is valid for 30 minutes.

## Prerequisites

You need to have `docker` and `docker-compose` installed on your computer to run the service

## Run locally

1. Clone this repository
1. Run from root dir

```
JWT_SECRET=secret docker-compose up -d
```

By default the auth service will start on port `3000` but you can override
the default value by setting the `APP_PORT` env var

```
APP_PORT=8081 JWT_SECRET=secret docker-compose up -d
```

To stop the authorization service run

```
docker-compose down
```

## JWT Secret

To generate tokens in auth service you need to provide env variable
`JWT_SECRET`. It should be a string value. You should use the same secret in
the API you're building to verify the JWT tokens.

## Users

The auth service defines two user accounts that you should use

1. `Basic` user

```
 username: 'basic-thomas'
 password: 'sR-_pcoow-27-6PAwCD8'
```

1. `Premium` user

```
username: 'premium-jim'
password: 'GBLtTyq3E_UNjFnpo9m6'
```

## Token payload

Decoding the auth token will give you access to basic information about the
user, including its role.

```
{
  "userId": 123,
  "name": "Basic Thomas",
  "role": "basic",
  "iat": 1606221838,
  "exp": 1606223638,
  "iss": "https://www.netguru.com/",
  "sub": "123"
}
```

## Example request

To authorize user call the auth service using for example `curl`. We assume
that the auth service is running of the default port `3000`.

Request

```
curl --location --request POST '0.0.0.0:3000/auth' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "basic-thomas",
    "password": "sR-_pcoow-27-6PAwCD8"
}'
```

Response

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywibmFtZSI6IkJhc2ljIFRob21hcyIsInJvbGUiOiJiYXNpYyIsImlhdCI6MTYwNjIyMTgzOCwiZXhwIjoxNjA2MjIzNjM4LCJpc3MiOiJodHRwczovL3d3dy5uZXRndXJ1LmNvbS8iLCJzdWIiOiIxMjMifQ.KjZ3zZM1lZa1SB8U-W65oQApSiC70ePdkQ7LbAhpUQg"
}
```

## Rules

- Database and framework choice are on your side.
- Your API has to be dockerized. Create `Dockerfile` and `docker-compose` and document the process of running it locally.
- Provided solution should consist of two microservices.
  - `Authentication Service` - provided by us to auth users
  - `Movies Service` - created by you to handle movies data
- Test your code.
- Provide documentation of your API.
- Application should be pushed to the public git repository and should have a
  working CI/CD pipeline that runs the tests. For example you can use GitHub
  Actions or CircleCI. Create a sample PR to show us the working CI/CD pipeline.

## What will be evaluated?

- Task completeness
- Architecture
- Code quality
- Tests quality
- Database design
- Technology stack
