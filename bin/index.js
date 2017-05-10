#!/usr/bin/env node

/**
 * Copyright (c) 2017, Yonyou, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */


'use strict';


var chalk = require('chalk');

var currentNodeVersion = process.versions.node;
if (currentNodeVersion.split('.')[0] < 4) {
    console.error(
        chalk.red(
            'You are running Node ' +
            currentNodeVersion +
            '.\n' +
            'Create Bee App requires Node 4 or higher. \n' +
            'Please update your version of Node.'
        )
    );
    process.exit(1);
}

const argv = require('minimist')(process.argv.slice(2));
const commands = argv._;
const help = require('../lib/help');
const init = require('../lib/init');

if (commands.length === 0) {
    if (argv.version || argv.v) {
        help.version();
    } else if (argv.help || argv.h) {
        help.help();
    } else {
        help.help();
    }
} else {
    switch (commands[0]) {
        case 'init':
            init();
            break;
        default:
            break;
    }
}
