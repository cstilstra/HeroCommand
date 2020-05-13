SELECT hero_command.heroes.* FROM hero_command.heroes, hero_command.heroes_to_missions 
WHERE hero_command.heroes.id = hero_command.heroes_to_missions.HeroId 
AND hero_command.heroes_to_missions.MissionId=2; 