from flask import Blueprint, jsonify

main = Blueprint('main', __name__)

@main.route("/search_product", methods=["GET"])
def search_product():

    results = None
    response = jsonify({"results": results})
    return response