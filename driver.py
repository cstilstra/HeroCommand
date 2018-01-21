import screenmanagement
import gamesession
from Tkinter import *


def main():
    gamesession.init()
    root = Tk()
    root.title("Hero Command")
    app = screenmanagement.Application(gamesession, master=root)
    app.mainloop()


if __name__ == '__main__':
    main()
