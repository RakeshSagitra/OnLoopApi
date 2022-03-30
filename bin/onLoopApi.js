#!/usr/bin/env node --debug --trace-warnings

/**
 * Module dependencies.
 */
require('@babel/register')({
  extensions: ['.js', '.jsx', '.ts', '.tsx']
})
require('../main')
