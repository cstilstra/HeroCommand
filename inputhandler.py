def init(screenManagement):
    global screenmanagement
    screenmanagement = screenManagement


def parse_input(mousex, mousey, mouseClicked):
    playerInput = None
    button = screenmanagement.mouse_over_button(mousex, mousey)
    # check to see if the mouse is over a button
    if button is not None:
        if mouseClicked is True:
            playerInput = (button, 'clicked')
    return playerInput
