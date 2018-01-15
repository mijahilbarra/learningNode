'use strict'

const debug = require('debug')('bd:bd:setup')
const db = require('./')
const chalk = require('chalk')
const inquirer = require('inquirer')

const prompt = inquirer.createPromptModule()

async function setup() {
    const answer = await prompt([
        {
            type: 'confirm',
            name: 'setup',
            'message': 'This will destroy your database, are you sure?'
        }
    ])

    if (!answer.setup) {
        return console.log('Nothing has happened :)')
    }

    const config = {
        database: process.env.DB_NAME || 'practice',
        username: process.env.DB_USER || 'mbarra',
        password: process.env.DB_PASS || 'mbarra',
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        logging: s => debug(s),
        setup: true,
        operatorsAliases: false
    }

    await db(config).catch(handleFatalError)

    console.log('Success')
    process.exit(0)
}

function handleFatalError(err) {
    console.error(`${chalk.red('[fatal error]')} ${err.message}`)
    console.error(err.stack)
    process.exit(1)
}

setup()
