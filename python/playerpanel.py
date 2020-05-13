import Tkinter as Tk


class PlayerPanel:

    def __init__(self, parent_frame):
        self.frame = Tk.Frame(parent_frame)
        self.frame.pack()

        self.player_purse_label = Tk.Label(self.frame, text="Player Purse: ")
        self.player_purse_label.pack()

        self.player_purse_count_label = Tk.Label(self.frame)
        self.player_purse_count_label.pack()

        self.hire_button = Tk.Button(self.frame, text="Conduct Mission")
        self.hire_button.pack()

        self.mission_outcome_label = Tk.Label(self.frame)
        self.mission_outcome_label.pack()

    def update_player_purse_count(self, count):
        self.player_purse_count_label["text"] = str(count)

    def update_mission_outcome(self, outcome):
        self.mission_outcome_label["text"] = str(outcome)
