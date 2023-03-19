#!/bin/bash

mongoimport --authenticationDatabase admin --host mongo --username root --password 0Kpjska5fb51! --db afoona-local --collection recipe-db --type json --file /mongo-seed/recipe-db.json --jsonArray
mongoimport --authenticationDatabase admin --host mongo --username root --password 0Kpjska5fb51! --db afoona-local --collection glossary-db --type json --file /mongo-seed/glossary-db.json --jsonArray