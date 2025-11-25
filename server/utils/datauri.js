import DataUriParser from "datauri/parser.js";

import path from "path";
/* 
const getDataUri = (file) => {
  const parser = new DataUriParser();
  const extName = path.extname(file.originalname).toString();
  return parser.format(extName, file.buffer);
};
*/
const getDataUri = (file) => {
  if (!file || !file.originalname || !file.buffer) {
    throw new Error("Invalid file object");
  }

  const parser = new DataUriParser();
  const extName = path.extname(file.originalname).toString();
  try {
    return parser.format(extName, file.buffer);
  } catch (error) {
    console.error("DataUri Error:", error);
    throw new Error("Failed to process file");
  }
};

export default getDataUri; //to be searched
