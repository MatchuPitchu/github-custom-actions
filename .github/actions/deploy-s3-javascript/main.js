import * as core from '@actions/core';
import * as github from '@actions/github';
import * as exec from '@actions/exec';

const run = () => {
  // prints message to workflow log
  core.notice('Hello from my custom JS action');

  // 1) Get input values (defined in action.yml) to build a generic custom action
  const bucket = core.getInput('bucket', { required: true });
  const bucketRegion = core.getInput('bucket-region', { required: true }); // true since default will be provided in case
  const distFolder = core.getInput('dist-folder', { required: true });

  // 2) Upload files
  // exec can run shell command in js code
  // here use AWS CLI -> it's pre-installed on ubuntu-latest runner machine
  const s3Uri = `s3://${bucket}`;
  exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);

  // 3) Generate output value
  const websiteUrl = `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`;
  core.setOutput('website-url', websiteUrl); // key is defined in action.yml
};

run();
