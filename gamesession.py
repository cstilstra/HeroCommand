# Game Session
# tracks the state of the current game session

def init(screenManagement):
    global screenmanagement
    screenmanagement = screenManagement

def handle_input(playerInput):
    if playerInput:
        # print input text
        print playerInput[0][0]
