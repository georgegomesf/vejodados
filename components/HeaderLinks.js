import { signIn, signOut, useSession } from 'next-auth/client';
import Link from 'next/link';
import { makeStyles } from "@material-ui/core/styles";
import { LockOpen, ExitToApp, Home, Assessment, YouTube } from "@material-ui/icons";
import { Chip, Avatar, List, ListItem } from '@material-ui/core';

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
        color: "inherit",
        fontSize: "0.9rem",
        margin: "-0.25rem -0.5rem 0 0",
        cursor: "pointer",
        border: "none"
    },
}));

function login() {
    signIn('google')
}

export default function HeaderLinks(props) {

    const classes = useStyles();
    const [session] = useSession();

    return (

        <List className={classes.list}>

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
            {!session ? (
                <>
                    <ListItem button className={classes.listItem} onClick={login}>
                        <LockOpen className={classes.icon} />&nbsp;Entrar
                    </ListItem>
                </>
            ) :
                <>
                    <ListItem className={classes.listItem}>
                        <Chip
                            avatar={<Avatar alt={session.user.name} src={session.user.image} />}
                            label={session.user.name.split(' ', 1)}
                            variant=""
                            className={classes.saudacao}
                        />
                    </ListItem>
                    <ListItem button className={classes.listItem} onClick={signOut}>
                        <ExitToApp className={classes.icon} />&nbsp;Sair
                    </ListItem>
                </>
            }
        </List >
    )
}
