-- phpMyAdmin SQL Dump
-- version 4.4.15.10
-- https://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 26, 2018 at 01:43 PM
-- Server version: 5.5.60-MariaDB
-- PHP Version: 5.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tsd`
--

-- --------------------------------------------------------

--
-- Table structure for table `Artist`
--

CREATE TABLE IF NOT EXISTS `Artist` (
  `AID` int(11) NOT NULL,
  `Name` text NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Artist`
--

INSERT INTO `Artist` (`AID`, `Name`) VALUES
(1, 'Sting'),
(2, 'Elton John'),
(3, 'Rolling Stones');

-- --------------------------------------------------------

--
-- Table structure for table `Category`
--

CREATE TABLE IF NOT EXISTS `Category` (
  `CID` int(11) NOT NULL,
  `Name` text NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Category`
--

INSERT INTO `Category` (`CID`, `Name`) VALUES
(1, 'OnAir'),
(2, 'OffAir');

-- --------------------------------------------------------

--
-- Table structure for table `Liked`
--

CREATE TABLE IF NOT EXISTS `Liked` (
  `UID` int(11) NOT NULL,
  `SID` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Liked`
--

INSERT INTO `Liked` (`UID`, `SID`) VALUES
(1, 2),
(1, 3),
(2, 3),
(2, 5);

-- --------------------------------------------------------

--
-- Table structure for table `Playlist`
--

CREATE TABLE IF NOT EXISTS `Playlist` (
  `Date` date NOT NULL,
  `Sequence` int(11) NOT NULL,
  `Played` int(1) DEFAULT NULL,
  `SID` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Playlist`
--

INSERT INTO `Playlist` (`Date`, `Sequence`, `Played`, `SID`) VALUES
('2018-11-27', 1, 1, 6),
('2018-11-27', 2, 1, 1),
('2018-11-27', 3, NULL, 4),
('2018-11-27', 4, NULL, 5),
('2018-11-27', 5, NULL, 4),
('2018-11-27', 6, NULL, 6),
('2018-11-28', 1, NULL, 4),
('2018-11-28', 6, NULL, 5);

-- --------------------------------------------------------

--
-- Table structure for table `Song`
--

CREATE TABLE IF NOT EXISTS `Song` (
  `SID` int(11) NOT NULL,
  `Name` text NOT NULL,
  `Duration` int(11) NOT NULL,
  `Filename` text NOT NULL,
  `CID` int(11) NOT NULL,
  `AID` int(11) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Song`
--

INSERT INTO `Song` (`SID`, `Name`, `Duration`, `Filename`, `CID`, `AID`) VALUES
(1, 'Fields of Gold', 200, 'regfd.mp3', 1, 1),
(2, 'Can You feel the love tonight', 210, 'fdwfsd.mp3', 2, 2),
(3, 'Satisfaction', 190, 'sdasad.mp3', 2, 3),
(4, 'Englishman in New York', 205, 'sadfvads.mp3', 2, 1),
(5, 'Candle in the Wind', 195, 'sdafasd.mp3', 2, 2),
(6, 'Wild Horses', 189, 'adsfawdfs.mp3', 2, 3);

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE IF NOT EXISTS `User` (
  `UID` int(11) NOT NULL,
  `Login` text NOT NULL,
  `Password` text NOT NULL,
  `Name` text NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`UID`, `Login`, `Password`, `Name`) VALUES
(1, 'tsd', 'tsdtsd', 'Dmitri'),
(2, 'arttu', 'arttu', 'Arttu');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Artist`
--
ALTER TABLE `Artist`
  ADD PRIMARY KEY (`AID`),
  ADD UNIQUE KEY `AID` (`AID`);

--
-- Indexes for table `Category`
--
ALTER TABLE `Category`
  ADD PRIMARY KEY (`CID`),
  ADD UNIQUE KEY `CID` (`CID`);

--
-- Indexes for table `Liked`
--
ALTER TABLE `Liked`
  ADD UNIQUE KEY `unique_index` (`UID`,`SID`),
  ADD KEY `SID` (`SID`);

--
-- Indexes for table `Playlist`
--
ALTER TABLE `Playlist`
  ADD UNIQUE KEY `unique_index` (`Date`,`Sequence`),
  ADD KEY `SID` (`SID`);

--
-- Indexes for table `Song`
--
ALTER TABLE `Song`
  ADD PRIMARY KEY (`SID`),
  ADD UNIQUE KEY `SID` (`SID`),
  ADD KEY `CID` (`CID`),
  ADD KEY `AID` (`AID`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`UID`),
  ADD UNIQUE KEY `UID` (`UID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Artist`
--
ALTER TABLE `Artist`
  MODIFY `AID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `Category`
--
ALTER TABLE `Category`
  MODIFY `CID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `Song`
--
ALTER TABLE `Song`
  MODIFY `SID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `UID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
