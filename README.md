# acm
Access Context Manager (ACM) application. Access Context Manager is a server side hosted service that consists in two parts, creating context resources and accessing it over HTTP protocol.

### Clone Repository

```bash
git clone git@github.com:lonewolf/acm.git

```

Navigate to the root directory.

```bash
$ cd acm
```
### Start app containers

Start the `app` and `mongo` containers using docker-compose

```	bash
$ docker-compose up -d 
```
```
Access the app at http://localhost:3000
```

###  Create a new resource
#####POST /resources 
```
curl -X POST \
    -H 'content-type:application/json' \
    -d '{"name":"ResourceName1","context":"AnyContext1","location":"Asia/Jerusalem","ipRange":["62.219.131.0/12", "172.114.131.10/22"]}' \
    http://localhost:3000/resources
```

### Get resource context data by name
#####GET /resources/:name?ip
```
curl -X GET http://localhost:3000/resources/ResourceName1?ip=172.114.131.1
```