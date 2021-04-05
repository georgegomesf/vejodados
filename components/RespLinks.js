import Link from 'next/link';
import { makeStyles } from "@material-ui/core/styles";
import { Home, Assessment, YouTube } from "@material-ui/icons";
import { List, ListItem, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    list: {
        //...defaultFont,
        fontSize: "0.9rem",
        margin: "0",
        padding: "0",
        listStyle: "none",
        color: "inherit"
    },
    listItem: {
        float: "left",
        color: "inherit",
        position: "relative",
        display: "block",
        width: "auto",
        margin: "0",
        padding: "0",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            "&:after": {
                width: "calc(100% - 30px)",
                content: '""',
                display: "block",
                height: "1px",
                marginLeft: "15px",
                backgroundColor: "#e5e5e5"
            }
        }
    },
    listItemText: {
        padding: "0 !important"
    },
    navLink: {
        color: "inherit",
        position: "relative",
        padding: "0.5375rem",
        fontWeight: "400",
        fontSize: "12px",
        textTransform: "uppercase",
        borderRadius: "3px",
        lineHeight: "20px",
        textDecoration: "none",
        margin: "0px",
        display: "inline-flex",
        "&:hover,&:focus": {
            color: "inherit",
            background: "rgba(200, 200, 200, 0.2)"
        },
        [theme.breakpoints.down("sm")]: {
            width: "calc(100% - 30px)",
            marginLeft: "15px",
            marginBottom: "8px",
            marginTop: "8px",
            textAlign: "left",
            "& > span:first-child": {
                justifyContent: "flex-start"
            }
        }
    },
    conta: {
        textAlign: "center",
    },
    imgConta: {
        height: "6rem",
        margin: "auto",
        padding: "0.5rem"
    },
    icon: {
        marginBottom: "-0.35rem"
    },
    saudacao: {
        border: "none",
        cursor: "pointer",
    }
}));

function login() {
    signIn('google')
}

export default function RespLinks(props) {

    const classes = useStyles();

    return (
        <>
            <List className={classes.list}>
                <Link href="/">
                    <ListItem button className={classes.conta}>
                        <img src="../img/brand2.png" className={classes.imgConta} />
                    </ListItem>
                </Link>
                <Link href="/">
                    <ListItem button>
                        <Home className={classes.icon} />&nbsp; Início
                </ListItem>
                </Link>
                <Divider />
                <Link href="/ggplot2/introducao-ao-ggplot2">
                    <ListItem button>
                        <Assessment className={classes.icon} />&nbsp; Ggplot2
                    </ListItem>
                </Link>
                <Divider />
                <Link href="https://www.youtube.com/channel/UCoWo46I1-8ivIk56RvtkfWA">
                    <ListItem button>
                        <YouTube className={classes.icon} />&nbsp; Youtube
                    </ListItem>
                </Link>
            </List>
        </>
    )
}
