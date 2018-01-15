# db

## Usage

...js

const setupDataBase = require('db')

setupDataBase(config).then(db => {

    const { Agent, Metric } = db
}).catch(err => console.error(err))
...