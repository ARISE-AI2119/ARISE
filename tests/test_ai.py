from brain import Brain


def test_greeting_response():
    brain = Brain()
    assert "Hello" in brain.respond("hello")


def test_joke_response():
    brain = Brain()
    assert "programmers" in brain.respond("tell me a joke")


def test_help_response():
    brain = Brain()
    assert "hello" in brain.respond("help")
