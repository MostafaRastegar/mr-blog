const express = require('express');
const Article = require('../models/article');

const router = express.Router();
const sample = [
  {
    title: 'Postal service changes pose threat to voting',
    createdAt: new Date(),
    description:
      'Ron Stroman, who stepped down as deputy postmaster general this year, warned new policies at USPS could disenfranchise voters',
  },
];
const slugQuery = (slug) => {
  const query = { $or: [{ slug }] };
  if (slug.match(/^[0-9a-fA-F]{24}$/)) {
    query.$or.push({ _id: slug });
  }
  return query;
};

const saveArticleAndRedirect = (path) => {
  return async (req, res) => {
    const { article } = req;
    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;
    try {
      const result = await article.save();
      res.redirect(`/articles/${result.slug || result.id}`);
    } catch (e) {
      res.redirect(`/articles/${path}`, { article });
    }
  };
};

/* GET Articles page. */
router.get('/', async (req, res, next) => {
  const articles = await Article.find().sort({
    createAt: 'desc',
  });
  res.render('articles/index', { title: 'Blog Articles', articles });
});

router.get('/new', (req, res, next) => {
  const article = new Article();
  res.render('articles/new', { title: 'new Article', article });
});

router.get('/edit/:slug', async (req, res, next) => {
  const { slug } = req.params;
  const article = await Article.findOne(slugQuery(slug));
  console.log(article)
  res.render('articles/edit', { title: 'edit Article', article });
});

router.get('/:slug', async (req, res, next) => {
  const { slug } = req.params;
  const article = await Article.findOne(slugQuery(slug));
  res.render('articles/show', { title: article.title, article });
});

router.post(
  '/',
  (req, res, next) => {
    req.article = new Article();
    next();
  },
  saveArticleAndRedirect('new')
);
router.delete('/:id', async (req, res, next) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect('/articles');
});

router.put(
  '/:id',
  async (req, res, next) => {
    req.article = await Article.findById(req.params.id);
    next();
  },
  saveArticleAndRedirect('edit')
);

module.exports = router;
