Scribe is an idea that I had to enable users to write journal entries online. I
was inspired to create this application because I find journaling to be great
for relaxing and processing at the end of the day.

I initially thought to build the back-end with a Ruby, Rails, ActiveRecord,
MongoDB stack, since users are only meant to have access to their own entries.
I decided to use a relational database instead of MongoDB though. I figured that
even if journal is the intended usage of this app, it wouldn't be out of the
question to use it to take notes, write books, or engage in any other writing
activity that could be shared. I wanted to allow myself more flexibility in
which use cases someone can conceivably use this application.

User Stories:
As an unregistered user, I would like to sign up with email and password.
As a registered user, I would like to sign in with email and password.
As a signed in user, I would like to change password.
As a signed in user, I would like to sign out.
As a signed in user, I would like to create a journal entry.
As a signed in user, I would like to update any of my entries.
As a signed in user, I would like to delete any of my entries.
As a signed in user, I would like to see all of my entries but not other users'.

Wireframe:
https://imgur.com/qAygv1h

ERD:
https://imgur.com/LxBbrgu

Screenshot of App:
https://imgur.com/cLt3gyn

This is the repository for all the back-end code for Scribe:
https://github.com/VickyRockingster/scribe-server

This is the link to the back-end site: https://scribe-back-end.herokuapp.com/

This is the link to the front-end repository:
https://github.com/VickyRockingster/scribe

And lastly, this is the link to the deployed Scribe site:
https://vickyrockingster.github.io/scribe

Technologies Used:
Axios, CSS3, HTML5, JavaScript, Material UI, React.js, Ruby on Rails, PostgreSQL,
Sass/SCSS, SQL

Process:
Creating my back-end was relatively simple, just because I only had 2 resources
with a one-to-many relationship between them. It has been a while since I last
created a Rails repo, though, so I had to consult my notes and Google a lot. Even
so, I was able to get my back-end up and running the first day I started my
project.
In my front-end, though, I ran into a lot more problems. This is the first project
that I finished using React, and there is a steep learning curve going from the
HTML/CSS/JavaScript/jQuery front-end stack to a React framework. Even now, I'm
still getting the knack of styling with React, because it doesn't use standard
CSS/SCSS files in the same way.


Moving Forward:
I would like to do some re-factoring in the front-end so that each view is one
component taking in all the components that need to be shown on that view. That
way, all components on a given view will have a parent component that would allow
them to influence each other, if necessary. I would also like to re-factor the
styling. Right now, it's only functional, not accessible.

Installation:
Download this repo.
Unzip the directory in the command line (unzip ~/Downloads/scribe.zip).
Move into the your new folder and run the command 'git init'. Then open your new
repo.
Delete everything in the README.md and fill with your own content.
Replace scribe in package.json with your project's name.
Replace the "homepage" field in package.json with your (public) Github account
name and repository name.
Install dependencies with npm install.
git add and git commit your changes.
Run the development server with npm start.proprojectject

Deployment
Before deploying, you first need to make sure the homepage key in your
package.json is pointing to the correct value. It should be the url of your
deployed application.

Make sure you are on the master branch with a clean working directory, then you
run npm run deploy and wait to see if it runs successfully.
