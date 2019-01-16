#!/bin/bash

./wait-for.sh db:5432 -- node models/database.js
npm run start