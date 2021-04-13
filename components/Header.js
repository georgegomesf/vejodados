import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { makeStyles } from "@material-ui/core/styles";
import Link from 'next/link';
import { AppBar, Button, Toolbar, Drawer, Hidden, IconButton, List, ListItem } from "@material-ui/core";
import { Home, Menu } from "@material-ui/icons";
import classNames from "classnames";

const useStyles = makeStyles((theme) => ({
    appBar: {
        display: "flex",
        border: "0",
        borderRadius: "3px",
        padding: "0.225rem 0",
        marginBottom: "20px",
        color: "#555",
        width: "100%",
        backgroundColor: "#fff",
        boxShadow:
            "0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)",
        transition: "all 150ms ease 0s",
        alignItems: "center",
        flexFlow: "row nowrap",
        justifyContent: "flex-start",
        position: "relative",
        zIndex: "unset"
    },
    absolute: {
        position: "absolute",
        zIndex: "1100"
    },
    fixed: {
        position: "fixed",
        zIndex: "1100"
    },
    container: {
        flex: "1",
        alignItems: "center",
        justifyContent: "space-between",
        display: "flex",
        margin: "auto",
        flexWrap: "nowrap",
        "@media (min-width: 576px)": {
            maxWidth: "540px"
        },
        "@media (min-width: 768px)": {
            maxWidth: "720px"
        },
        "@media (min-width: 992px)": {
            maxWidth: "960px"
        },
        "@media (min-width: 1200px)": {
            maxWidth: "1140px"
        }
    },
    flex: {
        flex: 1,
    },
    title: {
        lineHeight: "30px",
        fontSize: "18px",
        borderRadius: "3px",
        textTransform: "none",
        color: "inherit",
        padding: "8px 16px",
        letterSpacing: "unset",
        "&:hover,&:focus": {
            color: "inherit",
            background: "transparent"
        }
    },
    appResponsive: {
        margin: "0px 0px",
        textAlign: "center"
    },
    transparent: {
        backgroundColor: "transparent !important",
        boxShadow: "none",
        paddingTop: "10px",
        color: "#FFFFFF"
    },
    white: {
        border: "0",
        padding: "0.125rem 0",
        marginBottom: "20px",
        color: "#555",
        backgroundColor: "#fff !important",
        boxShadow:
            "0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)"
    },
    drawerPaper: {
        border: "none",
        bottom: "0",
        transitionProperty: "top, bottom, width",
        transitionDuration: ".2s, .2s, .35s",
        transitionTimingFunction: "linear, linear, ease",
        width: "13rem",
        position: "fixed",
        display: "block",
        top: "0",
        height: "100vh",
        right: "0",
        left: "auto",
        visibility: "visible",
        overflowY: "visible",
        borderTop: "none",
        textAlign: "left",
        paddingRight: "0px",
        paddingLeft: "0",
    },
    brand: {
        height: "4rem"
    },
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
}));

export default function Header(props) {

    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [brand, setBrand] = useState("brand")
    const router = useRouter();

    useEffect(() => {
        if (props.changeColorOnScroll) {
            window.addEventListener("scroll", headerColorChange);
        }
        return function cleanup() {
            if (props.changeColorOnScroll) {
                window.removeEventListener("scroll", headerColorChange);
            }
        };
    });

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const headerColorChange = () => {
        const { color, changeColorOnScroll } = props;
        const windowsScrollTop = window.pageYOffset;

        if (windowsScrollTop > changeColorOnScroll.height) {
            document.body
                .getElementsByTagName("header")[0]
                .classList.remove(classes[color]);
            document.body
                .getElementsByTagName("header")[0]
                .classList.add(classes[changeColorOnScroll.color]);
            setBrand('brand2');
        } else {
            document.body
                .getElementsByTagName("header")[0]
                .classList.add(classes[color]);
            document.body
                .getElementsByTagName("header")[0]
                .classList.remove(classes[changeColorOnScroll.color]);
            setBrand('brand');
        }
    };

    const { color, headerLinks, respLinks, fixed, absolute } = props;

    const appBarClasses = classNames({
        [classes.appBar]: true,
        [classes[color]]: color,
        [classes.absolute]: absolute,
        [classes.fixed]: fixed
    });

    const brandComponent = router.asPath != "/" & brand == 'brand2' ? <Button className={classes.title}><img src={'../../img/' + brand + '.png'} className={classes.brand} /></Button> : <><img src={'../img/' + brand + '.png'} className={classes.brand} /></>;

    return (
        <>
            <AppBar className={appBarClasses}>
                <Toolbar className={classes.container}>
                    <List className={classes.list}>
                        <Link href="/">
                            {
                                brand == 'brand2' ? brandComponent :
                                    <ListItem button className={classes.listItem}>
                                        <Home className={classes.icon} />&nbsp; Início
                                    </ListItem>
                            }
                        </Link>
                    </List>
                    <Hidden smDown implementation="css">
                        {headerLinks}
                    </Hidden>
                    <Hidden mdUp>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerToggle}
                        >
                            < Menu />
                        </IconButton>
                    </Hidden>
                </Toolbar>
                <Hidden mdUp implementation="js">
                    <Drawer
                        variant="temporary"
                        anchor={"right"}
                        open={mobileOpen}
                        classes={{
                            paper: classes.drawerPaper
                        }}
                        onClose={handleDrawerToggle}
                    >
                        <div className={classes.appResponsive} onClick={handleDrawerToggle}>
                            {respLinks}
                        </div>
                    </Drawer>
                </Hidden>
            </AppBar>
        </>
    )
}