drop database if exists `passport_demo`;
create database `passport_demo`;
use `passport_demo`;



-------database--------
create DATABASE movies&actor_db;
use movies&actor_db;
-------actors schema----------
create table Actor(
    Id integer(2) not null auto_increment,
    Actor_name varchar(30) not null,
    Gender varchar(10) not null,
    PRIMARY KEY(Id)
);




----movies schema -------
create table Movies_name(
    Id integer(2) not null auto_increment,
    Movie_name varchar(20) not null,
    Release_year integer(4),
    Actor_name varchar(30) NOT NULL REFERENCES Actor(Actor_name),
    PRIMARY KEY(id)
);

