// import { EPROTOTYPE } from 'constants';

// -- phpMyAdmin SQL Dump
// -- version 4.7.9
// -- https://www.phpmyadmin.net/
// --
// -- Host: localhost:3307
// -- Generation Time: Sep 24, 2018 at 08:37 AM
// -- Server version: 5.7.21
// -- PHP Version: 7.1.15

// SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
// SET AUTOCOMMIT = 0;
// START TRANSACTION;
// SET time_zone = "+00:00";




// --
// -- Database: `matcha`
// --
var mysql = require('mysql');
var connect = mysql.createConnection({
	host: 'localhost',
	port: 3307,
	user: 'connect',
	database: 'matcha'
});

connect.query("CREATE DATABASE IF NOT EXISTS matcha DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci");

connect.query("USE matcha")

// -- --------------------------------------------------------

// --
// -- Table structure for table `block`
// --

connect.query('DROP TABLE IF EXISTS block');
connect.query("CREATE TABLE IF NOT EXISTS `block` (\
  `id` int(11) NOT NULL AUTO_INCREMENT,\
  `login` varchar(100) NOT NULL,\
  `blocked` varchar(100) NOT NULL,\
  PRIMARY KEY (`id`)\
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8");

// -- --------------------------------------------------------

// --
// -- Table structure for table `fake`
// --

connect.query('DROP TABLE IF EXISTS `fake`');
connect.query('CREATE TABLE IF NOT EXISTS `fake` (\
  `id` int(11) NOT NULL AUTO_INCREMENT,\
  `fake` varchar(100) NOT NULL,\
  `login` varchar(100) NOT NULL,\
  `reason` text NOT NULL,\
  PRIMARY KEY (`id`)\
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8');

// --
// -- Dumping data for table `fake`
// --


// -- --------------------------------------------------------

// --
// -- Table structure for table `likes`
// --

connect.query('DROP TABLE IF EXISTS `likes`');
connect.query('CREATE TABLE IF NOT EXISTS `likes` (\
  `id` int(11) NOT NULL AUTO_INCREMENT,\
  `liker` varchar(100) NOT NULL,\
  `liked` varchar(100) NOT NULL,\
  PRIMARY KEY (`id`)\
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8');

// --
// -- Dumping data for table `likes`
// --

// -- --------------------------------------------------------

// --
// -- Table structure for table `matching`
// --

connect.query('DROP TABLE IF EXISTS `matching`');
connect.query('CREATE TABLE IF NOT EXISTS `matching` (\
  `id` int(11) NOT NULL AUTO_INCREMENT,\
  `flogin` varchar(100) NOT NULL,\
  `slogin` varchar(100) NOT NULL,\
  PRIMARY KEY (`id`)\
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8');

// --
// -- Dumping data for table `matching`
// --

// -- --------------------------------------------------------

// --
// -- Table structure for table `messages`
// --

connect.query('DROP TABLE IF EXISTS `messages`');
connect.query('CREATE TABLE IF NOT EXISTS `messages` (\
  `id` int(11) NOT NULL AUTO_INCREMENT,\
  `login` varchar(100) NOT NULL,\
  `sendto` varchar(100) NOT NULL,\
  `content` text NOT NULL,\
  `sendat` datetime NOT NULL,\
  PRIMARY KEY (`id`)\
) ENGINE=InnoDB AUTO_INCREMENT=602 DEFAULT CHARSET=utf8');

// -- --------------------------------------------------------

// --
// -- Table structure for table `notifs`
// --

connect.query('DROP TABLE IF EXISTS `notifs`');
connect.query('CREATE TABLE IF NOT EXISTS `notifs` (\
  `id` int(11) NOT NULL AUTO_INCREMENT,\
  `sent` varchar(100) NOT NULL,\
  `received` varchar(100) NOT NULL,\
  `content` text NOT NULL,\
  `readed` int(11) NOT NULL,\
  `date` datetime NOT NULL,\
  PRIMARY KEY (`id`)\
) ENGINE=InnoDB AUTO_INCREMENT=1058 DEFAULT CHARSET=utf8');

// -- --------------------------------------------------------

// --
// -- Table structure for table `popularity`
// --

connect.query('DROP TABLE IF EXISTS `popularity`');
connect.query('CREATE TABLE IF NOT EXISTS `popularity` (\
  `id` int(11) NOT NULL AUTO_INCREMENT,\
  `login` varchar(100) NOT NULL,\
  `popu` int(11) DEFAULT "0",\
  PRIMARY KEY (`id`)\
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8');

// --
// -- Dumping data for table `popularity`
// --


// -- --------------------------------------------------------

// --
// -- Table structure for table `tags`
// --

connect.query('DROP TABLE IF EXISTS `tags`');
connect.query('CREATE TABLE IF NOT EXISTS `tags` (\
  `id` int(11) NOT NULL AUTO_INCREMENT,\
  `login` varchar(100) NOT NULL,\
  `tag` varchar(50) NOT NULL,\
  PRIMARY KEY (`id`)\
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8');

// --
// -- Dumping data for table `tags`
// --

// -- --------------------------------------------------------

// --
// -- Table structure for table `users`
// --

connect.query('DROP TABLE IF EXISTS `users`');
connect.query('CREATE TABLE IF NOT EXISTS `users` (\
  `id` int(11) NOT NULL AUTO_INCREMENT,\
  `login` varchar(100) NOT NULL,\
  `gender` varchar(50) NOT NULL,\
  `fname` varchar(100) NOT NULL,\
  `lname` varchar(100) NOT NULL,\
  `pswd` varchar(100) NOT NULL,\
  `email` varchar(100) NOT NULL,\
  `city` varchar(100) NOT NULL,\
  `age` int(11) NOT NULL,\
  `interest` varchar(50) NOT NULL,\
  `profpic` varchar(255) DEFAULT NULL,\
  `pic2` varchar(255) DEFAULT NULL,\
  `pic3` varchar(255) DEFAULT NULL,\
  `pic4` varchar(255) DEFAULT NULL,\
  `pic5` varchar(255) DEFAULT NULL,\
  `sumup` text,\
  `online` int(11) NOT NULL DEFAULT "0",\
  `popu` int(11) NOT NULL DEFAULT "0",\
  `hash` varchar(255) NOT NULL,\
  `confirm` int(11) NOT NULL DEFAULT "0",\
  `fake` int(11) NOT NULL DEFAULT "0",\
  `latitude` float NOT NULL DEFAULT "0",\
  `longitude` float NOT NULL DEFAULT "0",\
  `lastconn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \
  PRIMARY KEY (`id`)\
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8');

// --
// -- Dumping data for table `users`
// --


connect.end();

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
