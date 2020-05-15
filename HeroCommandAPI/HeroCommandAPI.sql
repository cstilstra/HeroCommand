CREATE TABLE `heroes` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `Name` varchar(255),
  `HireCost` int,
  `Skill` int,
  `PlayerLevelVisible` int
);

CREATE TABLE `missions` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
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
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `Name` varchar(255),
  `Level` int,
  `Coin` int,
  `MissionsSinceUpgrade` int
);

ALTER TABLE `heroes_to_missions` ADD FOREIGN KEY (`HeroId`) REFERENCES `heroes` (`id`);

ALTER TABLE `heroes_to_missions` ADD FOREIGN KEY (`MissionId`) REFERENCES `missions` (`id`);

ALTER TABLE `heroes_to_missions` ADD FOREIGN KEY (`PlayerId`) REFERENCES `players` (`id`);
