# stylus-extra

[![Build Status](https://travis-ci.org/Alexgalinier/stylus-exta.svg?branch=master)](https://travis-ci.org/Alexgalinier/stylus-exta)
[![codecov](https://codecov.io/gh/Alexgalinier/stylus-exta/branch/develop/graph/badge.svg)](https://codecov.io/gh/Alexgalinier/stylus-exta)
[![Greenkeeper badge](https://badges.greenkeeper.io/Alexgalinier/stylus-exta.svg)](https://greenkeeper.io/)

Wrap stylus to ease recursive file detection and watching.

## Installation

```
npm i stylus-extra -D
```

## Usage

In your package.json scripts
```
"build-styl": "stylus-extra src -o lib",
"watch-styl": "stylus-extra src -o lib -w",
```
