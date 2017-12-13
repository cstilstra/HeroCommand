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


def handle_input(player_input):
    global selected_hero, selected_mission, player_purse
    if player_input:
        if player_input[1] == "clicked":
            if player_input[0][2]['type'] == "hero":
                selected_hero = player_input[0]
                print "Selected Hero: " + selected_hero[2]['name']
            if player_input[0][2]['type'] == "mission":
                selected_mission = player_input[0]
                print "Selected Mission: " + selected_mission[2]['name']
            if player_input[0][2]['type'] == "button":
                if player_input[0][2]['name'] == "Send Hero on Mission" and selected_hero != [] and selected_mission != []:
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


def get_selected_mission():
    global selected_mission
    return selected_mission


def hire_hero():
    global selected_hero, selected_mission, player_purse
    print "Player purse before hiring hero: " + str(player_purse)
    hero_cost = selected_hero[2]['cost']
    player_purse -= int(hero_cost)
    print "Player purse after hiring hero: " + str(player_purse)


def run_mission():
    global player_purse
    mission_cost = selected_mission[2]['cost']
    player_purse -= int(mission_cost)
    print "Player purse after paying up-front mission costs: " + str(player_purse)
    print selected_hero[2]['name'] + " went on " + selected_mission[2]['name']
    outcome = mission_success()
    if outcome == True:
        print "Outcome: Success!"
        mission_reward = selected_mission[2]['reward']
        player_purse += int(mission_reward)
        print "Player purse after mission success: " + str(player_purse)
    else:
        print "Outcome: Failure."


def mission_success():
    hero_skill = int(selected_hero[2]['skill'])
    hero_roll = random.randint(1, 100) + hero_skill
    mission_difficulty = selected_mission[2]['difficulty']
    print "Hero Skill: " + str(hero_skill) + " Hero Roll: " + str(hero_roll) + " Mission Difficulty: " + mission_difficulty
    if hero_roll > int(mission_difficulty):
        return True
    else:
        return False
