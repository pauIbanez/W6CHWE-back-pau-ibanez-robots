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
- `DEV_CONN_STRING` To specify the mongoDB connection string to the development database. -`TOKEN_SECRET` To specify the secret on which our tokens will be generated (used to post,put and delete items from the DB).

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

To see how you can get a token refer to the token[#tokens] section.

This endpoint allows you to create a robot if it matches the (requiresd structure)[#RobotStructure]
