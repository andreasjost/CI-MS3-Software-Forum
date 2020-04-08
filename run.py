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
    received_dict = request.form.to_dict()
    received_dict.update({'os': request.form.getlist('os')})
    topics = mongo.db.topics
    topics.insert_one(received_dict)
    return redirect(url_for('get_topics'))


@app.route('/edit_topic/<topic_id>')
def edit_topic(topic_id):
    the_task =  mongo.db.topics.find_one({"_id": ObjectId(topic_id)})
    all_categories =  mongo.db.categories.find()
    return render_template('edittopic.html', task=the_task,
                           categories=all_categories)


@app.route('/delete_topic/<topic_id>')
def delete_topic(topic_id):
    mongo.db.topics.remove({'_id': ObjectId(topic_id)})
    return redirect(url_for('get_topics'))


if __name__ == '__main__':
    app.run(host=os.environ.get('IP'),
        port=int(os.environ.get('PORT')),
        debug=True)
