print("THIS IS MY NEW APP")
from brain import Brain

print("=" * 50)
print("        ARISE AI v0.1")
print(" Akshit Raj Intelligent Super Engine")
print("=" * 50)
print("Type 'exit' to quit.\n")

brain = Brain()

while True:
    user = input("You: ")

    if user.lower() in ["exit", "quit", "bye"]:
        print("\nARISE: Goodbye! Have a great day.")
        break

    try:
        reply = brain.respond(user)
        print("\nARISE:", reply)
        print()

    except Exception as e:
        print("\nARISE: Sorry, an error occurred.")
        print("Error:", e)
        print()