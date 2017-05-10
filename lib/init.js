'use strict';


const chalk = require('chalk');
const help = require('./help');
const inquirer = require('inquirer');
const path = require('path');
const pathExists = require('path-exists');
const fs = require('fs');
const download = require('download-git-repo');
const spawn = require('cross-spawn');


module.exports = () => {
    console.log();
    var questions = [{
        type: 'input',
        name: 'beeName',
        message: 'Bee project name?',
        default: function() {
            return 'bee-manage'
        }
    }];
    inquirer.prompt(questions).then(function(answers) {
        var root = path.resolve(answers.beeName);
        if (!pathExists.sync(answers.beeName)) {
            fs.mkdirSync(root);
        } else {
            help.error(`directory ${answers.beeName} already exists.`);
            process.exit(0);
        }
        help.info(`Downloading \'Bee\' please wait.`);
        //下载项目
        download("uba-templates/uba-boilerplate-bee", `${answers.beeName}`, function(err) {
            if (!err) {
                help.info(`Bee ${answers.beeName} done.`);
                inquirer.prompt([{
                    type: 'confirm',
                    message: 'Automatically install NPM dependent packages?',
                    name: 'ok'
                }]).then(function(res) {
                    var npmInstallChdir = path.resolve('.', answers.beeName);
                    if (res.ok) {
                        help.info(`Install NPM dependent packages,please wait.`);
                        //选择自动安装
                        process.chdir(npmInstallChdir);
                        var args = ['install'].filter(function(e) {
                            return e;
                        });
                        var proc = spawn('npm', args, {
                            stdio: 'inherit'
                        });
                        proc.on('close', function(code) {
                            if (code !== 0) {
                                console.error('`npm ' + args.join(' ') + '` failed');
                                return;
                            }
                            help.info(`NPM package installed. cd ${answers.beeName} && npm start`);
                        });

                    } else {
                        help.info(`Cancel the installation of NPM dependent package.\nPlease run \'cd ${answers.beeName} && npm install\' manually.`);
                    }

                });
            } else {
                console.error(requestBody.message);
            }
        });
    });

}
