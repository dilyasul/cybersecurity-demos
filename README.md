# Cybersecurity Demos

This repository showcases **interactive, educational web demos** of common cybersecurity threats. Each project is designed to simulate real-world attack techniques in a safe, sandboxed environment.

---

##  Purpose

To raise awareness about cyber threats by showing **how they work in practice** — not just in theory. These hands-on demos are ideal for:

- Students learning cybersecurity
- Developers understanding application-layer threats
- Anyone curious about digital security

---

##  Projects Included

###  Phishing: URL Lookalike Attack  
 `phishing-url-lookalike/`

Simulates a fake login page that uses a **spoofed domain name** (typosquatting) to deceive users.  
- Highlights how attackers register lookalike URLs to trick users into entering credentials.
- Demonstrates common UI patterns attackers mimic (e.g., Google login pages).
- Encourages critical thinking about domain names and padlock trust.

---

###  Credential Stuffing  
 `credential_stuffing/`

Simulates a login form with **strict password validation** to raise awareness about password reuse and weak credentials.

- Detects common bad passwords like `"123456"`, `"password"`, and `"qwerty123"`.
- Triggers warning modals when insecure credentials are entered.
- Demonstrates how attackers automate login attempts using leaked username/password combos.

 **Note:** No real authentication occurs. This is a visual-only simulation.

---

###  Cross-Site Scripting (XSS) Playground  
 `xss-playground/`

A sandboxed environment to test and understand **XSS vulnerabilities** with selectable protection levels.

- Users can input text and toggle between:
  -  **Vulnerable Mode** — accepts all input, including raw `<script>` tags
  -  **Safe Mode** — blocks dangerous input
  -  **DOMPurify Mode** — sanitizes input using the open-source [DOMPurify](https://github.com/cure53/DOMPurify) library
- Includes:
  - Live raw HTML rendering
  - Example payload buttons
  - XSS alert counter
  - Educational guidance panel

This demo teaches the impact of client-side injection and how libraries like DOMPurify can help mitigate risk.

---

##  How to Use

Each folder is self-contained and includes an `index.html` you can open directly or serve via a lightweight HTTP server like:

```bash
npx http-server -p 5500




