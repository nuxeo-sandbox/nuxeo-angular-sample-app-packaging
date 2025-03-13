import { readFile, writeFile } from 'node:fs';

readFile('./dist/nuxeo-angular-sample/browser/index.html', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let updatedData = data.replace(
    /<base href="\/">/g,
    '<base href="<%=Framework.getProperty("app.base.url","/nuxeo/app/")%>">'
  );

  let jsp = `<%@ page import="org.nuxeo.runtime.api.Framework"%>\n${updatedData}`;

  writeFile('./dist/nuxeo-angular-sample/browser/index.jsp', jsp, err => {
    if (err) {
      console.error(err);
    } else {
      // file written successfully
    }
  });
});
