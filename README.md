# Simple Movies API 🎬

**🛠️Tech stack:** [Node.js](https://nodejs.org/en/), [Express.js](https://expressjs.com/), [PostgreSQL](https://www.postgresql.org/), [Docker](https://www.docker.com/)

Simple Movie API that provide four endpoints:

* `POST /movies` 🔑

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

* `GET /movies` 🔑

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

🔑 To use `/movies` routes user has to be authorized with Bearer Token ([JWT](https://jwt.io/)) before making the
request.

# Prerequisites

You need to have `docker` and `docker-compose` installed on your computer to run the service. For Windows install [Docker Desktop](https://docs.docker.com/desktop/windows/install/).

# Run locally

1. Clone this repository
2. Put `.env` file in the root directory with the following contents:
```
JWT_SECRET={string}
MOVIES_API_KEY={string}
API_PORT={number}
AUTH_PORT={number}
POSTGRES_PORT=number}
POSTGRES_USER={string}
POSTGRES_PASSWORD={string}
POSTGRES_HOST={string}
POSTGRES_DATABASE={string}
```
3. Run from root dir

```
docker-compose up -d
```

**Auth service default port: `3009`**

**Api service default port: `3010`**

**Database service default port: `5432`**

To stop the services run:

```
docker-compose down
```

# Authorization

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

 The token should be passed in request's `Authorization` header in the following format:

```
Authorization: Bearer <token>
```

The token is valid for 30 minutes.

The auth service defines two user accounts that you should use:

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
