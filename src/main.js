(() => {
  let completedAt;
  let photoName;
  const setPhotoName = name => {
    photoName = name;
    completedAt = getCompletedAt();
  }
  const setCompletedAt = at => {
    completedAt = at;
    const completion = JSON.parse(localStorage.getItem("completion")) || {};
    completion[photoName] = completedAt;
    localStorage.setItem("completion", JSON.stringify(completion));
  }
  const getCompletedAt = () => {
    return (JSON.parse(localStorage.getItem("completion")) || {})[photoName]
  }
  const injectPuzzleDetail = () => {
    const updateCompletedButton = () => {
      document.getElementById("completion-data")?.remove();
      const postInfo = document.getElementsByClassName('post-info')[0];
      const completionDataSpan = document.createElement("span");
      completionDataSpan.id = "completion-data";
      completionDataSpan.append(" ");
      const b = document.createElement("b");
      b.innerHTML = "·";
      completionDataSpan.appendChild(b);
      completionDataSpan.append(" ");
      const a = document.createElement("a");
      a.className = "play-button";
      a.href = "#";
      if (completedAt) {
        a.addEventListener("click", () => {
          setCompletedAt();
          updateCompletedButton();
        });
        a.innerHTML = "Completed";
        completionDataSpan.appendChild(a);
        const dateSpan = document.createElement("span");
        dateSpan.innerHTML = "&nbsp;at&nbsp;" + completedAt;
        completionDataSpan.appendChild(dateSpan);
      } else {
        a.addEventListener("click", () => {
          setCompletedAt(new Date().toLocaleString());
          updateCompletedButton();
        });
        a.innerHTML = "Not&nbsp;completed";
        completionDataSpan.appendChild(a);
      }
      postInfo.appendChild(completionDataSpan);
    };
    const puzzleId = document.getElementsByClassName("play-button")[0].href.split("?puzzle_id=")[1];
    fetch(`https://www.jigsawexplorer.com/puzzles/profiles/${puzzleId}.json`)
      .then(res => res.json())
      .then(data => {
        setPhotoName(data.photo.name);
        updateCompletedButton();
      });
  };
  if (location.pathname.startsWith('/puzzles')) {
    injectPuzzleDetail();
  }
})();
