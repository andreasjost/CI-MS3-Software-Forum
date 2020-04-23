import os
import datetime
# import json
from flask import Flask, render_template, redirect, request, url_for, jsonify, make_response
from flask_pymongo import PyMongo
from bson.objectid import ObjectId

from os import path

app = Flask(__name__)

if path.exists("env.py"):
    import env

app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.config["MONGO_DBNAME"] = 'software_forum'


mongo = PyMongo(app)


searchFilters = {"searchTitles": ".*",
                 "SearchDetails": ".*",
                 "SearchComments": ".*",
                 "dateOrder": -1,
                 "platform": ['Windows', 'MacOS', 'Linux', 'Android', 'iOS', 'Other'],
                 "cost": ".*",
                 "answers": "All"}


@app.route('/')
@app.route('/get_topics')
def get_topics():
    return render_template("topics.html", topics=mongo.db.topics.find().sort('publish_date', -1))


@app.route('/search_topics/<search_titles>/<search_details>/<search_comments>')
def search_topics(search_titles, search_details, search_comments):
    searchFilters["searchTitles"] = search_titles
    searchFilters["searchDetails"] = search_details
    searchFilters["searchComments"] = search_comments
    search_result = mongo.db.topics.find({
        "$or": [
            {'title': {'$regex': searchFilters["searchTitles"], '$options': 'i'}},
            {'details': {'$regex': searchFilters["searchDetails"], '$options': 'i'}},
            {'comments': {'$regex': searchFilters["searchComments"], '$options': 'i'}}
        ]
    })
    return render_template('topicstable.html', topics=search_result)



@app.route('/sort_topics_date/<date_order>')
def sort_topics_date(date_order):
    searchFilters["dateOrder"] = int(date_order)
    search_result = mongo.db.topics.find().sort('publish_date', searchFilters["dateOrder"])
    return render_template('topicstable.html', topics=search_result)


@app.route('/filter_topics_platform/<platform_filter>')
def filter_topics_platform(platform_filter):
    filter_list = platform_filter.split(",")
    searchFilters["platform"] = filter_list
    search_result = mongo.db.topics.find({"os": {"$in": searchFilters["platform"]}})
    return render_template('topicstable.html', topics=search_result)


@app.route('/filter_topics_cost/<cost_filter>')
def filter_topics_cost(cost_filter):
    if cost_filter == "All":
        cost_filter = ".*"
    searchFilters["cost"] = cost_filter
    search_result = mongo.db.topics.find({"cost": {"$regex": searchFilters["cost"]}})
    return render_template('topicstable.html', topics=search_result)


@app.route('/filter_topics_answer/<answer_filter>')
def filter_topics_answer(answer_filter):

    if answer_filter == "Answered":
        search_result = mongo.db.topics.find({"comments": {"$exists": True, "$ne": None}})

    elif answer_filter == "Unanswered":
        search_result = mongo.db.topics.find({"comments": {"$exists": False}})

    else:
        search_result = mongo.db.topics.find()

    searchFilters["answers"] = answer_filter
    return render_template('topicstable.html', topics=search_result)


@app.route('/add_topic')
def add_topic():
    return render_template('addtopic.html')


@app.route('/insert_topic', methods=['POST'])
def insert_topic():
    received_dict = request.form.to_dict()
    received_dict.update({'os': request.form.getlist('os')})
    received_dict['publish_date'] = datetime.datetime.utcnow()
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
    topics.update({'_id': ObjectId(topic_id)}, {
        'title': request.form.get('title'),
        'details': request.form.get('details'),
        'author': request.form.get('author'),
        'os': request.form.getlist('os'),
        'cost': request.form.get('cost')
    })
    return redirect(url_for('get_topics'))


@app.route('/delete_topic/<topic_id>')
def delete_topic(topic_id):
    mongo.db.topics.remove({'_id': ObjectId(topic_id)})
    return redirect(url_for('get_topics'))


@app.route('/insert_comment/<topic_id>', methods=['POST'])
def insert_comment(topic_id):
    topics = mongo.db.topics
    one_object = {
        'comment_text': request.form.get('comment_text'),
        'comment_author': request.form.get('comment_author'),
        'comment_pos': 0,
        'comment_neg': 0,
        'popularity': 0
    }
    topics.update({'_id': ObjectId(topic_id)}, {'$push': {'comments': one_object}})
    return redirect(url_for('get_topics'))


@app.route('/rate_pos/<topic_id>/<index>')
def rate_pos(topic_id, index):
    thumbs_number = comment_rating(topic_id, int(index), 1, 0)
    return jsonify({'totalThumbs': thumbs_number})

@app.route('/rate_neg/<topic_id>/<index>')
def rate_neg(topic_id, index):
    thumbs_number = comment_rating(topic_id, int(index), 0, 1)
    return jsonify({'totalThumbs': thumbs_number})


def comment_rating(topic_id, index, positive, negative):
    topics = mongo.db.topics
    topic = topics.find_one({'_id': ObjectId(topic_id)})
    all_comments = topic['comments']
    thumbs_up = all_comments[index-1]['comment_pos']
    thumbs_down = all_comments[index-1]['comment_neg']
    thumbs_up += positive
    thumbs_down += negative
    all_comments[index-1]['comment_pos'] = thumbs_up
    all_comments[index-1]['comment_neg'] = thumbs_down
    all_comments[index-1]['popularity'] = thumbs_up - thumbs_down
    all_comments.sort(reverse=True, key=get_key)
    topics.update_one({'_id': ObjectId(topic_id)}, {
        '$set': {'comments': all_comments}
    })
    if positive == 1:
        return thumbs_up
    else:
        return thumbs_down

"""
This definition is used in the comment_rating definition in order to sort the comments
according to the popularity
"""
def get_key(e):
    return e['popularity']





if __name__ == '__main__':
    app.run(host=os.environ.get('IP'),
        port=int(os.environ.get('PORT')),
        debug=True)
