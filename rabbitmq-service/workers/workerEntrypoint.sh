#!/bin/bash

./wait-for.sh mq:5672
./wait-for.sh db:5432
node msgReceiveWorker.js save_to_db