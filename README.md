# Angular Seed Starter Template

This repo provides a solid starting point for building your own AngularJS single page app on the [Aerobatic hosting platform](http://www.aerobatic.com).
It comes preconfigured with either a Gulp or Grunt build file that .

## Create New App
Make sure you have the yoke-cli tool installed: `npm install -g yoke-cli`

### Grunt build
```
yoke create-app --github-repo 'aerobatic/angular-seed' --github-branch 'grunt'
```

### Gulp build
```
yoke create-app --github-repo 'aerobatic/angular-seed' --github-branch 'gulp'
```

## Deploying your app
```
yoke deploy
```