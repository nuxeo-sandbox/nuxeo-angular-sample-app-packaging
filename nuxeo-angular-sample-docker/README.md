# nuxeo-angular-sample Docker Image

This module is responsible for building the nuxeo-angular-sample Docker image.


It's possible to skip Docker build by setting default `skipDocker` property value to `true` in `pom.xml` file.

```bash
# Skipping Docker build
mvn -DskipDocker=true clean install
```
