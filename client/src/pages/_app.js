import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { AuthConsumer, AuthProvider } from "src/contexts/auth-context";
import { useNProgress } from "src/hooks/use-nprogress";
import { createTheme } from "src/theme";
import { createEmotionCache } from "src/utils/create-emotion-cache";
import "simplebar-react/dist/simplebar.min.css";
import { RestaurantProvider } from "src/contexts/restaurant-context";
import SplashScreen from "./splash";
import dotenv from "dotenv";

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  useNProgress();

  dotenv.config();

  const getLayout = Component.getLayout ?? ((page) => page);

  const theme = createTheme();

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Scandelicious</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />

        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-HFXTRW3H4Q"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HFXTRW3H4Q');
          `}
        </script>
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AuthProvider>
          <RestaurantProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <AuthConsumer>
                {(auth) =>
                  auth.isLoading ? <SplashScreen /> : getLayout(<Component {...pageProps} />)
                }
              </AuthConsumer>
            </ThemeProvider>
          </RestaurantProvider>
        </AuthProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;
