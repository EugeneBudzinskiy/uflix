import unittest
from test import *


class MyTestCase(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome(main_bin_path)

    def test_search(self):
        search_result = search_something()
        self.assertEqual(search_result, True)  # add assertion here

    def test_sign_up(self):
        status_code = sign_up()
        self.assertEqual(status_code, 200)

    def test_log_in(self):
        log_in_result = log_in()
        self.assertEqual(log_in_result, True)


if __name__ == '__main__':
    unittest.main()
