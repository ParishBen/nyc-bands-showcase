## NYC Bands Showcase
<p>
    Hi there. Welcome to NYC Bands Showcase. The app allows you to see and get a taste of all the great local talent coming out of NYC. Make sure to Add Favorites to keep track Artists you'd like to check out in the future. Feel Free to Preview all the Artist's top tracks from the Spotify API. ~This App relies on artists that are on Spotify. </p>


# Installation
<li>
Travel to https://github.com/ParishBen/nyc-bands-showcase to clone the frontend repo. 
Then replicate this for the backend at: https://github.com/ParishBen/nyc-bands-backend
. Reach Out to me at ParishBen13@gmail.com or SlackId: U0152HS07CP. To receive secrets. 
In your terminal cd into the backend & run Bundle Install the above gem list.

Next execute rails s -p 9000. RAILS server should be running on Port 9000. 
Then cd into the front end and run 'npm install' to install all dependencies.  
Run node src/theSpoilerBoilerplate.js to get the Express server running on port 8888 for Spotify API auth.
Now run npm start to startup the web application to your browser & then navigate to localhost:3000!n

Signup & go!
</li>

# Contributing Guidelines
<p> Thanks for taking the time to contribute!<br>
The following is a short set of guideline to contribute to NYC Band's Showcase.<br></p>
<li>
Firstly get the NPM Environment installed to have React - Redux Frameworks available .  Then you'll also need to install a Ruby Environment ~> 2.6.1 to have backend functionality. follow the instructions above Installation instruction. 
</li>
<li>Feel free to reach out at any point to ParishBen13@gmail.com regarding any issues</li>
<li>Pull Requests are welcome! Please ensure to leave a detailed PR description of the problem & solution.</li>

# Prerequisites

# Frontend React-Redux
  - Namely ensure your Package.json has react, react-dom, react-router-dom, react-redux, and redux-thunk.  run npm install "missing dependency" if it does not. The file should look appear:
<p>{
  "name": "nyc-bands-showcase",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.11.4",
    "@testing-library/react": "^11.1.0",
    "@testing-library/user-event": "^12.1.10",
    "react": "^17.0.1",
    "react-dom": "^17.0.1",
    "react-redux": "^7.2.2",
    "react-router-dom": "^5.2.0",
    "react-scripts": "4.0.3",
    "redux": "^4.0.5",
    "redux-thunk": "^2.3.0",
    "web-vitals": "^1.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}</p>


# Backend Rails API
source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.6.1'

#### Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 6.0.3', '>= 6.0.3.5'
#### Use sqlite3 as the database for Active Record
gem 'sqlite3', '~> 1.4'
#### Use Puma as the app server
gem 'puma', '~> 4.1'
#### Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
 gem 'jbuilder', '~> 2.7'
#### Use Redis adapter to run Action Cable in production
 gem 'redis', '~> 4.0'
#### Use Active Model has_secure_password
 gem 'bcrypt', '~> 3.1.7'

#### Use Active Storage variant
 gem 'image_processing', '~> 1.2'

#### Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.4.2', require: false

#### Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
 gem 'rack-cors'

group :development, :test do
  #### Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  gem 'listen', '~> 3.2'
  #### Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

#### Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

gem "active_model_serializers", "~> 0.10.12"





# Built With

<ul><li>React - Redux</li><li>Ruby on Rails</li></ul>


# Author
<li> Benjamin Parish</li>

# License

This project is licensed under the MIT License - see the LICENSE.md file for details


# Aside:
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)