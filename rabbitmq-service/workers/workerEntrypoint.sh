#!/bin/bash

./wait-for.sh mq:5672
node msgReceiveWorker.js test