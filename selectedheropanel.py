from Tkinter import *

hero_name_label = None
hero_skill_label = None
hero_cost_label = None
hero_description_label = None


def init(parent_frame):
    frame = Frame(parent_frame)
    frame.pack()

    label = Label(frame, text="Selected Hero")
    label.pack(anchor=W)

    name_label = Label(frame)
    name_label.pack(anchor=W)
    global hero_name_label
    hero_name_label = name_label

    skill_label = Label(frame)
    skill_label.pack(anchor=W)
    global hero_skill_label
    hero_skill_label = skill_label

    cost_label = Label(frame)
    cost_label.pack(anchor=W)
    global hero_cost_label
    hero_cost_label = cost_label

    description_label = Label(frame)
    description_label.pack(anchor=W)
    global hero_description_label
    hero_description_label = description_label

def update_selected_hero(selected_hero):
    hero_name_label['text'] = "Name: " + selected_hero['name']
    hero_skill_label['text'] = "Skill Level: " + selected_hero['skill']
    hero_cost_label['text'] = "Hiring Cost: " + selected_hero['cost']
    hero_description_label['text'] = "Description: " + selected_hero['description']
