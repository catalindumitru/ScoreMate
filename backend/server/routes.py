import os
from dotenv import load_dotenv
from flask import Blueprint, jsonify, request
from pymongo.mongo_client import MongoClient

load_dotenv()

main = Blueprint("main", __name__)
client = MongoClient(os.getenv("MONGODB_URI"))
db = client["ScoreMate"]


@main.route("/getOpponents", methods=["GET"])
def get_opponents():
    args = request.args
    user = args["user"]

    collection = db["H2Hs"]
    query = {"$or": [{"user1": user}, {"user2": user}]}
    cursor = collection.find(query)

    opponents = []
    for document in cursor:
        opponents.append(
            document["user1"] if document["user1"] != user else document["user2"]
        )

    response = jsonify({"opponents": opponents})
    return response


@main.route("/getScore", methods=["GET"])
def get_score():
    args = request.args
    user1 = args["user1"]
    user2 = args["user2"]

    collection = db["H2Hs"]
    query = {
        "$or": [{"user1": user1, "user2": user2}, {"user1": user2, "user2": user1}]
    }
    cursor = collection.find(query)

    document = cursor.next()

    del document["_id"]
    response = jsonify(document)
    return response


@main.route("/increaseScore", methods=["POST"])
def increase_score():
    args = request.form
    user1 = args["user1"]
    user2 = args["user2"]
    winner = args["winner"]

    collection = db["H2Hs"]
    query = {
        "$or": [{"user1": user1, "user2": user2}, {"user1": user2, "user2": user1}]
    }
    cursor = collection.find(query)

    document = cursor.next()
    if (winner == user1 and document["user1"] == user1) or (
        winner == user2 and document["user1"] == user2
    ):
        update_operation = {"$inc": {"score1": 1}}
    else:
        update_operation = {"$inc": {"score2": 1}}

    collection.update_one(query, update_operation)

    response = jsonify(winner)
    return response
