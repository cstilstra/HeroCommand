import selectionpanel

WINDOWWIDTH = 640 # size of window's width in pixels
WINDOWHEIGHT = 480 # size of window's height in pixels

#            R    G    B
WHITE    = (255, 255, 255)
NAVYBLUE = ( 60,  60, 100)
BLACK    = (  0,   0,   0)
GRAY     = (127, 127, 127)

BGCOLOR = NAVYBLUE
BUTTONCOLOR = BLACK
BUTTONHIGHLIGHT = GRAY
TEXTCOLOR = WHITE

leftPanel, rightPanel, bottomPanel, panels = [], [], [], []
session = None


def init(py_game, game_session, window_header_text):
    global BASICFONT, DISPLAYSURFACE
    global session
    session = game_session
    pygame = py_game
    BASICFONT = pygame.font.Font(None, 18)
    DISPLAYSURFACE = pygame.display.set_mode((WINDOWWIDTH,WINDOWHEIGHT))
    pygame.display.set_caption(window_header_text)
    heroes = session.get_heroes()
    missions = session.get_missions()
    selection_panel = selectionpanel.get_panel_layout()
    fill_panels(heroes, "All Heroes: ", missions, "All Missions: ", selection_panel, "Currently Selected ")


def fill_panels(left_list, left_header, right_list, right_header, bottom_list, bottom_header):
    # creates text object lists and from args and puts them into respective panels
    global leftPanel, rightPanel, bottomPanel, panels
    leftPanel = build_text_object_list(20, 35, left_list, left_header)
    rightPanel = build_text_object_list(WINDOWWIDTH / 2, 35, right_list, right_header)
    bottomPanel = build_text_object_list(20, WINDOWHEIGHT / 2, bottom_list, bottom_header)
    panels = [leftPanel, rightPanel, bottomPanel]


def display_panels():
    # updates highlights, clears the background, and then displays the left, right, and bottom lists
    update_highlights()
    update_selection_text()
    fill_background()
    display_text_object_list(leftPanel)
    display_text_object_list(rightPanel)
    display_text_object_list(bottomPanel)


def update_highlights():
    # draws the correct background for each button
    un_highlight_buttons()
    hero = session.get_selected_hero()
    mission = session.get_selected_mission()
    if hero != []:
        highlight_button(hero)
    if mission != []:
        highlight_button(mission)


def update_selection_text():
    # updates the list that contains the text for the selection box
    selected_hero = session.get_selected_hero()
    selected_mission = session.get_selected_mission()
    if selected_hero != []:
        bottomPanel[1][2]['name'] = "Hero:  " + selected_hero[2]['name']
    if selected_mission != []:
        bottomPanel[2][2]['name'] = "Mission:  " + selected_mission[2]['name']


def build_text_object_list(left_offset, top_offset, text_list, header_text):
    # returns a list of text object (surface and rectangle) tuples
    text_list.insert(0, {'name':header_text, 'type': "header"})
    text_object_list = []
    for text in text_list:
        text_surf = BASICFONT.render(text['name'], 1, TEXTCOLOR, BUTTONCOLOR)
        text_rect = text_surf.get_rect()
        text_rect.bottomleft = (left_offset, top_offset + (20 * int(text_list.index(text))))
        text_object_list.append([text_surf, text_rect, text])
    return text_object_list


def display_text_object_list(text_objects):
    # iterates through textObjects and blit them
    for text in text_objects:
        DISPLAYSURFACE.blit(text[0], text[1])


def mouse_over_button(mouse_x, mouse_y):
    # returns the button the mouse is over
    # or None if the mouse is not over a button
    for panel in panels:
        for idx, button in enumerate(panel):
            if idx > 0:  # header isn't a button
                # if mouse coords are within button rect, return button
                if button[1].collidepoint(mouse_x, mouse_y) == True:
                    return button
    return None


def highlight_button(button):
    # changes a single button to highlight color
    bottom_left = button[1].bottomleft
    button[0] = BASICFONT.render(button[2]['name'], 1, TEXTCOLOR, BUTTONHIGHLIGHT)
    rect = button[0].get_rect()
    rect.bottomleft = bottom_left
    button[1] = rect


def un_highlight_buttons():
    # changes all buttons back to default colors
    for panel in panels:
        un_highlight_panel(panel)


def un_highlight_panel(panel):
    # changes all buttons in a panel back to default colors
    for idx, button in enumerate(panel):
        if idx > 0:  # header isn't a button
            bottom_left = button[1].bottomleft
            button[0] = BASICFONT.render(button[2]['name'], 1, TEXTCOLOR, BUTTONCOLOR)
            rect = button[0].get_rect()
            rect.bottomleft = bottom_left
            button[1] = rect


def fill_background():
    # fills the background with the assigned color
    DISPLAYSURFACE.fill(BGCOLOR)
