CREATE TABLE `heroes` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `Name` varchar(255),
  `HireCost` int,
  `Skill` int
);

CREATE TABLE `missions` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `Name` varchar(255),
  `SkillCost` int,
  `Reward` int
);

CREATE TABLE `heroes_to_missions` (
  `HeroId` int,
  `MissionId` int
);

ALTER TABLE `heroes_to_missions` ADD FOREIGN KEY (`HeroId`) REFERENCES `heroes` (`id`);

ALTER TABLE `heroes_to_missions` ADD FOREIGN KEY (`MissionId`) REFERENCES `missions` (`id`);
