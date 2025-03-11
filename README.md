# Angular webapp sample deployment

## Description

This repository shows how to package and deploy an angular web application in the Nuxeo Platform. The most important take away is that nothing changes web developers as the packaging for the nuxeo platform doesn't iterfere with the angular developement workflow and tooling.

The content of this repository is only relevant for client side rendering application. For server side rendering, a Node.js Express server is required.

## Pre-requisites

In order to create a nuxeo marketplace package, java tooling is required:

- JDK 21
- [Maven](https://maven.apache.org/download.cgi)

### Maven configuration

The Nuxeo Maven repositories must be configured in order to be able to download the private artifacts. This project contains a sample maven configuration file that can be used as a starting point.

```bash
cp resources/settings.xml ~/.m2/settings.xml
```

Open the `~/.m2/settings.xml` file with a text editor and set the username and password for the maven-private repository. The [username/password](https://doc.nuxeo.com/corg/maven-usage/#maven-usage-for-lts-2023) are the same as the ones used for the nuxeo private docker repository.

## How to build

```bash
git clone https://github.com/nuxeo-sandbox/nuxeo-angular-sample-app-packaging
cd nuxeo-angular-sample-app-packaging
mvn clean install
```

## How to run

This project includes the build of a custom nuxeo docker image where the sample angular application package is pre-installed

```bash
docker-compose up -d
```

Then open [http://localhost:8080](http://localhost:8080)

## How to publish to the nuxeo marketplace package

If you wish to publish your app package in your private space on the nuxeo marketplace, this can be done using the marketplace UI or using the [REST API](https://doc.nuxeo.com/studio/delivering-a-customization-package-through-the-nuxeo-marketplace/#using-the-rest-api):

```bash
curl -u CONNECT_USER:CONNECT_TOKEN \
            -F package=@nuxeo-angular-package/target/nuxeo-angular-sample-package-VERSION.zip \
            "https://connect.nuxeo.com/nuxeo/site/marketplace/upload?batch=true&supported=false&orgId=ORG_ID"
```

## Explanations

The angular application development workflow and tooling is unchanged for web developers.
The Nuxeo platform build tooling, maven, simply encapsulates the angular and node.js tooling using ant.

The web application source is located in the [nuxeo-angular-sample-web](/nuxeo-angular-sample-web) folder

### Angular app configuration

On the angular side, the only item that needs to be configured is the base url if the app if it not accessed from the root path.

In the nuxeo, the path of the app is `/nuxeo/app/`. Thus the base url of the angular app must be set accordingling, unless a reverse proxy is used to rewrite `/nuxeo/app/` to `/`.

The base url is set in the [angular.json file](https://github.com/nuxeo-sandbox/nuxeo-angular-sample-app-packaging/blob/1917215d03dee05474955142db8a401f22c29f7a/nuxeo-angular-sample-web/angular.json#L32)

Of course `app` can be replaced by another name.

[package.json](/nuxeo-angular-sample-web/package.json) also contains 3 additional scripts that are used for the integration with the maven tooling for the Nuxeo Platform: `postbuild`, `prenuxeo` and `nuxeo`

### Nuxeo Configuration

All the nuxeo configuration is located in the [nuxeo](/nuxeo-angular-sample-web/nuxeo) folder

There are 4 different configuration items in this sample project:

- Set the authentication method for the application [here](https://github.com/nuxeo-sandbox/nuxeo-angular-sample-app-packaging/blob/1917215d03dee05474955142db8a401f22c29f7a/nuxeo-angular-sample-web/nuxeo/OSGI-INF/deployment-fragment.xml#L11)
- Set /nuxeo/app/ as an application path that the login page can redirect to upon sucessful authentication [here](/nuxeo-angular-sample-web/nuxeo/OSGI-INF/nuxeo-angular-sample-auth-contrib.xml)
- Set /nuxeo/app/ to be the default UI [here](/nuxeo-angular-sample-web/nuxeo/OSGI-INF/nuxeo-default-ui-contrib.xml)
- Support the angular browser router by rewriting all non file URL to return index.html using the Tomcat REWRITE valve (useful for development, but typically set up at the reverse proxy level for other environments) [here](https://github.com/nuxeo-sandbox/nuxeo-angular-sample-app-packaging/blob/1917215d03dee05474955142db8a401f22c29f7a/nuxeo-angular-sample-web/nuxeo/OSGI-INF/deployment-fragment.xml#L21)

In all the configuration points, the `/app` part must be the same name as the one configured in the base url in the angular configuration.

These are provided as examples and can simply be removed if irrelevant for a project.

## License

[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)

## About Nuxeo

Nuxeo Platform is an open source Content Services platform, written in Java. Data can be stored in both SQL & NoSQL
databases.

The development of the Nuxeo Platform is mostly done by Nuxeo employees with an open development model.

The source code, documentation, roadmap, issue tracker, testing, benchmarks are all public.

Typically, Nuxeo users build different types of information management solutions
for [document management](https://www.nuxeo.com/solutions/document-management/), [case management](https://www.nuxeo.com/solutions/case-management/),
and [digital asset management](https://www.nuxeo.com/solutions/dam-digital-asset-management/), use cases. It uses
schema-flexible metadata & content models that allows content to be repurposed to fulfill future use cases.

More information is available at [www.nuxeo.com](https://www.nuxeo.com).
