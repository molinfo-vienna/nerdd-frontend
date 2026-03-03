<h1 align="center">
    nerdd-frontend
</h1>

<p align="center" style="margin-top: 25px; font-size: 20px;">
<img src="screenshots/screenshot_a.png" width="45%">
<img src="screenshots/screenshot_b.png" width="45%">
<img src="screenshots/screenshot_c.png" width="45%">
<img src="screenshots/screenshot_d.png" width="45%">
</p>

<hr/>

<div align="center">

![GitHub package.json version](https://img.shields.io/github/package-json/v/molinfo-vienna/nerdd-frontend)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux-593D88?logo=redux&logoColor=white)
![GitHub License](https://img.shields.io/github/license/molinfo-vienna/nerdd-frontend)

</div>

<div align="center">
<a href="https://github.com/molinfo-vienna/nerdd-module">📦 nerdd-module</a>
•
<a href="https://github.com/molinfo-vienna/nerdd-link">🔗 nerdd-link</a>
•
<a href="https://github.com/molinfo-vienna/nerdd">⚙️ Infrastructure</a>
•
<a href="https://nerdd.univie.ac.at">🌐 NERDD website</a>
</div>

<br/>

## Introduction

**nerdd-frontend** is the web interface of the NERDD platform. NERDD provides a collection of
prediction models for cheminformatics, and nerdd-frontend gives each model

* an entry on the landing page,
* a page for submitting prediction jobs based on the model's input specification,
* a results page displaying prediction results in a structured data table, and
* additional pages for model documentation and API usage.

The application was built with React and offers:

* a single-page application architecture,
* user-friendly prediction forms with tooltips on all form fields,
* real-time result streaming via WebSockets,
* a mobile-friendly experience that works on phones and tablets,
* auto-generated REST API documentation, and
* flexible output visualization adapting to the model's configuration.

## Contribute

* Fork and / or clone the code
* `npm install`
* `npm start`
* open a browser on localhost:3000
* Note: the frontend is able to generate mock data and can be tested without a backend system

