import Tkinter as Tk
import random
from mainview import MainView
from gamesession import GameSession


class Controller:
    def __init__(self):
        self.root = Tk.Tk()
        self.session = GameSession()
        self.view = MainView(self.root)

    def run(self):
        self.view.fill_hero_list(self.session.get_heroes())
        self.view.fill_mission_list(self.session.get_missions())
        self.view.hero_listbox.bind('<<ListboxSelect>>', self.on_select_hero)
        self.view.mission_listbox.bind('<<ListboxSelect>>', self.on_select_mission)
        self.view.player_panel.hire_button.bind('<Button>', self.on_conduct_mission_click)
        self.view.player_panel.update_player_purse_count(self.session.get_player_purse())

        self.root.title("Hero Command")
        self.root.deiconify()
        self.root.mainloop()

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

    def on_conduct_mission_click(self, event):
        selected_mission = self.session.get_selected_mission()

        if self.session.get_hired_hero() != []:
            if selected_mission != []:
                self.run_mission()
        else:
            if self.session.get_selected_hero() != [] and selected_mission != []:
                if self.hire_hero():
                    self.run_mission()

    # TODO: Reduce calls to self.session.get_whatever
    def hire_hero(self):
        hero_cost = int(self.session.get_selected_hero()['cost'])
        if (self.session.get_player_purse() - hero_cost) >= 0:
            self.session.adjust_player_purse(int(hero_cost) * -1)
            self.view.player_panel.update_player_purse_count(self.session.get_player_purse())
            self.session.set_hired_hero(self.session.get_selected_hero())
            return True
        else:
            self.session.set_last_outcome("Couldn't afford hero rate.")
            self.view.player_panel.update_mission_outcome(self.session.get_last_outcome())
            return False

    def run_mission(self):
        mission_cost = int(self.session.get_selected_mission()['cost'])
        if (self.session.get_player_purse() - mission_cost) >= 0:
            self.session.adjust_player_purse(int(mission_cost) * -1)
            self.view.player_panel.update_player_purse_count(self.session.get_player_purse())
            print self.session.get_hired_hero()['name'] + " went on " + self.session.get_selected_mission()['name']
            outcome = self.mission_success()
            if outcome is True:
                mission_reward = self.session.get_selected_mission()['reward']
                self.session.adjust_player_purse(int(mission_reward))
                self.view.player_panel.update_player_purse_count(self.session.get_player_purse())
                self.session.set_last_outcome("Success, " + mission_reward + " currency reward!")
                self.view.player_panel.update_mission_outcome(self.session.get_last_outcome())
            else:
                self.session.set_last_outcome("Failure. Better luck next time.")
                self.view.player_panel.update_mission_outcome(self.session.get_last_outcome())
                self.session.set_hired_hero([])
        else:
            self.session.set_last_outcome("Couldn't afford mission costs, hero retained.")
            self.view.player_panel.update_mission_outcome(self.session.get_last_outcome())

    def mission_success(self):
        hero_skill = int(self.session.get_hired_hero()['skill'])
        hero_roll = random.randint(1, 100) + hero_skill
        mission_difficulty = self.session.get_selected_mission()['difficulty']
        if hero_roll > int(mission_difficulty):
            return True
        else:
            return False
