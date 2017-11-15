WINDOWWIDTH = 640 # size of window's width in pixels
WINDOWHEIGHT = 480 # size of window's height in pixels

#            R    G    B
WHITE    = (255, 255, 255)
NAVYBLUE = ( 60,  60, 100)
BLACK    = (  0,   0,   0)

BGCOLOR = NAVYBLUE
BUTTONCOLOR = BLACK
TEXTCOLOR = WHITE

leftPanel, rightPanel = [], []

def init(pyGame, windowHeaderText):
    global BASICFONT, DISPLAYSURFACE
    pygame = pyGame
    BASICFONT = pygame.font.Font(None, 18)
    DISPLAYSURFACE = pygame.display.set_mode((WINDOWWIDTH,WINDOWHEIGHT))
    pygame.display.set_caption(windowHeaderText)

def fill_panels(leftList, leftHeader, rightList, rightHeader):
    # creates text object lists and from args and puts them into respective panels
    global leftPanel, rightPanel
    leftPanel = build_text_object_list(20, 35, leftList, leftHeader)
    rightPanel = build_text_object_list(WINDOWWIDTH / 2, 35, rightList, rightHeader)

def display_panels():
    # clears the background, and then displays the left and right lists
    # WARNING: fill_panels() must be called at some point before this method
    fill_background()
    display_text_object_list(leftPanel)
    display_text_object_list(rightPanel)

def build_text_object_list(leftOffset, topOffset, textList, headerText):
    # returns a list of text object (surface and rectangle) tuples
    textList.insert(0,headerText)
    textObjectList = []
    for text in textList:
        textSurf = BASICFONT.render(text, 1, TEXTCOLOR, BUTTONCOLOR)
        textRect = textSurf.get_rect()
        textRect.bottomleft = (leftOffset,topOffset + (20 * int(textList.index(text))))
        textObjectList.append((textSurf, textRect))
    return textObjectList

def display_text_object_list(textObjects):
    # iterate through textObjects and blit them
    for text in textObjects:
        DISPLAYSURFACE.blit(text[0], text[1])

def mouse_over_button(mousex, mousey):
    return None

def highlight_button(button):
    variable = None

def fill_background():
    DISPLAYSURFACE.fill(BGCOLOR)
