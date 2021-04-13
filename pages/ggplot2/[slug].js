import { React, useState, useEffect } from 'react';
import { getSession } from 'next-auth/client';
import Link from 'next/link';
import axios from 'axios';
import Header from '../../components/Header';
import HeaderLinks from '../../components/HeaderLinks';
import RespLinks from '../../components/RespLinks';
import { makeStyles } from "@material-ui/core/styles";
import { Button, Divider, CardActionArea } from "@material-ui/core";
import Acesso from '../../components/Acesso';

import {
    parseISO,
    format,
} from 'date-fns';

const useStyles = makeStyles((theme) => ({
    corpo: {
        background: "#051a3c url(/img/fundo_ggplot2.jpg) no-repeat",
        minHeight: "100vh",
        alignItems: "center",
        backgroundPosition: "top left",
        fontFamily: "Roboto,Arial",
        fontSize: "1rem"
    },
    header: {
        width: "90%",
        maxWidth: "75rem",
        height: "10rem",
        margin: "auto",
        textAlign: "center",
        padding: "4rem 0 15rem 0",
        color: "#ffffff",
    },
    container: {
        maxWidth: "75rem",
        color: "#333333",
        background: "rgba(255, 255, 255, 0.8)",
        margin: "auto",
        padding: "1rem 3rem 2rem 3rem",
        display: "flex",
        flexFlow: "row wrap",
        "@media (max-width: 40rem)": {
            marginTop: "1.5rem"
        },
    },
    ladoEsq: {
        paddingTop: "1rem",
        paddingRight: "1rem",
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
        padding: "2rem 1rem"
    },
    pageTitulo: {
        marginTop: "1.2rem",
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

    },
    logo: {
        height: "8rem",
    },
    sideLista: {

    },
    footer: {
        color: "#ffffff",
        textAlign: "center",
        padding: "2rem 0",
        backgroundColor: "#051a3c"
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
    },
    link: {
        cursor: "pointer",
        "&:hover": {
            color: "#666666"
        }
    },
    aviso: {
        display: "flex",
        flexFlow: "row wrap",
    },
    acesso: {
        minWidth: "20rem",
        margin: "1rem"
    },
    descricao: {
        margin: "1rem",
        maxWidth: "40rem"
    },
    cardAction: {
        padding: "1rem 1rem 0.5rem 1rem"
    }

}))

export default function Blog(props) {

    const classes = useStyles();
    const { api, slug, post, posts, usuario, token } = props;
    const [autores, setAutores] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchData = async () => {

            const responseAutores = await axios.get(api + '/vejodados/wp-json/wp/v2/users?_fields=id,name')
            if (responseAutores.status === 200) {
                setAutores(responseAutores.data)
            }

            const responseCategorias = await axios.get(api + '/vejodados/wp-json/wp/v2/categories?_fields=id,name,description')
            if (responseCategorias.status === 200) {
                setCategorias(responseCategorias.data)
            }

            responseAutores.status === 200 && responseCategorias.status === 200 && setLoading(false)

        };
        fetchData();

    }, [slug]);

    return (
        <>
            <Header
                color="transparent"
                //leftLinks={info && <LeftLinks info={info} />}
                respLinks={<RespLinks />}
                headerLinks={<HeaderLinks />}
                fixed
                changeColorOnScroll={{
                    height: 100,
                    color: "white",
                }}
            />

            <div className={classes.corpo}>

                {
                    loading == false & post.length > 0 ?
                        <>
                            <div className={classes.header}>
                                <Link href="/"><Button className={classes.title}><img src="/img/logo.png" className={classes.logo} /></Button></Link>
                                <div className={classes.pageTitulo} dangerouslySetInnerHTML={{ __html: post.map(i => i.title.rendered.replace('Privado: ', '')) }}></div>

                            </div>
                            <div className={classes.container}>

                                {(!usuario && slug != 'introducao-ao-ggplot2') || (!post.map(i => i.content.rendered)) ?

                                    categorias.filter(f => f.id == post.map(i => i.categories[0])).map(i =>
                                        post.map(p =>
                                            <Acesso tipoCategoria={'curso'} categoriaTitulo={i.name} categoriaDescricao={i.description} textoTitulo={p.title.rendered.replace('Privado: ', '')} textoResumo={p.excerpt.rendered} textoSlug={slug} textoLink={''} />
                                        )
                                    )
                                    :
                                    <>

                                        <div className={classes.ladoEsq} dangerouslySetInnerHTML={{ __html: post.map(i => i.content.rendered) }}></div>

                                        <div className={classes.ladoDir}>

                                            <div className={classes.listaPosts}>
                                                {
                                                    posts.map(i =>
                                                        <Link href={'/ggplot2/' + i.slug}>
                                                            <CardActionArea className={classes.cardAction}>
                                                                <div className={classes.sideLista}>
                                                                    <div className={classes.sideTitulo}><div className={classes.link} dangerouslySetInnerHTML={{ __html: i.title.rendered.replace('Privado: ', '') }}></div></div>
                                                                    <div className={classes.resumo} dangerouslySetInnerHTML={{ __html: i.excerpt.rendered }}></div>

                                                                </div>
                                                            </CardActionArea>
                                                        </Link>
                                                    )
                                                }

                                            </div>
                                        </div>
                                    </>
                                }
                            </div>

                        </>
                        :
                        <>
                            <div className={classes.fundo}>
                                <div className={classes.header}>
                                    <Link href="/"><Button className={classes.title}><img src="/img/logo.png" className={classes.logo} /></Button></Link>
                                    <div className={classes.load}>
                                        <div class="loader1" ></div>
                                    </div>
                                </div>
                            </div>
                        </>
                }
            </div>
            <div className={classes.footer}>Produzido por George Gomes</div>
        </>
    )

}

export async function getServerSideProps(ctx) {

    const session = await getSession(ctx)

    const token = session && await axios.post(process.env.API_URL + '/vejodados/wp-json/jwt-auth/v1/token', { username: session.user.email, password: process.env.API_USER_SECRET })
        .then(function (response) {
            return response.data.token;
        }).catch(function (error) {
            // console.log(error);      
        });

    const token_admin = (!token && session && ctx.query.insc == 1) && await axios.post(process.env.API_URL + '/vejodados/wp-json/jwt-auth/v1/token', { username: process.env.ADMIN_ID, password: process.env.ADMIN_SECRET })
        .then(function (response) {
            return response.data.token;
        }).catch(function (error) {
            //console.log(error);
        });

    (!token && session && token_admin) && await axios.post(process.env.API_URL + '/vejodados/wp-json/wp/v2/users/register', {
        username: session.user.email,
        email: session.user.email,
        display_name: session.user.name,
        name: session.user.name,
        first_name: session.user.name.split(' ', 1)[0],
        last_name: session.user.name.split(' ', 2)[1],
        password: process.env.API_USER_SECRET,
    }, {
        headers: { "Authorization": `Bearer ${token_admin}`, "Content-Type": "application/json" }
    }).catch(function (error) {
        // console.log(error);
    });

    (!token && session && token_admin) && await axios.post(process.env.API_URL + '/vejodados/wp-json/wp/v2/comments', {
        author_email: session.user.email,
        author_name: session.user.name,
        author_url: ctx.query.slug,
        content: session.user.name,
        post: 8
    }, {
        headers: { "Authorization": `Bearer ${token_admin}`, "Content-Type": "application/json" }
    }).catch(function (error) {
        console.log(error);
    });

    const token_user = !token | ctx.query.slug == 'introducao-ao-ggplot2' && await axios.post(process.env.API_URL + '/vejodados/wp-json/jwt-auth/v1/token', { username: process.env.API_ID, password: process.env.API_SECRET })
        .then(function (response) {
            return response.data.token;
        }).catch(function (error) {
            // console.log(error);      
        });

    const content = ctx.query.slug == 'introducao-ao-ggplot2' || session ? ',content' : null
    const post = token_user && await axios.get(process.env.API_URL + '/vejodados/wp-json/wp/v2/posts?status=publish,private&slug=' + ctx.query.slug + '&_fields=slug,author' + content + ',title,categories,excerpt', { headers: { "Authorization": `Bearer ${token_user}`, "Content-Type": "application/json" } })
        .then(function (response) {
            return response.data;
        }).catch(function (error) {
            console.log(error);
        });

    const posts = token_user && await axios.get(process.env.API_URL + '/vejodados/wp-json/wp/v2/posts?status=publish,private&_fields=slug,author,title,categories,excerpt&order=asc', { headers: { "Authorization": `Bearer ${token_user}`, "Content-Type": "application/json" } })
        .then(function (response) {
            return response.data;
        }).catch(function (error) {
            console.log(error);
        });

    return {
        props: {
            api: process.env.API_URL,
            slug: ctx.query.slug ? ctx.query.slug : 'introducao-ao-ggplot2',
            post: post,
            posts: posts,
            usuario: session && session.user
        },
    }

}