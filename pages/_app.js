import CssBaseline from '@material-ui/core/CssBaseline';
import NextNprogress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }) {

  return <>
    <NextNprogress
      color="rgba(252, 98, 3,0.7)"
      startPosition={0.3}
      stopDelayMs={200}
      height="5"
    />
    <CssBaseline />
    <Component {...pageProps} />
  </>
}

export default MyApp
