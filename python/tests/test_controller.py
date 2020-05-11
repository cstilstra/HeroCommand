import unittest
from controller import Controller


class TestController(unittest.TestCase):

    def setUp(self):
        self.controller = Controller()
        self.session = self.controller.session
        self.hero_affordable = {'name': "Affordable Hero",
                                'description': "",
                                'cost': "1",
                                'skill': "0"}
        self.hero_unaffordable = {'name': "Unaffordable Hero",
                                  'description': "",
                                  'cost': "45",
                                  'skill': "1"}
        self.mission_affordable = {'name': "Affordable Mission",
                                   'description': "",
                                   'cost': "1",
                                   'reward': "10",
                                   'difficulty': "1"}
        self.mission_unaffordable = {'name': "Unaffordable Mission",
                                     'description': "",
                                     'cost': "45",
                                     'reward': "1",
                                     'difficulty': "1"}

    def tearDown(self):
        self.controller = None
        self.session = None
        self.hero_affordable = {}
        self.hero_unaffordable = {}

    def test_on_init_player_purse_is_44(self):
        purse = self.session.get_player_purse()
        self.assertEqual(purse, 44)

    def test_hire_hero_deducts_cost(self):
        purse = self.session.get_player_purse()
        self.assertEqual(purse, 44)
        self.session.set_selected_hero(self.hero_affordable)

        self.controller.hire_hero()

        purse = self.session.get_player_purse()
        self.assertEqual(purse, 43)

    def test_hire_hero_does_not_deduct_cost(self):
        purse = self.session.get_player_purse()
        self.assertEqual(purse, 44)
        self.session.set_selected_hero(self.hero_unaffordable)

        self.controller.hire_hero()

        purse = self.session.get_player_purse()
        self.assertEqual(purse, 44)

    def test_run_mission_deducts_cost(self):
        purse = self.session.get_player_purse()
        self.assertEqual(purse, 44)
        self.session.set_hired_hero(self.hero_affordable)
        self.session.set_selected_mission(self.mission_affordable)

        self.controller.run_mission()

        purse = self.session.get_player_purse()
        self.assertEqual(purse, 43)

    def test_run_mission_does_not_deduct_cost(self):
        purse = self.session.get_player_purse()
        self.assertEqual(purse, 44)
        self.session.set_hired_hero(self.hero_affordable)
        self.session.set_selected_mission(self.mission_unaffordable)

        self.controller.run_mission()

        purse = self.session.get_player_purse()
        self.assertEqual(purse, 44)

    def test_run_mission_adds_reward(self):
        purse = self.session.get_player_purse()
        self.assertEqual(purse, 44)
        self.session.set_hired_hero(self.hero_unaffordable)
        self.session.set_selected_mission(self.mission_affordable)

        self.controller.run_mission()

        purse = self.session.get_player_purse()
        self.assertEqual(purse, 53)


if __name__ == '__main__':
    unittest.main()
