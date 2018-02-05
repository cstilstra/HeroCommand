import Tkinter as Tk


class PlayerPanel:

    def __init__(self, parent_frame):
        self.frame = Tk.Frame(parent_frame)
        self.frame.pack()

        # player_purse_label
        self.player_purse_label = Tk.Label(self.frame, text="Player Purse: ")
        self.player_purse_label.pack()

        # player_purse_count_label
        self.player_purse_count_label = Tk.Label(self.frame)
        self.player_purse_count_label.pack()

        # go button
        self.hire_button = Tk.Button(self.frame, text="Conduct Mission")
        self.hire_button.pack()

        # mission_outcome_label
        self.mission_outcome_label = Tk.Label(self.frame)
        self.mission_outcome_label.pack()
