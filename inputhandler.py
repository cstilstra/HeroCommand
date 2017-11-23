def init(screenManagement):
    global screenmanagement
    screenmanagement = screenManagement

def parse_input(mousex,mousey,mouseClicked):
    playerInput = None
    button = screenmanagement.mouse_over_button(mousex, mousey)
    # check to see if the mouse is over a button
    if button != None:
        if mouseClicked == True:
            playerInput = (button[2],'clicked')
    #         screenmanagement.highlight_button(button) # TODO: needs to be called from the proper place in the game loop
    #
    # else:
    #     if mouseClicked == True:
    #         screenmanagement.un_highlight_buttons() # TODO: needs to be called from the proper place in the game loop
    return playerInput
