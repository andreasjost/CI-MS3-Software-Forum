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
    active_topic = mongo.db.topics.find_one({"_id": ObjectId(topic_id)})
    return render_template('edittopic.html', topic=active_topic)


@app.route('/update_topic/<topic_id>', methods=["POST"])
def update_topic(topic_id):
    topics = mongo.db.topics
    topics.update({'_id': ObjectId(topic_id)},
    {
        'title': request.form.get('title'),
        'details': request.form.get('details'),
        'author': request.form.get('author'),
        'os': request.form.getlist('os'),
        'cost': request.form.get('cost'),
        'is_urgent': request.form.get('is_urgent')
    })
    return redirect(url_for('get_topics'))


@app.route('/delete_topic/<topic_id>')
def delete_topic(topic_id):
    mongo.db.topics.remove({'_id': ObjectId(topic_id)})
    return redirect(url_for('get_topics'))


@app.route('/insert_comment/<topic_title>', methods=['POST'])
def insert_comment(topic_title):
    received_dict = request.form.to_dict()
    received_dict.update({'topic_title': topic_title})
    comments = mongo.db.answers
    comments.insert_one(received_dict)
    return redirect(url_for('get_topics'))


if __name__ == '__main__':
    app.run(host=os.environ.get('IP'),
        port=int(os.environ.get('PORT')),
        debug=True)
