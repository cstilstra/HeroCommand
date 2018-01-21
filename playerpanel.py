from Tkinter import *
import gamesession

player_purse_label = None
player_purse_count_label = None
mission_outcome_label = None
game_session = None


def init(parent_frame, session):
    global game_session
    game_session = session

    frame = Frame(parent_frame)
    frame.pack()

    label = Label(frame, text="Player Purse: ")
    label.pack(anchor=W)
    global player_purse_label
    player_purse_label = label

    amount = game_session.get_player_purse()
    label = Label(frame, text=amount)
    label.pack(anchor=W)
    global player_purse_count_label
    player_purse_count_label = label

    hire_button = Button(frame)
    hire_button["text"] = "Conduct Mission"
    hire_button["command"] = button_click
    hire_button.pack(anchor=W)


def button_click():
    game_session.handle_click()
    player_purse_count_label["text"] = game_session.get_player_purse()
