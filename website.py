from flask import Flask, render_template, request, jsonify
from brain import Brain

app = Flask(__name__)

brain = Brain()

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()

    user_message = data["message"]

    reply = brain.respond(user_message)

    return jsonify({
        "reply": reply
    })

import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
    