const basePath = process.cwd();
import { readFileSync, writeFileSync } from "fs";
import yesno from 'yesno';

const {
  baseUri,
  description,
  namePrefix,
} = require(`${basePath}/src/config.js`);

(async () => {
  // read json data
  let rawdata = readFileSync(`${basePath}/build/json/_metadata.json`);
  let data = JSON.parse(rawdata);

  console.log("Info will be updated using the config.js data.");
  const updateName = await yesno(`Update names?`);
  const updateDescription = await yesno(`Update descriptions?`);
  const updateBaseUri = await yesno(`Update images base URI?`);

  data.forEach((item) => {
    if(updateName) item.name = `${namePrefix} #${item.edition}`;
    if(updateDescription) item.description = description;
    if(updateBaseUri) item.image = `${baseUri}/${item.edition}.png`;
  
    writeFileSync(
      `${basePath}/build/json/${item.edition}.json`,
      JSON.stringify(item, null, 2)
    );
  });

  writeFileSync(
    `${basePath}/build/json/_metadata.json`,
    JSON.stringify(data, null, 2)
  );

  if(updateName) console.log(`Updated name prefix for images to ===> ${namePrefix}`);
  if(updateBaseUri) console.log(`Updated baseUri for images to ===> ${baseUri}`);
  if(updateDescription) console.log(`Updated description for images to ===> ${description}`);
})()
