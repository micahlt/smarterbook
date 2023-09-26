console.log("SmarterBook is running 😎");
MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

window.addEventListener("load", () => {
  console.log("LOADED");
  const rootEl = document;
  var observer = new MutationObserver(() => {
    if (!rootEl.querySelector(".smarterbook-research-buttons")) {
      setupFeatures();
    }
  });

  const setupFeatures = () => {
    const promptEl = rootEl.querySelector(".prompt");
    const parentEl = rootEl.querySelector("h2.probe-header");
    if (!promptEl || !promptEl.querySelector("p")) {
      return;
    }
    const question = promptEl
      .querySelector("p")
      .innerText.replaceAll("\n", "")
      .replace(/\s+/g, " ")
      .trim();
    const buttonsEl = document.createElement("div");
    buttonsEl.classList.add("smarterbook-research-buttons");

    // SEARCH ON GOOGLE button
    const googleButton = document.createElement("button");
    googleButton.innerText = "Search on Google";
    googleButton.setAttribute(
      "title",
      "Open a new Google search with this question"
    );
    googleButton.classList.add("smarterbook-button");
    googleButton.classList.add("smarterbook-google");
    googleButton.addEventListener("click", () => {
      window.open(
        `https://google.com/search?q=${encodeURIComponent(question)}`
      );
    });

    // QUIZLET button
    const quizletButton = document.createElement("button");
    quizletButton.innerText = "Search on Quizlet";
    quizletButton.setAttribute(
      "title",
      "Search for Quizlet flashcards of this question"
    );
    quizletButton.classList.add("smarterbook-button");
    quizletButton.classList.add("smarterbook-quizlet");
    quizletButton.addEventListener("click", () => {
      window.open(
        `https://quizlet.com/search?query=${encodeURIComponent(
          question
        )}&type=all`
      );
    });

    // BING CHAT button
    const bingButton = document.createElement("button");
    bingButton.innerText = "Research with GPT4";
    bingButton.setAttribute(
      "title",
      "Open a new GPT4 Bing Chat with this question"
    );
    bingButton.classList.add("smarterbook-button");
    bingButton.classList.add("smarterbook-bing");
    bingButton.addEventListener("click", () => {
      window.open(
        `https://www.bing.com/search?showconv=1&sendquery=1&q=${encodeURIComponent(
          question
        )}`
      );
    });

    // COPY QUESTION button
    const copyButton = document.createElement("button");
    copyButton.innerText = "Copy question";
    copyButton.setAttribute("title", "Copy the question to your clipboard");
    copyButton.classList.add("smarterbook-button");
    copyButton.classList.add("smarterbook-copy");
    copyButton.addEventListener("click", () => {
      navigator.clipboard.writeText(question);
      copyButton.classList.add("success");
      copyButton.innerText = "Copied!";
    });

    buttonsEl.appendChild(googleButton);
    buttonsEl.appendChild(quizletButton);
    buttonsEl.appendChild(bingButton);
    buttonsEl.appendChild(copyButton);
    parentEl.after(buttonsEl);
    const allInputs = Array.from(promptEl.querySelectorAll("input"));
    allInputs.forEach((input) => {
      input.addEventListener("keyup", (e) => {
        if (e.key === "Enter" && e.ctrlKey) {
          submitQuestion();
        }
      });
    });
  };

  const submitQuestion = () => {
    const submitButtons = document.querySelector(".confidence-buttons-wrapper");
    const submitButton = submitButtons.querySelector(
      `button[aria-label="High Confidence"]`
    );
    submitButton.click();
    setTimeout(() => {
      if (!document.querySelector(".next-button")) {
        console.error("No next button found on-screen");
        return;
      }
      document.querySelector(".next-button").focus();
    }, 500);
  };

  // define what element should be observed by the observer
  // and what types of mutations trigger the callback
  observer.observe(rootEl, {
    subtree: true,
    childList: true,
  });
});
