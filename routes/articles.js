const express = require('express');
const ArticleController = require('../controllers/article.controller');

const router = express.Router();
// const sample = [
//   {
//     title: 'Postal service changes pose threat to voting',
//     createdAt: new Date(),
//     description:
//       'Ron Stroman, who stepped down as deputy postmaster general this year, warned new policies at USPS could disenfranchise voters',
//   },
// ];

/* GET Articles page. */
router.get('/', ArticleController.getArticles);

router.get('/new', ArticleController.newArticle);

router.get('/edit/:slug', ArticleController.editArticle);

router.get('/:slug', ArticleController.getArticle);

router.post('/', ArticleController.postArticle);

router.put('/:id', ArticleController.putArticle);

router.delete('/:id', ArticleController.deleteArticle);

module.exports = router;
