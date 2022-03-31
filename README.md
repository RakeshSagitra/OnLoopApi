# OnLoopApi

## Tasks Completed -
- Added CRUD API's for user operations - Create User, Get User, Get All Users, Update User, Delete User.
- Added a custom API to fetch data from a LinkPreview API and store it in Users Schema.
- Take an array of Tags in custom API and created data structure in Firestore DB for particular user.
- Test all API's and test cases using Chai and Mocha frameworks.

## Project Setup -
### Installation
- Install project dependencies
```sh
npm install
```
- Copy environment file from sample environment file
- Fill configurations and API keys in .env for Firebase and LinkPreview API's
```sh
cp .env.sample .env
```
- Start Development server
```sh
npm run start
```
### Testing
- Test user's CRUD operations cases using mocha
```sh
npm run test
```
