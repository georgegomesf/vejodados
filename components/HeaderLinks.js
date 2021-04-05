import Link from 'next/link';
import { makeStyles } from "@material-ui/core/styles";
import { Home, Assessment, YouTube } from "@material-ui/icons";
import { List, ListItem } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    list: {
        //...defaultFont,
        fontSize: "0.9rem",
        margin: 0,
        paddingLeft: "0",
        listStyle: "none",
        paddingTop: "0",
        paddingBottom: "0",
        color: "inherit",
        display: "flex",
        flexDirection: "row",
    },
    listItem: {
        float: "left",
        color: "inherit",
        position: "relative",
        display: "block",
        width: "auto",
        padding: "0.6rem",
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
    icon: {
        marginBottom: "-0.35rem"
    },
    saudacao: {
        color: "#ffffff",
        fontSize: "0.9rem",
        margin: "-0.25rem -0.5rem 0 0",
        cursor: "pointer",
    },
}));

function login() {
    signIn('google')
}

export default function HeaderLinks(props) {

    const classes = useStyles();

    return (

        <List className={classes.list}>
            <Link href="/">
                <ListItem button className={classes.listItem}>
                    <Home className={classes.icon} />&nbsp; Início
                </ListItem>
            </Link>
            <Link href="/ggplot2/introducao-ao-ggplot2">
                <ListItem button className={classes.listItem}>
                    <Assessment className={classes.icon} />&nbsp; Ggplot2
                </ListItem>
            </Link>
            <Link href="https://www.youtube.com/channel/UCoWo46I1-8ivIk56RvtkfWA">
                <ListItem button className={classes.listItem}>
                    <YouTube className={classes.icon} />&nbsp; Youtube
                </ListItem>
            </Link>
        </List >
    )
}
