import { React, useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import Link from 'next/link';
import { makeStyles } from "@material-ui/core/styles";
import { Button, Divider } from "@material-ui/core";

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
        padding: "4rem 0 17rem 0",
        color: "#ffffff",
    },
    container: {
        maxWidth: "75rem",
        background: "rgba(255, 255, 255, 0.8)",
        margin: "auto",
        padding: "1rem 3rem 2rem 3rem",
        display: "flex",
        flexFlow: "row wrap",
        "@media (max-width: 40rem)": {
            marginTop: "3rem"
        },
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
        marginTop: "1.6rem",
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
        height: "8rem",
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

export default function Blog(props) {

    const classes = useStyles();
    const { api, token, slug } = props;
    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState([]);
    const [autores, setAutores] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchData = async () => {

            const responsePost = token != false ?
                await axios.get(api + '/vejodados/wp-json/wp/v2/posts?status=private&slug=' + slug + '&_fields=slug,author,content,date,title', { headers: { "Authorization": `Bearer ${token}` } })
                : await axios.get(api + '/vejodados/wp-json/wp/v2/posts?slug=' + slug + '&_fields=slug,author,content,date,title')
            if (responsePost.status === 200) {
                setPost(responsePost.data)
            }

            const responsePosts = await axios.get(api + '/vejodados/wp-json/wp/v2/posts?_fields=slug,author,excerpt,date,title')
            if (responsePosts.status === 200) {
                setPosts(responsePosts.data)
            }

            const responseAutores = await axios.get(api + '/vejodados/wp-json/wp/v2/users?_fields=id,name')
            if (responseAutores.status === 200) {
                setAutores(responseAutores.data)
            }

            responsePost.status === 200 & responsePosts.status === 200 & responseAutores.status === 200 && setLoading(false)

        };
        fetchData();

    }, []);

    return (
        <>
            <Header
                color="transparent"
                //leftLinks={info && <LeftLinks info={info} />}
                //respLinks={<RespLinks info={info} />}
                //rightLinks={<HeaderLinks info={info} />}                
                fixed
                changeColorOnScroll={{
                    height: 100,
                    color: "white",
                }}
            />

            <div className={classes.corpo}>

                {loading == false & post.length > 0 ?
                    <>
                        <div className={classes.header}>
                            <Link href="/"><Button className={classes.title}><img src="/img/logo.png" className={classes.logo} /></Button></Link>
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
                        <div className={classes.fundo}>
                            <div className={classes.header}>
                                <Link href="/"><Button className={classes.title}><img src="/img/logo.png" className={classes.logo} /></Button></Link>
                                <div className={classes.load}>
                                    <div class="loader1" className={classes.gif}></div>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    )

}

export async function getServerSideProps(ctx) {

    const token = ctx.query.cod == format(new Date(), 'd') && await axios.post(process.env.API_URL + '/vejodados/wp-json/jwt-auth/v1/token', { username: process.env.API_ID, password: process.env.API_SECRET })
        .then(function (response) {
            return response.data.token;
        }).catch(function (error) {
            // handle error
            console.log(error);
        });

    return {
        props: {
            api: process.env.API_URL,
            token: token,
            slug: ctx.query.slug
        },
    }
}