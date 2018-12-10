A new school project of webradio using Node JS and CentOS

# Intialization

Run 
```
npm install
```
to install dependencies, then create **.env** file in the root directory with the follow code inside:

```
DB_HOST = HOST IP
DB_USER = DB USER
DB_NAME = NAME OF DB
DB_PASS = DB USER PASSWORD
PORT    = PORT OF APPLICATION
```

# API

```
http://server/api/cat
```

Return info about **all categories** in DB

```
http://server/api/cat/1
```

Return info about **category** with ID = **1** in DB

```
http://server/api/song
```
Return info about **all songs** in DB

```
http://server/api/song/1
```
Return info about **song** with ID = **1** in DB

```
http://server/api/songs/1
```
Return info about **all songs** in category with ID = **1** in DB

```
http://server/api/artist
```
Return info about **all artists** in DB

```
http://server/api/artist/1
```
Return info about **artist** with ID = **1** in DB