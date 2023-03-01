
# Music Mern App

A MERN stack project for crud music app with authentication

##  🔗 Website Link [(Click Here)](https://lively-arithmetic-c40031.netlify.app/)


## 🚀 Quick Start

1. **Install dependencies.**

   ```bash
   cd backend
   npm install
   cd ../music-app
   npm install
   ```
   ##### or
    ```bash
   cd backend
   yarn
   cd ../music-app
   yarn 
   ```
   

1. **Start project locally.**

   ```bash
   cd backend
   npm start
   cd ../music-app
   npm start
   ```
   ##### or
    ```bash
   cd backend
   yarn start
   cd ../music-app
   yarn start
   ```
1. **Open the source code and start editing!**




 

## Backend Structure
In backend I used express, mongodb for db and firebase for storing files like song and cover album.
 
### 1. Modals:-
    
    a. User:-
        name: User's full name
        email: User's email which should be unique
        password: User's account password.

    b. Music:-
        name: Song name
        description: Song description
        coverAlbum: Cover album which is a firebase url.
        song: Song url which is also stored in firebase.
        artist: Artist Name
        uploadedBy: It consist of user's mongodb id which helps 
        us to find which user uploaded the song   
    
### 2. Routers
    
    a. Auth:-
        
        i. Create User(post):-
            To create user account which takes name, email, password as input
        
        ii. Login(post):-
            To login using user credential's. Which takes email and password as input
    
    b. Music:-
        i.Post(To add music):-
            To upload song which takes name, artist, description, coverAlbum(Image), song(Song) as input. Firstly it uploads the files in firebase than add a mongodb music document.
        ii. Get(To get music):-
            Uses user id to find the music uploaded by the user.
        iii. Delete(To Delete music):-
            Uses music id passed as a parameter to delete music.


## Frontend Structure
    In Frontend I used react, mui, mui-icons, styled-components

### App.js:-
    1. Use states variables:-
        i. user:- to store user details
        ii. rows:- to store music details
    2. Components:-
        i. Navbar
        ii. MusicList

### Navbar
    1. Modals:-
        i. Login/Sign Up:-
            a. Login:- To login using user credentials(email,password) than store user data in user usestate and localstorage.
            b. SignUp:- To create user account using name, email, password than store user data in user usestate and localstorage.
        ii. Upload:- To upload song which takes name, artist, description, coverAlbum(Image), song(Song) as input.
##  

### MusicList:-
    1. Data table:- Data table to display all the songs.
    It also consist of actions like:-
        i. play:- To play the song
        ii. Delete:- To delete the song.

    2. Music Player:- Plays the selected music.





