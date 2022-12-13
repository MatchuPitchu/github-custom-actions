import * as core from '@actions/core';
import * as github from '@actions/github';
import * as exec from '@actions/exec';

const run = () => {
  // prints message to workflow log
  core.notice('Hello from my custom JS action');
};

run();
