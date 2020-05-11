#!/bin/bash

npm --prefix ./projects/angular-datatable-advanced version patch
npm run build
cd dist/angular-datatable-advanced
npm publish
