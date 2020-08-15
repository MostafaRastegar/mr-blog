exports.slugQuery = (slug) => {
  const query = { $or: [{ slug }] };
  if (slug.match(/^[0-9a-fA-F]{24}$/)) {
    query.$or.push({ _id: slug });
  }
  return query;
};

exports.saveArticleAndRedirect = async (req, func) => {
  try {
    req.article = await func;
    const { article } = req;
    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;
    const result = await article.save();
    return result;
  } catch (e) {
    // Log Errors
    throw Error('Error while Article');
  }
};
