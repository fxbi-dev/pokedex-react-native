# React Native Pokedex (...ish)

## Instalation pre-requisites

Follow the setup guide in the [React Native Setup Guide](https://reactnative.dev/docs/environment-setup)

This project was developed and tested on:
* Ubuntu 20.04
* Android Emulator
  * Android 11 (API 30)
* Node v16.7.0
* npm v7.20.3

## Setup Guide
It should be easy as:
1. `npm i`
1. `npm start` (Starts the packager, needs to be running in the background)
1. `npm run android`

_Et voilà_, you have your own pokedex running on an Android Emulator. Very useful, huh?

## Known issues
* For some reason, if the app is installed and opened **before** the packager being running in the background, you have to restart the application for it to load.
* It uses internet **VERY** extensively, you might want to run the app in a network without data transfer limits (such a home wifi).

## Todo
* Write tests
* Translations
* Actually test for iOS
