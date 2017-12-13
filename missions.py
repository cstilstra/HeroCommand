# Missions module


def get_missions():
    # returns the master list of Missions

    missions = [
        {'name': "First Dangerous Mission",
            'type': "mission",
            'description': "",
            'cost': "20",
            'reward': "260",
            'difficulty': "40"},
        {'name': "Second dangerous mission",
            'type': "mission",
            'description': "",
            'cost': "30",
            'reward': "375",
            'difficulty': "50"},
        {'name': "Third mission, this one's easy",
            'type': "mission",
            'description': "",
            'cost': "4",
            'reward': "100",
            'difficulty': "20"}
    ]

    return missions
