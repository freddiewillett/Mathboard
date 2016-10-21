*MATHBOARD*
UIT chat app project
by Freddie Willett,
21-10-16

How do I host my own Mathboard with private databases?


1. Clone repo

2. Create a PubNub account, and a project with two keysets 

3. Put your own PubNub keys in app.js where mine are (one set for the canvas and one for the chat)

4. Open up your terminal, and change directory to where you downloaded the repo using the cd command

5. Run "python -m SimpleHTTPServer

6. Open localhost:8000 in your browser of choice

7. You should now be running your own local Mathboard site with your own databases for the canvas and chat!

