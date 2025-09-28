import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 3000;

app.disable('x-powered-by');
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.use((req, res, next) => {
  if (/\.(js|css|png|jpg|jpeg|gif|svg|woff2?|ttf|eot)$/.test(req.url)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  }
  next();
});

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(new URL('./public/index.html', import.meta.url).pathname);
});

app.listen(PORT, () => {
  console.log(`Brochure site running on http://localhost:${PORT}`);
});
