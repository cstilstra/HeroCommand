from Tkinter import *

mission_name_label = None
mission_difficulty_label = None
mission_cost_label = None
mission_reward_label = None
mission_description_label = None


def init(parent_frame):
    frame = Frame(parent_frame)
    frame.pack(side=RIGHT)

    label = Label(frame, text="Selected Mission")
    label.pack()

    name_label = Label(frame)
    name_label.pack()
    global mission_name_label
    mission_name_label = name_label

    difficulty_label = Label(frame)
    difficulty_label.pack()
    global mission_difficulty_label
    mission_difficulty_label = difficulty_label

    cost_label = Label(frame)
    cost_label.pack()
    global mission_cost_label
    mission_cost_label = cost_label

    reward_label = Label(frame)
    reward_label.pack()
    global mission_reward_label
    mission_reward_label = reward_label

    description_label = Label(frame)
    description_label.pack()
    global mission_description_label
    mission_description_label = description_label


def update_selected_mission(selected_mission):
    mission_name_label['text'] = "Name: " + selected_mission['name']
    mission_difficulty_label['text'] = "Difficulty Level: " + selected_mission['difficulty']
    mission_cost_label['text'] = "Cost: " + selected_mission['cost']
    mission_reward_label['text'] = "Reward: " + selected_mission['reward']
    mission_description_label['text'] = "Description: " + selected_mission['description']