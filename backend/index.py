from flask import Flask, request, jsonify
from flask_cors import CORS
from scraper import scrape_tesco_item

app = Flask(__name__)
CORS(app)

# Sample data for items and household members (replace with a database)
items = []
household_members = {"member1": "John", "member2": "Jane", "member3": "Doe"}


@app.route("/search_product", methods=["GET"])
def search_product():
    data = request.args
    product_name = data.get("product_name")
    results = scrape_tesco_item(product_name)
    response = jsonify({"results": results})
    return response


if __name__ == "__main__":
    app.run(debug=True)
