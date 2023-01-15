from selenium import webdriver
from selenium.webdriver.common.by import By
import requests as rq
import time

main_bin_path = r"/usr/bin/chromedriver"
driver = webdriver.Chrome(main_bin_path)


def get_element(xpath):
    return driver.find_element(By.XPATH, xpath)


def search_something():
    driver.get("http://localhost:3000/search")
    time.sleep(1.5)
    contactButton = get_element("//*[@id='root']/div[2]/div[2]/div/div/div/div[2]/form/button")
    contactButton.click()
    time.sleep(1.5)
    try:
        post = get_element("//*[@id='root']/div[2]/div[2]/div/div/div/div[3]/a")
        return True
    except:
        return False


def sign_up():
    driver.get("http://localhost:3000/")
    time.sleep(2)
    contactButton = get_element("//span[contains(text(),'Register')]")
    contactButton.click()
    time.sleep(5)

    name = get_element('//*[@id="formRegisterName"]')
    email = get_element('//*[@id="formRegisterEmail"]')
    password = get_element('//*[@id="formRegisterPassword"]')
    confirm_password = get_element('//*[@id="formRegisterPasswordConfirmation"]')

    sign_up_button = get_element("//button[contains(text(),'Sign')]")

    name.send_keys('test')
    email.send_keys('test@gmail.com')
    password.send_keys('123456')
    confirm_password.send_keys('123456')
    time.sleep(2)

    sign_up_button.click()
    time.sleep(2)

    json_data = {
    "email": "test@gmail.com",
    "password": "123456"
    }
    resp = rq.post('http://localhost:8000/api/login/', json=json_data)
    return resp.status_code

def log_in():
    driver.get("http://localhost:3000/")
    time.sleep(2)
    contactButton = get_element("//span[contains(text(),'Log In')]")
    contactButton.click()
    time.sleep(5)

    email = get_element('//*[@id="formLoginEmail"]')
    password = get_element('//*[@id="fromLoginPassword"]')
    log_in_button = get_element("//button[contains(text(),'Sign In')]")

    email.send_keys('test@gmail.com')
    password.send_keys('123456')
    time.sleep(2)

    log_in_button.click()

    try:
        settings = get_element("//span[contains(text(),'Settings')]")
        return True
    except:
        return False
