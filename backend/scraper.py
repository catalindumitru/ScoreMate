import requests
from bs4 import BeautifulSoup


# Function to scrape item information from Tesco website
def scrape_tesco_item(item_name):
    # Construct the search URL
    search_url = f"https://www.tesco.com/groceries/en-GB/search?query={item_name}"

    try:
        # Send an HTTP GET request to the URL
        response = requests.get(
            search_url, headers={"User-Agent": "Mozilla/5.0 (X11; Linux x86_64)"}
        )
        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            # Parse the HTML content of the page
            soup = BeautifulSoup(response.text, "html.parser")

            products = soup.find("div", class_="product-lists").find_all(
                "div", {"data-auto": "product-tile"}
            )

            results = []
            for product in products:
                name = product.find(
                    "a", {"data-auto": "product-tile--title"}
                ).text.strip()

                price = product.find("p", class_="beans-price__text")
                if not price:
                    continue
                price = price.text.strip()
                if promo := product.find("span", class_="offer-text"):
                    promo = promo.text.strip()
                    if "Clubcard Price" in promo:
                        price = promo.replace("Clubcard Price", "")

                image_url = product.find("img", class_="product-image")["src"]

                results.append(
                    {
                        "name": name,
                        "price": price,
                        "imageUrl": image_url,
                    }
                )
            return results

        else:
            # Handle unsuccessful HTTP request
            print(f"Failed to fetch data. Status code: {response.status_code}")
            return None

    except Exception as e:
        # Handle exceptions
        print(f"An error occurred: {str(e)}")
        return None


# Example usage
if __name__ == "__main__":
    item_name = "milk"
    results = scrape_tesco_item(item_name)
    if results:
        for item_info in results:
            print(f"Item Name: {item_info['name']}")
            print(f"Item Price: {item_info['price']}")
            print(f"Item Picture URL: {item_info['picture_url']}")
