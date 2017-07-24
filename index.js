'use strict';

var http = require("http");

var port = process.env.PORT || 5000;

http.createServer(function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(renderBody(request));
}).listen(port);

console.log('Running on port ' + port);

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function parseIpFromEvent(request) {
  var ipAddr = request.headers["x-forwarded-for"];
  if (ipAddr){
    var list = ipAddr.split(",");
    ipAddr = list[list.length-1];
  } else {
    ipAddr = request.connection.remoteAddress;
  }
  return ipAddr;
}

function renderBody(request) {
    var currentTime = new Date().toLocaleTimeString(),
        currentIp = parseIpFromEvent(request),
        icons = ['👍','😊','😃','😊','🎉','😎','🤑','😁','😺','👋','🌞','🌈','🍻','🚀','🎊','💯','✅','🆗','🆙']

    var html = `<!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1.0">
    <title>Am I online?</title>
    <style media="screen">
      body {
        font-family: system, sans-serif;
        font-weight: 300;
        text-align: center;
        margin: 0;
        padding: 0;
      }
      section.main {
        position: absolute;
        height: 100%;
        width: 100%;
      }
      section.content {
        position: absolute;
        height: 50%;
        width: 100%;
        top: 15%;
      }
      h1 {
        margin-bottom: 0;
        font-size: 125px;
      }
      p.lead {
        margin-top: 0;
        font-size: 30px;
        /*color: rgb(60, 170, 61);*/
      }
      .details {
        font-size: 12px;
        color: rgba(0,0,0, 0.6);
      }
      code {
        font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
      }
      code#currentIp {
        margin-right: 1em;
      }
      .icon {
        display: inline-block;
        width: 1em;
        height: 1em;
        margin-bottom: -2px;
        color: rgba(0,0,0, 0.2);
        stroke-width: 0;
        stroke: currentColor;
        fill: currentColor;
      }
    </style>
    </head>
    <body>
    <svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <symbol id="icon-clock" viewBox="0 0 32 32">
          <title>clock</title>
          <path d="M20.586 23.414l-6.586-6.586v-8.828h4v7.172l5.414 5.414zM16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 28c-6.627 0-12-5.373-12-12s5.373-12 12-12c6.627 0 12 5.373 12 12s-5.373 12-12 12z"></path>
        </symbol>
        <symbol id="icon-earth" viewBox="0 0 32 32">
          <title>earth</title>
          <path d="M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 30c-1.967 0-3.84-0.407-5.538-1.139l7.286-8.197c0.163-0.183 0.253-0.419 0.253-0.664v-3c0-0.552-0.448-1-1-1-3.531 0-7.256-3.671-7.293-3.707-0.188-0.188-0.442-0.293-0.707-0.293h-4c-0.552 0-1 0.448-1 1v6c0 0.379 0.214 0.725 0.553 0.894l3.447 1.724v5.871c-3.627-2.53-6-6.732-6-11.489 0-2.147 0.484-4.181 1.348-6h3.652c0.265 0 0.52-0.105 0.707-0.293l4-4c0.188-0.188 0.293-0.442 0.293-0.707v-2.419c1.268-0.377 2.61-0.581 4-0.581 2.2 0 4.281 0.508 6.134 1.412-0.13 0.109-0.256 0.224-0.376 0.345-1.133 1.133-1.757 2.64-1.757 4.243s0.624 3.109 1.757 4.243c1.139 1.139 2.663 1.758 4.239 1.758 0.099 0 0.198-0.002 0.297-0.007 0.432 1.619 1.211 5.833-0.263 11.635-0.014 0.055-0.022 0.109-0.026 0.163-2.541 2.596-6.084 4.208-10.004 4.208z"></path>
        </symbol>
      </defs>
    </svg>

    <section class="main">
      <section class="content">
        <h1>${icons[getRandomIntInclusive(0,icons.length-1)]}</h1>
        <p class="lead">
          Yep, you're online.
        </p>
        <p class="details">
          <svg class="icon icon-earth"><use xlink:href="#icon-earth"></use></svg>
          <code id="currentIp">${currentIp}</code>

          <svg class="icon icon-clock"><use xlink:href="#icon-clock"></use></svg>
          <code id="currentTime">${currentTime}</code>
        </p>
      </section>
    </section>
    <script>$("#currentTime").textContent = new Date().toLocaleTimeString()</script>
    </body>
    </html>
`;

  return html;
};
