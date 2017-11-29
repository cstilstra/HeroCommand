# Game Session
# tracks the state of the current game session

import heroes
import missions


def init():
    global selected_hero, selected_mission, hero_master_list, mission_master_list
    selected_hero = []
    selected_mission = []
    hero_master_list = heroes.get_heroes()
    mission_master_list = missions.get_missions()


def handle_input(player_input):
    global selected_hero, selected_mission
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
                    print selected_hero[2]['name'] + " went on " + selected_mission[2]['name']


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
