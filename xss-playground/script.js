const form = document.getElementById("commentForm");
const commentInput = document.getElementById("commentInput");
const commentSection = document.getElementById("commentSection");
const explanationBox = document.getElementById("explanationText");

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
    rawHTML = rendered;
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

  commentSection.appendChild(wrapper);
  commentInput.value = "";

  // Explanation logic
  let explanation = "";

  if (mode === "vulnerable") {
    if (/<script|onerror|javascript:/i.test(comment)) {
      explanation = "Vulnerable Mode: Dangerous code was rendered without filtering - JavaScript could execute!";
    } else {
      explanation = "Vulnerable Mode: No active script, but rendering is unsafe.";
    }
  } else if (mode === "safe") {
    explanation = "Safe Mode: HTML was escaped - no code will execute.";
  } else if (mode === "purify") {
    explanation = "DOMPurify Mode: Code was cleaned using DOMPurify to strip malicious content.";
  }

  explanationBox.textContent = explanation;
});

function escapeHTML(str) {
  return str.replace(/[&<>"']/g, (m) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }[m]));
}

function insertExample(payload) {
  const input = document.getElementById("commentInput");
  input.value = decodeHTMLEntities(payload);
}

function decodeHTMLEntities(str) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = str;
  return textarea.value;
}

document.querySelectorAll('.payload-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const encoded = btn.getAttribute('data-payload');
    const decoded = decodeHTMLEntities(encoded);
    document.getElementById("commentInput").value = decoded;
  });
});
