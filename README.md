# Project Information

|    First header  |    Second header             |
| ------------------ | ------------------------------------------- |
| Project Name              | eLibrary |
| Description        |  Working online library with all of its core functions                         |
| Team | Eero Kaarnalehto, Tuomo Aaltonen, Perttu Hakala, Ville Ollila                                |

# Run Locally

### Tools and Software needed
```
Intellij Community Edition for running backend and backend tests
MAKE SURE YOU HAVE THE LATEST VERSION
Docker for the database
```
###

### 1. Clone repo

```
$ git clone https://github.com/Compeee/Ohjelmistoprojekti-Team6.git
```

### 2. Setup Database

```
$ cd Ohjelmistoprojekti-Team6
$ cd project
$ docker-compose up -d
```

### 3. Run your own backend (Our AWS backend is not functioning correctly)
```
$ cd server 
$ cd src/main/java/com/example/libraryapp
*** IntelliJ ***
$ Run LibraryApplication.java
$ You might have to right click pom.xml -> maven -> reload project if ur getting build errors
```
### 3. Run frontend
```
$ cd client 
$ npm install
$ npm start
```
### 3. Run backend tests
```
$ Open project in IntelliJ Community
$ Locate the test/java folder
$ Right click com.example.libraryapp and run tests with coverage
```
![examplepic](https://i.imgur.com/F6Dtusr.png)

### API Documentation

Once you have the backend running you can access API Documentation

```
http://localhost:8080/swagger-ui/index.html
```
![apidoc](https://i.imgur.com/FeuaTKJ.png)
