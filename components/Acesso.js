import { signIn } from 'next-auth/client';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, Typography, Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import Link from 'next/link';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    aviso: {
        display: "flex",
        flexFlow: "row wrap",
    },
    acesso: {
        minWidth: "20rem",
        margin: "1rem"
    },
    categoria: {
        margin: "1rem",
        maxWidth: "40rem",
    },
    titulo: {
        fontSize: "1.5rem",

    },
    resumo: {
        padding: "1rem 0 0 0",

    },
    descricao: {
        borderLeft: "#999 solid 0.2rem",
        padding: "1rem",
        margin: "1rem"
    },
    botoes: {
        padding: "1rem 0"
    }
});

function login() {
    signIn('google')
}

export default function Acesso(props) {

    const classes = useStyles();
    const router = useRouter();

    const { tipoCategoria, categoriaTitulo, categoriaDescricao, textoTitulo, textoResumo, textoSlug, textoLink } = props;

    router.query.insc && login()

    console.log(router)

    return (
        <div className={classes.aviso}>
            <div className={classes.aviso}>
                <div className={classes.acesso} >
                    <Card className={classes.root}>
                        <CardMedia
                            className={classes.media}
                            image="/static/images/cards/contemplative-reptile.jpg"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                <div dangerouslySetInnerHTML={{ __html: textoTitulo }}></div>
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <div dangerouslySetInnerHTML={{ __html: textoResumo }}></div>
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
                <div className={classes.categoria}>
                    <div className={classes.titulo}>{categoriaTitulo}</div>
                    <div className={classes.descricao}>{categoriaDescricao}</div>
                    <div className={classes.resumo}>Olá,  este conteúdo é <strong>gratuito</strong>,
                    mas para acessá-lo você deve fazer login usando sua conta <strong>
                            Google ou Gsuite</strong>, sem necessidade de cadastro. Mas se quiser acompanhar todas as publicações do {tipoCategoria} "<strong>{categoriaTitulo}</strong>",
                             e ter acesso a mais recursos, você pode optar por fazer sua <strong>inscrição</strong>, também <strong>gratuitamente</strong>.</div>
                    <div className={classes.botoes}>
                        <Button onClick={login}>
                            <img src="/img/acesso.png" />
                        </Button>
                        <Button>
                            <Link href={router.asPath + '?insc=1'}>
                                <img src="/img/inscricao.png" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
