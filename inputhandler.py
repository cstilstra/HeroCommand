screen_management = None


def init(screen_manager):
    global screen_management
    screen_management = screen_manager


def parse_input(mouse_x, mouse_y, mouse_clicked):
    player_input = None
    button = screen_management.mouse_over_button(mouse_x, mouse_y)
    # check to see if the mouse is over a button
    if button is not None:
        if mouse_clicked is True:
            player_input = (button, 'clicked')
    return player_input
