#!/bin/bash

./wait-for.sh mq:5672
node msgReceiveWorker.js save_to_db