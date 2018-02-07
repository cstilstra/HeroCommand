import Tkinter as Tk


class SelectedMissionPanel:

    def __init__(self, parent_frame):
        self.frame = Tk.Frame(parent_frame)
        self.frame.pack(side=Tk.LEFT)

        self.label = Tk.Label(self.frame, text="Selected Mission")
        self.label.pack(anchor=Tk.W)

        self.mission_name_label = Tk.Label(self.frame)
        self.mission_name_label.pack(anchor=Tk.W)

        self.mission_difficulty_label = Tk.Label(self.frame)
        self.mission_difficulty_label.pack(anchor=Tk.W)

        self.mission_cost_label = Tk.Label(self.frame)
        self.mission_cost_label.pack(anchor=Tk.W)

        self.mission_reward_label = Tk.Label(self.frame)
        self.mission_reward_label.pack(anchor=Tk.W)

        self.mission_description_label = Tk.Label(self.frame)
        self.mission_description_label.pack(anchor=Tk.W)

    # updates all selected mission labels
    def update_selected_mission(self, selected_mission):
        self.mission_name_label['text'] = "Name: " + selected_mission['name']
        self.mission_difficulty_label['text'] = "Difficulty Level: " + selected_mission['difficulty']
        self.mission_cost_label['text'] = "Cost: " + selected_mission['cost']
        self.mission_reward_label['text'] = "Reward: " + selected_mission['reward']
        self.mission_description_label['text'] = "Description: " + selected_mission['description']
