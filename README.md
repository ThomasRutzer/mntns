# 👋 Hello my friend,

nice to see you! This is public source code of my
current portfolio aka about me site! To be honest, after some iterations
with former portfolios, I decided to skip a proper portfolio
site with much content (I rarely update after a while) all in all and just write some words about me and contact options
— feel free to use them!

But to 🌶 it up a little, I give this site some space for experiments.
This type of experiment might change after while😉. And since it´s 
kind of experimental, please be aware of that:

**During my daytime job, I´m really focused to provide a good
crossbrowser experience. So at 🌃night, when I should sleep but ⚒️work
on something like this, I really want to have some fun and work with
some of the latest browser features — so if you want to have fun as well,
use a browser with decent WebGl support. If you are really, really annoyed by
your personal experiment, feel free to get in touch (or wait for one of the upcoming feature
to be finished)** 

## Next steps

Talking about upcoming features, I plan to work
on this site from time to time. This are some of my next steps.

### Features

* LoFi Mode — which users can toggle on, to make animations less
consuming and maybe visualize background experiment in another way (without need of WebGL)

* User Github Data — users can give their github addy, and their account
data will be used for Mntns experiment

### Code & Architecture

* clean up MntsComponent and seperate into smaller bits
* make a proper and general Mock for DI
* move entire Mntns Experiment to other [Repo](https://github.com/ThomasRutzer/mntns) — initially,
my plan was, to provide the code of the other repo as a WebGL experiment, which 
accepts Data and generates its Object. But now, I´d like to have all the Github Api
Connection to take place their as well. Makes things easier

### Build Setup

It´s open source, so if you really want to check at Code on your own,
here are some tips:

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# lint the Typescript
npm run lint

# run the tests
npm test

# run the tests on changes
npm run test:watch

# run the test suite and generate a coverage report
npm run coverage

# build for production with minification
npm run build

# clean the production build
npm run clean
```

👋 That´s it! Thanks for reading that far. Hope to see you soon
