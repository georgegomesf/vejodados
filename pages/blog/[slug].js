import { React, useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import Link from 'next/link';
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";

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
        padding: "4rem 0 6rem 0",
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
        paddingTop: "1rem",
        paddingRight: "2rem",
        "@media (min-width: 24rem)": {
            maxWidth: "24rem"
        },
        "@media (min-width: 30rem)": {
            maxWidth: "24rem"
        },
        "@media (min-width: 36rem)": {
            maxWidth: "30rem"
        },
        "@media (min-width: 42rem)": {
            maxWidth: "36rem"
        },
        "@media (min-width: 51rem)": {
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
        fontWeight: "700"
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
        padding: "0 0 1rem 0"
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
    code: {
        padding: "1rem",
        backgroundColor: "#000000"
    },

}))

export default function Blog(props) {

    const classes = useStyles();
    const { api, slug } = props;
    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState([]);
    const [autores, setAutores] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchData = async () => {

            const urlPost = api + '/vejodados/wp-json/wp/v2/posts?slug=' + slug + '&_fields=slug,author,content,date,title'
            const responsePost = await axios.get(urlPost)
            if (responsePost.status === 200) {
                setPost(responsePost.data)
            }

            const urlPosts = api + '/vejodados/wp-json/wp/v2/posts/?_fields=slug,author,excerpt,date,title'
            const responsePosts = await axios.get(urlPosts)
            if (responsePosts.status === 200) {
                setPosts(responsePosts.data)
            }

            const url = api + '/vejodados/wp-json/wp/v2/users?_fields=id,name'
            const responseAutores = await axios.get(url)
            if (responseAutores.status === 200) {
                setAutores(responseAutores.data)
            }

            responsePost.status === 200 & responsePosts.status === 200 & responseAutores.status === 200 && setLoading(false)

        };
        fetchData();

    }, []);

    return (
        <>
            <Header />

            <div className={classes.corpo}>
                {loading == false ?
                    <>
                        <div className={classes.header}>
                            <div className={classes.pageTitulo} dangerouslySetInnerHTML={{ __html: post.map(i => i.title.rendered) }}></div>
                            <small>{post.map(i => format(parseISO(i.date), 'dd/MM/yyyy')) + ' | por ' + autores.filter(f => f.id == post.map(i => i.author))[0].name}</small>
                        </div>
                        <div className={classes.container}>

                            <div className={classes.ladoEsq} dangerouslySetInnerHTML={{ __html: post.map(i => i.content.rendered) }}></div>


                            <div className={classes.ladoDir}>


                                <div className={classes.listaPosts}>
                                    {
                                        posts.map(i =>

                                            <div className={classes.sideLista}>
                                                <small>{format(parseISO(i.date), 'dd/MM/yyyy') + ' | por ' + autores.filter(f => f.id == i.author)[0].name}</small>
                                                <Link href={'/blog/' + i.slug}><div className={classes.sideTitulo}><div className={classes.link} dangerouslySetInnerHTML={{ __html: i.title.rendered }}></div></div></Link>
                                                <div className={classes.resumo} dangerouslySetInnerHTML={{ __html: i.excerpt.rendered.substr(0, 220) + '...' }}></div>
                                                <Divider />
                                            </div>

                                        )
                                    }

                                </div>
                            </div>
                        </div>
                        <div className={classes.footer}>Produzido por George Gomes</div>
                    </>
                    :
                    <>
                        <div className={classes.header}>
                            <img src="/img/logo.png" className={classes.logo} />
                        </div>

                    </>
                }

            </div>

        </>
    )

}

export async function getServerSideProps(ctx) {

    return {
        props: {
            api: process.env.API_URL,
            slug: ctx.query.slug
        },
    }
}