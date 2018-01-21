from Tkinter import *
import selectedheropanel
import selectedmissionpanel
import playerpanel


class Application(Frame):

    session = None
    heroes = []
    missions = []
    selected_hero = {}
    selected_mission = {}
    selected_hero_text = None
    selected_mission_text = None
    width = 140
    panel_width = width / 2

    # handles the hero list selection event
    # assigns the hero from the list to selected_hero
    # updates selected_hero_text
    def on_select_hero(self, event):
        w = event.widget
        index = int(w.curselection()[0])
        name = w.get(index)
        global heroes
        global selected_hero
        for hero in heroes:
            if hero["name"] == name:
                selected_hero = hero
                selectedheropanel.update_selected_hero(selected_hero)
                session.set_selected_hero(hero)

    # handles the mission list selection event
    # assigns the mission from the list to selected_mission
    # updates selected_mission_text
    def on_select_mission(self, event):
        w = event.widget
        index = int(w.curselection()[0])
        name = w.get(index)
        global missions
        global selected_mission
        for mission in missions:
            if mission["name"] == name:
                selected_mission = mission
                selectedmissionpanel.update_selected_mission(selected_mission)
                session.set_selected_mission(mission)

    # builds the hero panel and fills the listbox with the heroes from the session
    def make_hero_list_panel(self, parent_frame):
        left_frame = Frame(parent_frame)
        left_frame.pack(side=LEFT)

        hero_list_label = Label(left_frame, text="Heroes")
        hero_list_label.pack()

        global heroes
        heroes = session.get_heroes()
        print "Heroes:"

        hero_list = Listbox(left_frame, width=self.panel_width)
        for hero in heroes:
            print hero
            hero_name = hero["name"]
            hero_list.insert(END, hero_name)
        hero_list.bind('<<ListboxSelect>>', self.on_select_hero)
        hero_list.pack()
        print ""

    # builds the mission panel and fills the listbox with the missions from the session
    def make_mission_list_panel(self, parent_frame):
        right_frame = Frame(parent_frame)
        right_frame.pack(side=RIGHT)

        mission_list_label = Label(right_frame, text="Missions")
        mission_list_label.pack()

        global missions
        missions = session.get_missions()
        print "Missions:"

        mission_list = Listbox(right_frame, width=self.panel_width)
        for mission in missions:
            print mission
            mission_name = mission["name"]
            mission_list.insert(END, mission_name)
        mission_list.bind('<<ListboxSelect>>', self.on_select_mission)
        mission_list.pack()
        print ""

    # builds the selected hero panel
    def make_selected_hero_panel(self, parent_frame):
        selectedheropanel.init(parent_frame)

    # builds the selected mission panel
    def make_selected_mission_panel(self, parent_frame):
        selectedmissionpanel.init(parent_frame)

    # builds the bottom panel
    def make_bottom_panel(self, parent_frame):
        playerpanel.init(parent_frame, session)

    def create_widgets(self, game_session):
        global session
        session = game_session
        top_frame = Frame()
        top_frame.pack(side=TOP)

        self.make_hero_list_panel(top_frame)
        self.make_mission_list_panel(top_frame)

        middle_left = Frame(width=self.width/3)
        middle_left.pack(side=LEFT)  # , expand=TRUE)
        middle_right = Frame(width=self.width/3)
        middle_right.pack(side=RIGHT)  # , expand=TRUE)

        self.make_selected_hero_panel(middle_left)
        self.make_selected_mission_panel(middle_right)

        bottom_frame = Frame(width=self.width/3)
        bottom_frame.pack(side=BOTTOM, expand=TRUE)
        self.make_bottom_panel(bottom_frame)

    def __init__(self, game_session, master=None):
        Frame.__init__(self, master)
        self.pack()
        self.create_widgets(game_session)
