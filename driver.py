import screenmanagement
from gamesession import GameSession
from Tkinter import *
from controller import Controller

# def main():
    # game_session = GameSession()
    # root = Tk()
    # root.title("Hero Command")
    # app = screenmanagement.Application(game_session, master=root)
    # app.mainloop()


if __name__ == '__main__':
    # main()  # uncomment to run the "old" way TODO: remove this comment when no longer necessary

    c = Controller()
    c.run()
