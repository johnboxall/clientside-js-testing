#!/bin/bash
serve . &
PID=$!
sleep 1
phantomjs phantom.js
kill $PID