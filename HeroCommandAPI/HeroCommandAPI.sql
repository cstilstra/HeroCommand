CREATE TABLE `heroes` (
  `Id` int PRIMARY KEY AUTO_INCREMENT,
  `Name` varchar(255),
  `HireCost` int,
  `Skill` int,
  `PlayerLevelVisible` int
);

CREATE TABLE `missions` (
  `Id` int PRIMARY KEY AUTO_INCREMENT,
  `Name` varchar(255),
  `SkillCost` int,
  `Reward` int,
  `DurationMs` int,
  `PlayerLevelVisible` int
);

CREATE TABLE `heroes_to_missions` (
  `HeroId` int PRIMARY KEY,
  `MissionId` int,
  `PlayerId` int,
  `FinishesAt` timestamp
);

CREATE TABLE `players` (
  `Id` int PRIMARY KEY AUTO_INCREMENT,
  `Name` varchar(255),
  `Level` int,
  `Coin` int,
  `MissionsSinceUpgrade` int
);

CREATE TABLE `heroes_to_players` (
  `HeroId` int,
  `PlayerId` int,
  `HeroAdditionalSkill` int,
  PRIMARY KEY (`HeroId`, `PlayerId`)
);

ALTER TABLE `heroes_to_missions` ADD FOREIGN KEY (`HeroId`) REFERENCES `heroes` (`Id`);

ALTER TABLE `heroes_to_missions` ADD FOREIGN KEY (`MissionId`) REFERENCES `missions` (`Id`);

ALTER TABLE `heroes_to_missions` ADD FOREIGN KEY (`PlayerId`) REFERENCES `players` (`Id`);

ALTER TABLE `heroes_to_players` ADD FOREIGN KEY (`HeroId`) REFERENCES `heroes` (`Id`);

ALTER TABLE `heroes_to_players` ADD FOREIGN KEY (`PlayerId`) REFERENCES `players` (`Id`);

