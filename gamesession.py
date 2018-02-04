# Game Session
# tracks the state of the current game session

import heroes
import missions
import random


class GameSession:

    def __init__(self):
        self.player_purse = 44
        self.last_outcome = ""
        self.hired_hero = []
        self.selected_hero = []
        self.selected_mission = []
        self.hero_master_list = heroes.get_heroes()
        self.mission_master_list = missions.get_missions()

    def run_mission_click(self):
        if self.hired_hero != []:
            if self.selected_mission != []:
                self.run_mission()
        else:
            if self.selected_hero != [] and self.selected_mission != []:
                if self.hire_hero():
                    self.run_mission()

    def get_heroes(self):
        return self.hero_master_list

    def get_missions(self):
        return self.mission_master_list

    def get_selected_hero(self):
        return self.selected_hero

    def set_selected_hero(self, hero):
        self.selected_hero = hero

    def get_hired_hero(self):
        return self.hired_hero

    def get_selected_mission(self):
        return self.selected_mission

    def set_selected_mission(self, mission):
        self.selected_mission = mission

    def get_player_purse(self):
        return self.player_purse

    def get_last_outcome(self):
        return self.last_outcome

    def hire_hero(self):
        hero_cost = int(self.selected_hero['cost'])
        if (self.player_purse - hero_cost) >= 0:
            print "Player purse before hiring hero: " + str(self.player_purse)
            self.player_purse -= int(hero_cost)
            print "Player purse after hiring hero: " + str(self.player_purse)
            self.hired_hero = self.selected_hero
            return True
        else:
            self.last_outcome = "Couldn't afford hero rate."
            return False

    def run_mission(self):
        mission_cost = int(self.selected_mission['cost'])
        if (self.player_purse - mission_cost) >= 0:
            self.player_purse -= int(mission_cost)
            print "Player purse after paying up-front mission costs: " + str(self.player_purse)
            print self.hired_hero['name'] + " went on " + self.selected_mission['name']
            outcome = self.mission_success()
            if outcome is True:
                print "Outcome: Success!"
                mission_reward = self.selected_mission['reward']
                self.player_purse += int(mission_reward)
                print "Player purse after mission success: " + str(self.player_purse)
                self.last_outcome = "Success, " + mission_reward + " currency reward!"
            else:
                print "Outcome: Failure."
                self.last_outcome = "Failure. Better luck next time."
                self.hired_hero = []
        else:
            self.last_outcome = "Couldn't afford mission costs, hero retained."

    def mission_success(self):
        hero_skill = int(self.hired_hero['skill'])
        hero_roll = random.randint(1, 100) + hero_skill
        mission_difficulty = self.selected_mission['difficulty']
        print "Hero Roll: "+str(hero_roll)+" Mission Difficulty: "+mission_difficulty
        if hero_roll > int(mission_difficulty):
            return True
        else:
            return False
