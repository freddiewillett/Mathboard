*MATHBOARD*
UIT chat app project
by Freddie Willett,
21-10-16

How do I host my own Mathboard with private databases?


Clone repo

Create a PubNub account, and a project with two keysets 

Put your own PubNub keys in app.js where mine are (one set for the canvas and one for the chat)

Open up your terminal, and change directory to where you downloaded the repo using the cd command

Run "python -m SimpleHTTPServer

Open localhost:8000 in your browser of choice

You should now be running your own local Mathboard site with your own databases for the canvas and chat!

