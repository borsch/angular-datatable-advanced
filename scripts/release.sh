#!/bin/bash

npm version patch
npm run build
cd dist/angular-datatable-advanced
npm publish
