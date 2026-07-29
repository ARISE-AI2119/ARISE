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

if __name__ == "__main__":
    app.run(debug=True)