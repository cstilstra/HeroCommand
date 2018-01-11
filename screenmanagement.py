from Tkinter import *


class Application(Frame):

    session = None
    heroes = []
    missions = []

    def make_hero_list_panel(self, parent_frame):
        left_frame = Frame(parent_frame)
        left_frame.pack(side=LEFT)

        hero_list_label = Label(left_frame, text="Heroes")
        hero_list_label.pack()

        global heroes
        heroes = session.get_heroes()
        print "Heroes:"

        hero_list = Listbox(left_frame)
        for hero in heroes:
            print hero
            hero_name = hero["name"]
            hero_list.insert(END, hero_name)
        hero_list.pack()
        print ""

    def make_mission_list_panel(self, parent_frame):
        right_frame = Frame(parent_frame)
        right_frame.pack(side=RIGHT)

        mission_list_label = Label(right_frame, text="Missions")
        mission_list_label.pack()

        global missions
        missions = session.get_missions()
        print "Missions:"

        mission_list = Listbox(right_frame)
        for mission in missions:
            print mission
            mission_name = mission["name"]
            mission_list.insert(END, mission_name)
        mission_list.pack()
        print ""

    def make_selected_hero_panel(self, parent_frame):
        left_frame = Frame(parent_frame)
        left_frame.pack(side=LEFT)

        label = Label(left_frame, text="Selected Hero")
        label.pack()

    def make_selected_mission_panel(self, parent_frame):
        right_frame = Frame(parent_frame)
        right_frame.pack(side=RIGHT)

        label = Label(right_frame, text="Selected Mission")
        label.pack()

    def create_widgets(self, game_session):
        global session
        session = game_session
        top_frame = Frame()
        top_frame.pack(side=TOP)

        self.make_hero_list_panel(top_frame)
        self.make_mission_list_panel(top_frame)

        bottom_frame = Frame()
        bottom_frame.pack(side=BOTTOM)

        self.make_selected_hero_panel(bottom_frame)
        self.make_selected_mission_panel(bottom_frame)

    def __init__(self, game_session, master=None):
        Frame.__init__(self, master)
        self.pack()
        self.create_widgets(game_session)


# root = Tk()
# app = Application(master=root)
# app.mainloop()
