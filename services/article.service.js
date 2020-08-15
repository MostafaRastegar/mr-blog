const Article = require('../models/article.model');
const { slugQuery, saveArticleAndRedirect } = require('./utiles');

exports.getArticles = async () => {
  try {
    const articles = await Article.find().sort({
      createAt: 'desc',
    });
    return articles;
  } catch (e) {
    // Log Errors
    throw Error('Error while Articles');
  }
};

exports.newArticle = async () => {
  try {
    const article = new Article();
    return article;
  } catch (e) {
    // Log Errors
    throw Error('Error while Article');
  }
};

exports.getArticle = async (req) => {
  try {
    const { slug } = req.params;
    const article = await Article.findOne(slugQuery(slug));
    return article;
  } catch (e) {
    // Log Errors
    throw Error('Error while Article');
  }
};

exports.postArticle = async (req, next) => {
  try {
    return saveArticleAndRedirect(req, Article());
  } catch (e) {
    // Log Errors
    throw Error('Error while Article');
  }
};

exports.putArticle = async (req) => {
  try {
    return saveArticleAndRedirect(req, Article.findById(req.params.id));
  } catch (e) {
    // Log Errors
    throw Error('Error while Article');
  }
};

exports.deleteArticle = async (req) => {
  try {
    return await Article.findByIdAndDelete(req.params.id);
  } catch (e) {
    // Log Errors
    throw Error('Error while Article');
  }
};
