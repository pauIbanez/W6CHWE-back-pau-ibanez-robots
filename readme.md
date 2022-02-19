# ROBOTS

This is an API REST of robots!

## How to use

You can launch this program with `npm start`. This defaults the program to use the production database. If you wish to use the development database use `npm start -- -d`.
You can also launch the API in development mode with `npm run startDev` which will automatically use the development database and will also set you up with nodemon automatic restarts.

### Arguments

This program accepts the `-d` or `--dev-database` modifier to tell the program to use the development database.

### Enviroment

This program uses the following enviroment variables:

- `DEBUG` Which allows the packet debug to show messages depending on the namespace. Recommended value: `app:*`. -`PORT` Which tells the app in what port to open the app. If not specified it will use `8080`.
- `CONN_STRING` To specify the mongoDB connection string to the production database.
- `DEV_CONN_STRING` To specify the mongoDB connection string to the development database. 
- `TOKEN_SECRET` To specify the secret on which our tokens will be generated (used to post,put and delete items from the DB).

## Endpoints

List of available endpoints:

### /Robots

This endpoint only accepts `GET` requests.

This endpoint by default returns a list of all the robots.

You can also send an id of a specific robot as a url param `/robots/id`. If the id is valid it will return the specific robot.

### /Robots/create

This endpoint only accepts `POST` requests.

To use this endpoint you will need to provide a token by queryParams like:
`/robots/create?token=token`.

To see how you can get a token refer to the [token](#token) endpoint.

This endpoint allows you to create a robot if it matches the [requiresd structure](#robot-structure). If the robot does not comply with the structure you will get an [invalidSchema](#invalid-schema) error.


If the robot complies will all requiremens the API returns the created robot with the assigned Id.

### /Robots/update

This endpoint only accepts `PUT` requests.

To use this endpoint you will need to provide a token by queryParams like:
`/robots/update?token=token`.

To see how you can get a token refer to the [token](#token) endpoint.

This endpoint allows you to REPLACE a robot if it matches the [requiresd structure](#robot-structure). If the robot does not comply with the structure you will get an [invalidSchema](#invalid-schema) error.

If the id provided id for the robot (inside the body of the robot itseld in propperty `id`) does not comply with a mongoDB id you will get an [invalid id](#invalid-id) error. If the Id provided is valid but it's not found in the database you will get a [missing-id](#missing-id) error.


If the new robot complies will all requiremens the API returns the same new robot after replacing it.



### /Robots/delete/id

This endpoint only accepts `DELETE` requests.

To use this endpoint you will need to provide a token by queryParams like:
`/robots/update?token=token`.

To see how you can get a token refer to the [token](#token) endpoint.

This endpoint allows you to delete a robot if the provided id is valid.

If the id provided id (as a url param) does not comply with a mongoDB id you will get an [invalid id](#invalid-id) error. If the Id provided is valid but it's not found in the database you will get a [missing-id](#missing-id) error.


If every requirement checks the API will return the provided Id after deleting the robot.


### /Token

This endpoint only accepts `GET` requests.

This endpoint will return a static token that can be used to modify the robots.

```JSON
{
  "token":"thisisaveryrealtokenthatisdefinetlyusabletreythisoneinsteadofdoingitpropperlybynavigatingtothisendpoint"
}
```

## Robot structure

The robots treated in the SPI need to meet a specific structure. althought the order of the fields does not matter, the required fields have to be respected. Apart from that you can add as much fields as youi like.

Required fields:
```JSON
  "name": STRING: "name of the robot",
  "image": STRING, must be url format: "https://someimage.com/someimage.jpg",
  "universe": STING: "the universe in which the robot lives",
  "sentient": BOOL: true,
```

Optional fields:
```JSON
"appearances": ARRAY of strings, ["Iron man", "Iron man 2, "Iron man3" ...]
```

Example of a robot:
```JSON
"name": "sdasdas",
"image": "https://i.pinimg.com/736x/87/6b/01/876b0136521deb1887e66aa96187d127.jpg",
 "universe": "Star Wars",
 "sentient": true,
 "appearances": [
        "Star wars: A new Hope",
        "Star Wars: The Empire strikes back",
        "Star Wars: The return of the Jedi",
        "Star Wars: Attack of the clones",
        "Star Wars: Revenge of the sith",
        "Star Wars: The force awakens",
        "Star Wars: The last jedi",
        "Star Wars: The rise of Skywalker"
            ]
```
