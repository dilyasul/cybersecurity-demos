const form = document.getElementById("commentForm");
const commentInput = document.getElementById("commentInput");
const commentSection = document.getElementById("commentSection");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const comment = commentInput.value.trim();
  const mode = document.querySelector('input[name="mode"]:checked').value;

  if (!comment) return;

  const wrapper = document.createElement("div");
  wrapper.className = "comment-block";

  let rendered, rawHTML;

  if (mode === "vulnerable") {
    rendered = comment;
    rawHTML = comment;
  } else if (mode === "safe") {
    rendered = escapeHTML(comment);
    rawHTML = escapeHTML(comment);
  } else if (mode === "purify") {
    rendered = DOMPurify.sanitize(comment);
    rawHTML = rendered;
  }

  wrapper.innerHTML = `
    <div class="comment-header">
      <img src="https://api.dicebear.com/7.x/initials/svg?seed=${Math.random()}" class="avatar" />
      <span class="comment-mode">Mode: ${mode.toUpperCase()}</span>
    </div>
    <div class="comment-rendered">${rendered}</div>
    <details class="raw-html">
      <summary>Show Raw HTML</summary>
      <pre><code>${rawHTML.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>
    </details>
  `;

  const explanationBox = document.getElementById("explanationText");
let explanation = "";

if (mode === "vulnerable") {
  if (/<script|onerror|javascript:/i.test(comment)) {
    explanation = "Vulnerable Mode: Your input included potentially dangerous content and was rendered without filtering, so scripts can execute!";
  } else {
    explanation = "Vulnerable Mode: Your comment was rendered directly, but did not contain dangerous tags.";
  }
} else if (mode === "safe") {
  explanation = "Safe Mode: Your input was escaped, so even if it included scripts or HTML, they were displayed as plain text.";
} else if (mode === "purify") {
  explanation = "DOMPurify Mode: The input was sanitized using a real-world library that strips malicious code safely.";
}

explanationBox.textContent = explanation;


  commentSection.appendChild(wrapper);
  commentInput.value = "";
});

function escapeHTML(str) {
  return str.replace(/[&<>"']/g, function (m) {
    return ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    })[m];
  });
}
