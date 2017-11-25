import pygame
import sys
import screenmanagement
import inputhandler
import gamesession
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

    mouse_x = 0  # used to store x coordinate of mouse event
    mouse_y = 0  # used to store y coordinate of mouse event

    while True:  # main game loop
        mouse_clicked = False
        for event in pygame.event.get():  # event handling loop
            if event.type == QUIT or (event.type == KEYUP and event.key == K_ESCAPE):
                pygame.quit()
                sys.exit()
            elif event.type == MOUSEMOTION:
                mouse_x, mouse_y = event.pos
            elif event.type == MOUSEBUTTONUP:
                mouse_x, mouse_y = event.pos
                mouse_clicked = True
        # end event handling loop

        # capture input
        player_input = inputhandler.parse_input(mouse_x, mouse_y, mouse_clicked)
        # update game
        gamesession.handle_input(player_input)
        # update screen
        screenmanagement.display_panels()

        # Redraw the screen and wait a clock tick.
        pygame.display.update()
        FPSCLOCK.tick(FPS)
    # end main game loop


if __name__ == '__main__':
    main()
