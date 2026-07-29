import tkinter as tk

from app import main


def launch_gui():
    root = tk.Tk()
    root.title("ARISE Assistant")
    root.geometry("420x220")

    label = tk.Label(root, text="ARISE AI", font=("Segoe UI", 16, "bold"))
    label.pack(pady=(16, 8))

    info = tk.Label(root, text="Open the terminal version or start chatting from the console.")
    info.pack(pady=8)

    button = tk.Button(root, text="Start Console Chat", command=main)
    button.pack(pady=12)

    root.mainloop()


if __name__ == "__main__":
    launch_gui()
