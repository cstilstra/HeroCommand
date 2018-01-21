# Game Session
# tracks the state of the current game session

import heroes
import missions
import random


def init():
    global selected_hero, selected_mission, hero_master_list, mission_master_list
    global player_purse
    player_purse = 2000
    selected_hero = []
    selected_mission = []
    hero_master_list = heroes.get_heroes()
    mission_master_list = missions.get_missions()


def handle_click():
    global selected_hero, selected_mission
    print selected_hero
    print selected_mission
    if selected_hero != [] and selected_mission != []:
        hire_hero()
        run_mission()


def get_heroes():
    global hero_master_list
    return hero_master_list


def get_missions():
    global mission_master_list
    return mission_master_list


def get_selected_hero():
    global selected_hero
    return selected_hero


def set_selected_hero(hero):
    global selected_hero
    selected_hero = hero


def get_selected_mission():
    global selected_mission
    return selected_mission


def set_selected_mission(mission):
    global selected_mission
    selected_mission = mission


def get_player_purse():
    global player_purse
    return player_purse


def hire_hero():
    global selected_hero, selected_mission, player_purse
    print "Player purse before hiring hero: " + str(player_purse)
    hero_cost = selected_hero['cost']
    player_purse -= int(hero_cost)
    print "Player purse after hiring hero: " + str(player_purse)


def run_mission():
    global player_purse
    mission_cost = selected_mission['cost']
    player_purse -= int(mission_cost)
    print "Player purse after paying up-front mission costs: " + str(player_purse)
    print selected_hero['name'] + " went on " + selected_mission['name']
    outcome = mission_success()
    if outcome == True:
        print "Outcome: Success!"
        mission_reward = selected_mission['reward']
        player_purse += int(mission_reward)
        print "Player purse after mission success: " + str(player_purse)
    else:
        print "Outcome: Failure."


def mission_success():
    hero_skill = int(selected_hero['skill'])
    hero_roll = random.randint(1, 100) + hero_skill
    mission_difficulty = selected_mission['difficulty']
    print "Hero Skill: " + str(hero_skill) + " Hero Roll: " + str(hero_roll) + " Mission Difficulty: " + mission_difficulty
    if hero_roll > int(mission_difficulty):
        return True
    else:
        return False
