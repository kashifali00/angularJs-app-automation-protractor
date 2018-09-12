# Maestrano Automation Testing

## Setup

To run Maestrano automation tests, following items needs to be installed locally

1. Node.js 
2. Protractor (v5.1.2)
3. Webdriver  (v3.0.1 or above)
4. protractor-jasmine2-screenshot-reporter (v0.3.5)

Window:
http://nodejs.org/

Ubuntu 16.4 LTS:

```
$ sudo apt-get install python-software-properties
$ curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
$ sudo apt-get install nodejs
```

Versions:

```
- node -v
- npm -v
```

Protractor & Webdriver

Window:

```
sudo npm install
```

Ubuntu:

```
sudo npm install
```

We are maintaining package.json file, so protractor and webdriver can be installed by 
just typing npm install. it will install all dependencies under node_module folder


## Run it

Window:

```
npm run start-webdriver
npm run tests
```

Ubuntu:

- Navigate to webdriver-manager folder

```
cd ~/automation-testing/node_modules/protractor/node_modules/webdriver-manager/bin
./web-driver start
```  

- if you have standalone version of web-driver

```
./web-driver --versions.standalone=3.0.1 start PRESS enter
```

Make sure you have confs_local.js reside in a same folder where you are running the test

- Navigate to protractor folder

```
cd ~/automation-testing/node_modules/protractor/bin
./protractor confs_local.js -suite regression
```

it will run all tests were mentioned under regression switch in confs_local.js file


## Run tests with commandline parameters

Few maestrano automation tests excepts parameters from commandline to run properly across all platforms.
Maestrano automation tests currently supporting following parameters.

- defautlUrl
- enable
- disable

These parameters are defined in confs_local.js file under params
To run test with params:

Ubuntu: 

```
/node_module/protracotor/bin/protractor confs_local.js --params.host 'https://get.maestrano.com'
```

if host is not passed from commandline then tests will run on Production environment by default 
[https://get.maestrano.com]
 

## Results & Report

When the test run will be finished, the report folder will be created automatically under the same directory.
In order to view the status of test run, open up index.html file in the browser. Screenshots against each test
are also captured in the same folder.
