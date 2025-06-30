# Cybersecurity Demos
This repository contains interactive, educational demos of common cybersecurity threats.

## Purpose
To raise awareness through simple web-based demos and help users understand how cyber threats work in practice.

## Projects
- **Phishing: URL Lookalike Attack**  
  `phishing-url-lookalike/` — Simulates a fake login page using a spoofed domain to demonstrate how users can be tricked by typo-squatting.

- **Credential Stuffing**
`credential_stuffing/` — Simulates a fake login page that has strict security measures for passwords (length, special characters, etc).
  **!!** When running simulation, passwords such as "123456", "password", "qwerty123", etc. will automatically prompt a pop-up of shame, warning users to not use such passwords.

- **XSS Playground**
  `xss-playground/` — Demonstrates how Cross-Site Scripting vulnerabilities work in a controlled sandbox. Users can input text into a comment box and toggle between **Vulnerable**, **Safe**, and **DOMPurify** modes to see how unsanitized input can lead to malicious script execution.

  **!!** In Vulnerable Mode, inputs like `<script>alert("XSS")</script>` will trigger a real alert. DOMPurify Mode safely sanitizes the input using a real-world XSS defense library. The demo includes a live raw HTML preview, preloaded payload buttons, and an educational explanation panel to help users understand the impact and mitigation of XSS attacks.
  
  
  







