const { getAllPosts } = require("../externalApi/getPosts");

exports.returnPosts = async (req, res) => {
  let { tags, sortBy, direction } = req.query;

  if (!tags) {
    return res.status(400).json({ error: "Tags parameter is required" });
  }

  if (!sortBy) sortBy = "id";
  if (!direction) direction = "asc";

  if (
    (sortBy === "id" ||
      sortBy === "likes" ||
      sortBy === "reads" ||
      sortBy === "popularity") &&
    (direction === "asc" || direction === "desc")
  ) {
    let givenTagsArr = tags.split(",");
    const fetchedPosts = await getAllPosts(givenTagsArr);
    const finalPosts = filterAndSortPosts(
      sortBy,
      direction,
      fetchedPosts.posts
    );

    return res.json(finalPosts);
  } else {
    return res.status(400).json({ error: "sortBy parameter is invalid" });
  }
};

const filterAndSortPosts = (sortBy, direction, posts) => {
  let uniqFilterArray = [];
  if (direction === "asc") {
    if (sortBy === "popularity") {
      posts.sort((a, b) => (a.popularity < b.popularity ? -1 : 1));
    } else if (sortBy === "likes") {
      posts.sort((a, b) => (a.likes < b.likes ? -1 : 1));
    } else if (sortBy === "reads") {
      posts.sort((a, b) => (a.reads < b.reads ? -1 : 1));
    } else {
      posts.sort((a, b) => (a.id < b.id ? -1 : 1));
    }
  } else {
    if (sortBy === "popularity") {
      posts.sort((a, b) => (a.popularity > b.popularity ? -1 : 1));
    } else if (sortBy === "likes") {
      posts.sort((a, b) => (a.likes > b.likes ? -1 : 1));
    } else if (sortBy === "reads") {
      posts.sort((a, b) => (a.reads > b.reads ? -1 : 1));
    } else {
      posts.sort((a, b) => (a.id > b.id ? -1 : 1));
    }
  }
  uniqFilterArray = [...new Set(posts)];
  return uniqFilterArray;
};
