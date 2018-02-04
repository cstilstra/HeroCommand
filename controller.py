import Tkinter as Tk
from mainView import MainView
from gamesession import GameSession

class Controller:
    def __init__(self):
        self.root = Tk.Tk()
        self.session = GameSession()
        self.view = MainView(self.root)

    def run(self):
        self.root.title("Hero Command")
        self.view.fill_hero_list(self.session.get_heroes())
        self.view.fill_mission_list(self.session.get_missions())
        self.root.deiconify()
        self.root.mainloop()
