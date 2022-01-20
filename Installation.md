- Install composer
    `composer install`
- Install npm
    `npm install`
- Create database in phpmyadmin
- Here i am uploading with .env file so you don't need to create env file just create database with this name 'laravel_react_demo'.
- Write database name in .env file in DB_DATABASE for example
    `DB_DATABASE=laravel_react_demo`
- Run migration file to create table in database
    `php artisan migrate`
- Run laravel app
    `php artisan serve`
- Run react app
    `npm run watch`
- Run in browser with 
    `http://localhost:8000`