# Game Session
# tracks the state of the current game session

import heroes
import missions
import random

selected_hero, selected_mission, hero_master_list, mission_master_list = None, None, None, None
player_purse, last_outcome, hired_hero = None, None, None


def init():
    global selected_hero, selected_mission, hero_master_list, mission_master_list
    global player_purse, last_outcome, hired_hero
    player_purse = 44
    last_outcome = ""
    hired_hero = []
    selected_hero = []
    selected_mission = []
    hero_master_list = heroes.get_heroes()
    mission_master_list = missions.get_missions()


def run_mission_click():
    global selected_hero, selected_mission
    if hired_hero != []:
        if selected_mission != []:
            run_mission()
    else:
        if selected_hero != [] and selected_mission != []:
            if hire_hero():
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


def get_hired_hero():
    global hired_hero
    return hired_hero


def get_selected_mission():
    global selected_mission
    return selected_mission


def set_selected_mission(mission):
    global selected_mission
    selected_mission = mission


def get_player_purse():
    global player_purse
    return player_purse


def get_last_outcome():
    global last_outcome
    return last_outcome


def hire_hero():
    global selected_hero, selected_mission, player_purse, last_outcome
    hero_cost = int(selected_hero['cost'])
    if (player_purse - hero_cost) >= 0:
        print "Player purse before hiring hero: " + str(player_purse)
        player_purse -= int(hero_cost)
        print "Player purse after hiring hero: " + str(player_purse)
        global hired_hero
        hired_hero = selected_hero
        return True
    else:
        last_outcome = "Couldn't afford hero rate."
        return False


def run_mission():
    global player_purse, last_outcome, hired_hero
    mission_cost = int(selected_mission['cost'])
    if (player_purse - mission_cost) >= 0:
        player_purse -= int(mission_cost)
        print "Player purse after paying up-front mission costs: " + str(player_purse)
        print hired_hero['name'] + " went on " + selected_mission['name']
        outcome = mission_success()
        if outcome == True:
            print "Outcome: Success!"
            mission_reward = selected_mission['reward']
            player_purse += int(mission_reward)
            print "Player purse after mission success: " + str(player_purse)
            last_outcome = "Success, " + mission_reward + " currency reward!"
        else:
            print "Outcome: Failure."
            last_outcome = "Failure. Better luck next time."
        hired_hero = []
    else:
        last_outcome = "Couldn't afford mission costs, hero retained."


def mission_success():
    hero_skill = int(hired_hero['skill'])
    hero_roll = random.randint(1, 100) + hero_skill
    mission_difficulty = selected_mission['difficulty']
    print "Hero Roll: "+str(hero_roll)+" Mission Difficulty: "+mission_difficulty
    if hero_roll > int(mission_difficulty):
        return True
    else:
        return False
