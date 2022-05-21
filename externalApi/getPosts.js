const axios = require("axios");

exports.getAllPosts = async (providedTag) => {
  let externalPostAPIUrl = `https://api.hatchways.io/assessment/blog/posts?tag=${providedTag[0]}`;

  if (providedTag.length === 1) {
    return await axios.default.get(externalPostAPIUrl).then((res) => res.data);
  } else {
    let finalListOfURLs = generateMultipleUrls(providedTag, externalPostAPIUrl);
    return await axios.default
      .all(finalListOfURLs.map((endPoint) => axios.default.get(endPoint)))
      .then(axios.default.spread((res) => res.data));
  }
};

const generateMultipleUrls = (providedTag, externalPostAPIUrl) => {
  let URLs = [];
  let i = 1;
  let indexValueOfUrl = externalPostAPIUrl.indexOf("=") + 1;
  URLs.push(externalPostAPIUrl);

  while (i < providedTag.length) {
    let newUrl =
      externalPostAPIUrl.substring(0, indexValueOfUrl) + providedTag[i];
    URLs.push(newUrl);
    i++;
  }
  return URLs;
};
