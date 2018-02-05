import Tkinter as Tk


class SelectedHeroPanel:

    def __init__(self, parent_frame):
        self.frame = Tk.Frame(parent_frame)
        self.frame.pack()

        self.label = Tk.Label(self.frame, text="Selected Hero")
        self.label.pack(anchor=Tk.W)

        self.hero_name_label = Tk.Label(self.frame)
        self.hero_name_label.pack(anchor=Tk.W)

        self.hero_skill_label = Tk.Label(self.frame)
        self.hero_skill_label.pack(anchor=Tk.W)

        self.hero_cost_label = Tk.Label(self.frame)
        self.hero_cost_label.pack(anchor=Tk.W)

        self.hero_description_label = Tk.Label(self.frame)
        self.hero_description_label.pack(anchor=Tk.W)

    # updates all selected hero labels
    def update_selected_hero(self, selected_hero):
        self.hero_name_label['text'] = "Name: " + selected_hero['name']
        self.hero_skill_label['text'] = "Skill Level: " + selected_hero['skill']
        self.hero_cost_label['text'] = "Hiring Cost: " + selected_hero['cost']
        self.hero_description_label['text'] = "Description: " + selected_hero['description']
