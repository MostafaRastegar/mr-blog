const ArticleService = require('../services/article.service');

exports.getArticles = async (req, res, next) => {
  try {
    const articles = await ArticleService.getArticles();
    // return res.status(200).json({
    //   status: 200,
    //   data: articles,
    //   message: 'Succesfully Users Retrieved',
    // });
    return res.status(200).render('../views/articles/index', {
      title: 'Articles',
      articles,
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.getArticle = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const article = await ArticleService.getArticle(req, slug);
    return res.status(200).render('../views/articles/show', {
      title: 'Article',
      article,
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.editArticle = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const article = await ArticleService.getArticle(req, slug);
    return res.status(200).render('../views/articles/edit', {
      title: 'Article',
      article,
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.newArticle = async (req, res, next) => {
  try {
    const article = await ArticleService.newArticle();
    return res.status(200).render('../views/articles/new', {
      title: 'Article',
      article,
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.postArticle = async (req, res, next) => {
  const article = await ArticleService.postArticle(req);
  try {
    return res.status(200).redirect(`/articles/${article.slug || article.id}`);
  } catch (e) {
    return res.status(400).redirect(`/articles/new`, { article });
  }
};

exports.putArticle = async (req, res, next) => {
  const article = await ArticleService.putArticle(req);
  try {
    return res.status(200).redirect(`/articles/${article.slug || article.id}`);
  } catch (e) {
    return res.status(400).redirect(`/articles/edit`, { article });
  }
};

exports.deleteArticle = async (req, res, next) => {
  try {
    await ArticleService.deleteArticle(req);
    return res.status(200).redirect('/articles');
  } catch (e) {
    return res.status(400).redirect(`/articles`);
  }
};
