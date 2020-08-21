#!/bin/bash

# use set instead of export if not on linux or mac
export FLASK_APP=main.py
export FLASK_ENV=development
flask run --host=0.0.0.0