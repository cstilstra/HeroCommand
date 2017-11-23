# Game Session
# tracks the state of the current game session

import heroes, missions

global selectedHero, selectedMission, heroMasterList, missionMasterList

def init():
    # global screenmanagement
    # screenmanagement = screenManagement

    # setup the heroes text object list
    global heroMasterList, missionMasterList
    heroMasterList = heroes.get_heroes()
    # setup the mission text object list
    missionMasterList = missions.get_missions()
    # screenmanagement.fill_panels(heroMasterList, 'All Heroes: ', missionMasterList, 'All Missions: ')

def handle_input(playerInput):
    if playerInput:
        if playerInput[1] == "clicked":
            if playerInput[0]['type'] == "hero":
                selectedHero = playerInput[0]
                print "Selected Hero: " + selectedHero['name']
            if playerInput[0]['type'] == "mission":
                selectedMission = playerInput[0]
                print "Selected Mission: " + selectedMission['name']

def get_heroes():
    return heroMasterList

def get_missions():
    return missionMasterList
