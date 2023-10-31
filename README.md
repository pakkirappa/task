# task


## Project setup
// install node js and mongodb
// create a folder in root directory(/backend) and clone the project from git
// npm install (install all dependencies)
// npm start (start the project)

### Compiles and hot-reloads for development
```
npm start
```
## Project structure
// config folder contains all the configuration files
// models folder contains all the models
// routes folder contains all the routes
// controllers folder contains all the controllers
## Project description
// this project is a simple crud application with jwt authentication
// this project contains 2 models users,Books
// users model contains name,email,password
// books model contains title,author,sammary
// this project contains 2 controllers users,books
// users controller contains adduser,login,updateuser,deleteuser
// books controller contains addbook,updatebook,deletebook,findbook,findallbooks , findbookbyid , filterbytitle
// this project contains 2 routes users,books
// users route contains add user,login,updateuser,deleteuser
// books route contains add book,updatebook,deletebook,findbook,findallbooks , findbookbyid , filterbytitle
// this project contains 1 middleware token verification
// auth middleware contains authentication
// validation middleware contains validation of request body
// this project contains 1 config file
// config file contains all the configuration of the project
// this project contains 1 index file
// index file contains all the routes

## Project dependencies
// bcryptjs
// body-parser
// cors
// dotenv
// express
// express-validator
// jsonwebtoken
// mongoose
// nodemon


## API documentation
 API documentation : https://documenter.getpostman.com/view/28056609/2s9YXb9knU


## Deployment steps
// write deployement steps in digital ocean based on the project here i have used node js and mongodb as database   
 1. create a droplet in digital ocean
 2. create a ssh key in digital ocean
 3. connecting : ssh root(username)@ip(hostname)
 4. install node js and mongodb and webserver nginx(apt-get install nginx)/apache
 5. systemctl status nginx (check status of nginx)
 6. systemctl start nginx (start nginx)
 7. systemctl enable nginx (enable nginx)
 8.check status of  nginx intsallation by typing ip in browser
 9. install node js
 10.install mongodb
 11. install pm2 (npm install pm2 -g)
 13. create a folder in root directory(/var/www/html)
 14. configure nginx (/etc/nginx/sites-available/default)
 15. systemctl restart nginx
 16. check browser by typing ip address of droplet
 17. install git
 18. clone the project from git
 20. pm2 start ecosystem.config.js(/var/www/html/api)
 21.pm2 logs (check logs)






