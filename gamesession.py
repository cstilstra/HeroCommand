# Game Session
# tracks the state of the current game session

import heroes, missions


def init():
    global selectedHero, selectedMission, heroMasterList, missionMasterList
    selectedHero = []
    selectedMission = []
    heroMasterList = heroes.get_heroes()
    missionMasterList = missions.get_missions()


def handle_input(playerInput):
    global selectedHero, selectedMission
    if playerInput:
        if playerInput[1] == "clicked":
            if playerInput[0][2]['type'] == "hero":
                selectedHero = playerInput[0]
                print "Selected Hero: " + selectedHero[2]['name']
            if playerInput[0][2]['type'] == "mission":
                selectedMission = playerInput[0]
                print "Selected Mission: " + selectedMission[2]['name']


def get_heroes():
    return heroMasterList


def get_missions():
    return missionMasterList


def get_selected_hero():
    return selectedHero


def get_selected_mission():
    return selectedMission
