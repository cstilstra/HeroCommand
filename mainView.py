import Tkinter as Tk


class MainView:
    def __init__(self, master):
        self.width = 140
        self.hero_list = []

        self.hero_list = None
        self.mission_list = None

        self.frame = Tk.Frame(master)
        self.frame.pack()
        self.create_widgets()

    # builds all of the panels
    def create_widgets(self):

        top_frame = Tk.Frame()
        top_frame.pack(side=Tk.TOP)
        self.make_hero_list_panel(top_frame)
        self.make_mission_list_panel(top_frame)

        middle_left = Tk.Frame(width=self.width / 3)
        middle_left.pack(side=Tk.LEFT)
        middle_right = Tk.Frame(width=self.width / 3)
        middle_right.pack(side=Tk.RIGHT)

    # builds the hero panel
    def make_hero_list_panel(self, parent_frame):
        left_frame = Tk.Frame(parent_frame)
        left_frame.pack(side=Tk.LEFT)

        hero_list_label = Tk.Label(left_frame, text="Heroes")
        hero_list_label.pack()
        self.hero_list = Tk.Listbox(left_frame, width=self.width / 2)

    # fills the listbox with the heroes from the session
    def fill_hero_list(self, heroes):
        for hero in heroes:
            print hero
            hero_name = hero["name"]
            self.hero_list.insert(Tk.END, hero_name)
        self.hero_list.pack()

    # builds the mission panel
    def make_mission_list_panel(self, parent_frame):
        right_frame = Tk.Frame(parent_frame)
        right_frame.pack(side=Tk.RIGHT)

        mission_list_label = Tk.Label(right_frame, text="Missions")
        mission_list_label.pack()
        self.mission_list = Tk.Listbox(right_frame, width=self.width / 2)

    # fills the listbox with the missions from the session
    def fill_mission_list(self, missions):
        for mission in missions:
            print mission
            mission_name = mission["name"]
            self.mission_list.insert(Tk.END, mission_name)
        self.mission_list.pack()
