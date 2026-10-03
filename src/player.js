(() => {
  const patchPlayer = () => {
    if (!window.jigexGlobals || !window.jigexGlobals.modules?.player?.Puzzle) {``
      setTimeout(patchPlayer, 50);
      return;
    }

    const Puzzle = window.jigexGlobals.modules.player.Puzzle;

    // Store the original method
    const originalOnComplete = Puzzle.prototype.onComplete;

    Puzzle.prototype.onComplete = function() {
      originalOnComplete.apply(this, arguments);
      const photoName = location.search.split("puzzle_id=")[1].split("&")[0];
      const completion = JSON.parse(localStorage.getItem("completion")) || {};
      if (!completion[photoName]) {
        completion[photoName] = new Date().toLocaleString();
        localStorage.setItem("completion", JSON.stringify(completion));
      }
    }
  };
  patchPlayer();
})();
