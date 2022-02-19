# Secure Simple Tasks

An assignment from my Security class. We were tasked to write two websites, one of which was supposed to be naïvely implemented (with no concerns for security) and the other one was supposed to be the secure version of it. This is the secure version.

The app was implemented with ReactJS and with it users can create and edit their tasks when they login (which is mediated with Google Firebase). The [original, unsecure, app](https://github.com/heldersrvio/simple-tasks) relied exclusively on client-side validation to match a user to its password and, thus, could easily be bypassed. This version, instead, lets Firebase manage password and adds proper security rules, which make the app secure.

[Check out the live version](https://heldersrvio.github.io/secure-simple-tasks/).
