import os
from flask import Flask, render_template, redirect, request, url_for
from flask_pymongo import PyMongo
from bson.objectid import ObjectId

from os import path

app = Flask(__name__)

if path.exists("env.py"):
    import env

app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.config["MONGO_DBNAME"] = 'software_forum'


mongo = PyMongo(app)


@app.route('/')
@app.route('/get_topics')
def get_topics():
    return render_template("topics.html",
        topics=mongo.db.topics.find(),
        answers=mongo.db.answers.find())


@app.route('/add_topic')
def add_topic():
    return render_template('addtopic.html')


@app.route('/insert_topic', methods=['POST'])
def insert_topic():
    topics = mongo.db.topics
    topics.insert_one(request.form.to_dict())
    print(request.form.to_dict())
    return redirect(url_for('get_topics'))


if __name__ == '__main__':
    app.run(host=os.environ.get('IP'),
        port=int(os.environ.get('PORT')),
        debug=True)
