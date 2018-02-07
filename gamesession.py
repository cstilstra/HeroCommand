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

    def set_hired_hero(self, hired_hero):
        self.hired_hero = hired_hero

    def get_selected_mission(self):
        return self.selected_mission

    def set_selected_mission(self, mission):
        self.selected_mission = mission

    def get_player_purse(self):
        return self.player_purse

    def adjust_player_purse(self, value):
        self.player_purse += value

    def get_last_outcome(self):
        return self.last_outcome

    def set_last_outcome(self, outcome):
        self.last_outcome = outcome
