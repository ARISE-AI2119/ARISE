import json
from pathlib import Path


class Memory:
    def __init__(self, data_dir: str = "data"):
        self.data_dir = Path(data_dir)
        self.data_dir.mkdir(exist_ok=True)
        self.memory_file = self.data_dir / "memory.json"
        self.history_file = self.data_dir / "history.json"
        self.memory = self._load_json(self.memory_file, {})
        self.history = self._load_json(self.history_file, [])

    def _load_json(self, path: Path, default):
        if path.exists():
            try:
                return json.loads(path.read_text(encoding="utf-8"))
            except json.JSONDecodeError:
                return default
        return default

    def save_memory(self, key: str, value: str):
        self.memory[key] = value
        self.memory_file.write_text(json.dumps(self.memory, indent=2), encoding="utf-8")

    def add_history(self, entry: str):
        self.history.append(entry)
        self.history_file.write_text(json.dumps(self.history, indent=2), encoding="utf-8")
