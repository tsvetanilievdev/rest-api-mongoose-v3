# API design in Node.js with Express, v3

## I recreated Scott Moss' REST API 
Used frameworks and libraries:
- ### Express
- ### MongoDB and Mongoose
- ### JWT
- ### Bcrypt
- ### JEST
- ### Babel compiler

## I done following steps
- [Routing](#routing)
- [Create Schemas](#create-schemas)
- [Controllers](#controllers)
- [Authentication](#authentication)
- [Testing](#testing)


### Routing
I created routes and sub routers for our soon the be DB resources using Express routing and routers
- [X] create a router for the Item resource
- [X] create full crud routes and create placeholder controllers
- [X] mount router on the root server
- [X] ensure all tests pass by running test command

### Create Schemas
I used Mongoose and MongoDb to create a schema and model for the Item resource.

- [X] create a schema for the item resource
- [X] add the correct fields 
- [X] add the correct validations 
- [X] ensure all tests pass by running test command

### Controllers
- [X] create CRUD resolvers in `utils/crud.js`
- [X] create controllers for the Item resources using the base crud resolvers
- [X] ensure all tests pass by running test command

### Authentication
I locked down our API using JWT's.

- [X] create a signup controller
- [X] create a signin controller
- [X] create a protect middlware to lock down API routes
- [X] ensure all tests pass by running test command

### Testing
All test passed

