import pygame, sys
import screenmanagement, inputhandler, gamesession
from pygame.locals import *

FPS = 30  # frames per second, the general speed of the program
FPSCLOCK = None


def main():
    global FPSCLOCK
    pygame.init()
    FPSCLOCK = pygame.time.Clock()
    gamesession.init()
    screenmanagement.init(pygame, gamesession, 'Hero Command')
    inputhandler.init(screenmanagement)

    mousex = 0  # used to store x coordinate of mouse event
    mousey = 0  # used to store y coordinate of mouse event

    while True:  # main game loop
        mouseClicked = False
        for event in pygame.event.get():  # event handling loop
            if event.type == QUIT or (event.type == KEYUP and event.key == K_ESCAPE):
                pygame.quit()
                sys.exit()
            elif event.type == MOUSEMOTION:
                mousex, mousey = event.pos
            elif event.type == MOUSEBUTTONUP:
                mousex, mousey = event.pos
                mouseClicked = True
        # end event handling loop

        # capture input
        playerInput = inputhandler.parse_input(mousex, mousey, mouseClicked)
        # update game
        gamesession.handle_input(playerInput)
        # update screen
        screenmanagement.display_panels()

        # Redraw the screen and wait a clock tick.
        pygame.display.update()
        FPSCLOCK.tick(FPS)
    # end main game loop


if __name__ == '__main__':
    main()
