Use hero_command;

INSERT INTO heroes (Name, HireCost, Skill, PlayerLevelVisible)
VALUES ("Best Friend", 0, 1, 1);

INSERT INTO heroes (Name, HireCost, Skill, PlayerLevelVisible)
VALUES ("Hero McHeroface", 5, 10, 1);

INSERT INTO heroes (Name, HireCost, Skill, PlayerLevelVisible)
VALUES ("The Penultimate", 8, 15, 2);

INSERT INTO missions (Name, SkillCost, Reward, DurationMs, PlayerLevelVisible)
VALUES ("The Easiest Mission Possible", 1, 1, 5000, 1);

INSERT INTO missions (Name, SkillCost, Reward, DurationMs, PlayerLevelVisible)
VALUES ("A Little Harder", 2, 2, 6000, 1);

INSERT INTO missions (Name, SkillCost, Reward, DurationMs, PlayerLevelVisible)
VALUES ("Don't Sweat It", 5, 15, 10000, 2);

INSERT INTO players (Name, Level, Coin, MissionsSinceUpgrade)
VALUES ("Ready", 1, 0, 0);