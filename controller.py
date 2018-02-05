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
        self.view.hero_listbox.bind('<<ListboxSelect>>', self.on_select_hero)
        self.view.mission_listbox.bind('<<ListboxSelect>>', self.on_select_mission)
        self.root.deiconify()
        self.root.mainloop()

    # handles the hero list selection event
    def on_select_hero(self, event):
        if self.session.get_hired_hero() == []:
            w = event.widget
            try:
                # get the value at the current selection
                index = int(w.curselection()[0])
                name = w.get(index)
                # identify which hero has been clicked on
                for hero in self.session.hero_master_list:
                    if hero["name"] == name:
                        self.view.selected_hero_panel.update_selected_hero(hero)
                        self.session.set_selected_hero(hero)
            except IndexError:
                pass

    # handles the mission list selection event
    def on_select_mission(self, event):
        w = event.widget
        try:
            # get the value at the current selection
            index = int(w.curselection()[0])
            name = w.get(index)
            # identify which mission has been clicked on
            for mission in self.session.mission_master_list:
                if mission["name"] == name:
                    self.view.selected_mission_panel.update_selected_mission(mission)
                    self.session.set_selected_mission(mission)
        except IndexError:
            pass
