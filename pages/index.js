import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import HeaderLinks from '../components/HeaderLinks';
import Link from 'next/link';
import { makeStyles } from "@material-ui/core/styles";
import { Chip, Button, Divider } from "@material-ui/core";

import {
  parseISO,
  format,
} from 'date-fns';

// import pt from 'date-fns/locales/pt';

const useStyles = makeStyles((theme) => ({
  corpo: {
    background: "url(/img/fundo.jpg) no-repeat",
    backgroundColor: "#002132",
    minHeight: "100vh",
    alignItems: "center",
    backgroundPosition: "top center",
    fontFamily: "Roboto,Arial",
    fontSize: "1rem"
  },
  header: {
    width: "90%",
    maxWidth: "75rem",
    height: "10rem",
    margin: "auto",
    textAlign: "center",
    padding: "4rem 0 10rem 0",
    color: "#ffffff",
  },
  container: {
    maxWidth: "75rem",
    background: "rgba(255, 255, 255, 0.8)",
    margin: "auto",
    padding: "1rem 3rem 2rem 3rem",
    display: "flex",
    flexFlow: "row wrap",
  },
  ladoEsq: {
    paddingTop: "2rem",
    paddingRight: "2rem",
    "@media (min-width: 42rem)": {
      maxWidth: "36rem"
    },
    "@media (min-width: 49rem)": {
      maxWidth: "45rem"
    },
  },
  ladoDir: {
    maxWidth: "23rem",
    padding: "2rem 0"
  },
  pageTitulo: {
    fontSize: "2rem",
  },
  pageSubtitulo: {
    fontSize: "1.2rem",
  },
  sideTitulo: {
    fontSize: "1.2rem",
  },
  sideSubtitulo: {
    fontSize: "0.8rem",
  },
  postTitulo: {
    fontSize: "2rem"
  },
  postInfo: {
    fontSize: "1rem"
  },
  resumo: {
    padding: "1rem 0"
  },
  logo: {
    height: "8rem"
  },
  sideLista: {
    padding: "0 0 1rem 0"
  },
  link: {
    cursor: "pointer",
    "&:hover": {
      color: "#444444"
    }
  },
  footer: {
    color: "#ffffff",
    textAlign: "center",
    padding: "2rem 0"
  },
  listaPosts: {
    display: "block",
    padding: "0 0 2rem 0",
    margin: "0 0 2rem 0",
    borderBottom: "#ccc solid 0.1rem"
  },
  load: {
    position: "relative",
    marginTop: "10rem",
    margin: "auto"
  },
  fundo: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  }

}))

export default function Home(props) {

  const classes = useStyles();
  const { api } = props;
  const [posts, setPosts] = useState([]);
  const [autores, setAutores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchData = async () => {

      const responsePosts = await axios.get(api + '/vejodados/wp-json/wp/v2/posts/?_fields=slug,author,date,excerpt,title')
      if (responsePosts.status === 200) {
        setPosts(responsePosts.data)
      }

      const responseAutores = await axios.get(api + '/vejodados/wp-json/wp/v2/users?_fields=id,name')
      if (responseAutores.status === 200) {
        setAutores(responseAutores.data)
      }

      responsePosts.status === 200 & responseAutores.status === 200 && setLoading(false)

    };
    fetchData();

  }, []);

  return (
    <>
      <Header
        color="transparent"
        //leftLinks={info && <LeftLinks info={info} />}
        respLinks={<HeaderLinks />}
        headerLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 100,
          color: "white"
        }}
      />
      <div className={classes.corpo}>
        {loading == false ?
          <>
            <div className={classes.header}>
              <Link href="/"><Button className={classes.title}><img src="/img/logo.png" className={classes.logo} /></Button></Link>
            </div>
            <div>&nbsp;</div>
            <div className={classes.container}>
              <div className={classes.ladoEsq}>
                {
                  posts.map(i =>
                    <div className={classes.listaPosts}>
                      <Chip label={format(parseISO(i.date), 'dd/MM/yyyy') + ' | por ' + autores.filter(f => f.id == i.author)[0].name} variant="outlined" size="small" />
                      <Link href={'/blog/' + i.slug}><div className={classes.postTitulo}><div className={classes.link} dangerouslySetInnerHTML={{ __html: i.title.rendered }}></div></div></Link>
                      <div className={classes.resumo} dangerouslySetInnerHTML={{ __html: i.excerpt.rendered }}></div>
                      <Link href={'/blog/' + i.slug}><Button variant="outlined">Leia mais...</Button></Link>
                    </div>
                  )
                }
              </div>
              <div className={classes.ladoDir}>

                {
                  posts.map(i =>
                    <div className={classes.sideLista}>
                      <small>{format(parseISO(i.date), 'dd/MM/yyyy') + ' | por ' + autores.filter(f => f.id == i.author)[0].name}</small>
                      <Link href={'/blog/' + i.slug}><div className={classes.sideTitulo}><div className={classes.link} dangerouslySetInnerHTML={{ __html: i.title.rendered }}></div></div></Link>
                      <Divider />
                    </div>
                  )
                }

              </div>

            </div>
            <div className={classes.footer}>Produzido por George Gomes</div>
          </>
          :
          <div className={classes.fundo}>
            <div className={classes.header}>
              <Link href="/"><Button className={classes.title}><img src="/img/logo.png" className={classes.logo} /></Button></Link>
              <div className={classes.load}>
                <div class="loader1" className={classes.gif}></div>
              </div>
            </div>
          </div>
        }
      </div>
    </>
  )

}

export async function getServerSideProps(ctx) {

  //  const token = await axios.post(process.env.API_URL + '/auth/login/', { email: process.env.API_ID, password: process.env.API_SECRET })
  //    .then(function (response) {
  //      return response.data.data.access_token;
  //    }).catch(function (error) {
  //      // handle error
  //      console.log(error);
  //    });
  //
  //  const posts = await axios.get(process.env.API_URL + '/items/vd_post/', { headers: { "Authorization": `Bearer ${token}` } })
  //    .then(function (response) {
  //      return response.data.data
  //    }).catch(function (error) {
  //      //console.log(error);
  //    });
  //
  return {
    props: {
      api: process.env.API_URL
    },
  }
}