# Person

This Repository has an `api` and `spa` folder

`spa` : Is for Person Management Single Page Application , built on React.js.

To run this

```sh
cd spa
npm i
npm start
```

`api` : Is an express.js (node.js) api, which has `GET`, `POST`, `PUT` and `DELETE` http method to deal with Person data into `mongodb` document database

```sh
cd api
#make sure you have a local mongodb databse running and listinign on default port 27017
node --watch index.js
```
