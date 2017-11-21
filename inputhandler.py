def init(screenManagement):
    global screenmanagement
    screenmanagement = screenManagement

def parse_input(mousex,mousey,mouseClicked):
    playerInput = []
    button = screenmanagement.mouse_over_button(mousex, mousey)
    # check to see if the mouse is over a button
    if button != None:
        if mouseClicked == True:
            playerInput.append(('buttonName','clicked'))
            screenmanagement.highlight_button(button)
    return playerInput
