import { useAuth0 } from "@auth0/auth0-react";
import { Accordion, AccordionDetails, AccordionSummary, Button, createStyles, Grid, makeStyles, Paper, TextField, Theme, Typography } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useUserContext, userUpdate } from "../contexts/UserContext";

const useStyles = makeStyles((theme: Theme) => createStyles({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    header: {
        padding: theme.spacing(5)
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    accountDetails: {
        padding: theme.spacing(2),
        textAlign: 'center'
    },
    accordionDetails: {
        padding: theme.spacing(5)
    },
    formControl: {
        width: '100%'
    },
    paper: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(5),
        textAlign: 'center'
    },
    profilePicture: {
        borderRadius: '100%',
        width: 150,
        height: 150,
    },
    formText: {
        paddingBottom: theme.spacing(3)
    },
    formContainer: {
        textAlign: 'left',
    }
}))

const AccountPage = () => {
    const classes = useStyles();
    const [ isExpanded, setIsExpanded ] = useState<string | false>(false);
    const auth0User = useAuth0().user;
    const [ userState, userDispatch ] = useUserContext();

    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setIsExpanded(isExpanded ? panel : false);
    };

    return ( 
        <Grid item xs={12} sm={8} lg={6}>
            <Paper className={classes.paper}>
                <img className={classes.profilePicture} alt={auth0User.name} src={auth0User.picture} />
                    <Typography className={classes.header} variant='h4'>{auth0User.name}</Typography>
                    <Grid container className={classes.formContainer} justify='center'>
                        <Grid className={classes.secondaryHeading} item xs={6}>
                            <Typography className={classes.formText}>rating: </Typography>
                            <Typography className={classes.formText}>games played: </Typography>
                            <Typography className={classes.formText}>messages sent: </Typography>
                            <Typography className={classes.formText}>friends: </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography className={classes.heading}>a{userState.user?.rating}</Typography>
                        </Grid>
                    </Grid>
            </Paper>
            <Accordion elevation={5} expanded={isExpanded === 'acc1'} onChange={handleChange('acc1')}>
                <AccordionSummary expandIcon={<ExpandMore />} aria-controls='acc1-content' id="acc1-header">
                    <Typography className={classes.heading}>General</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>
                    <TextField id="username" variant="filled" label="Username" defaultValue={auth0User.name} className={classes.formControl} InputProps={{ readOnly: true }} />
                </AccordionDetails>
            </Accordion>
            <Accordion elevation={5} expanded={isExpanded === 'acc2'} onChange={handleChange('acc2')}>
                <AccordionSummary expandIcon={<ExpandMore />} aria-controls='acc2-content' id="acc2-header">
                    <Typography className={classes.heading}>Account</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>
                    <TextField id="a" variant="filled" label="Username" defaultValue={auth0User.name} className={classes.formControl} InputProps={{ readOnly: true }} />
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={isExpanded === 'acc3'} onChange={handleChange('acc3')}>
                <AccordionSummary expandIcon={<ExpandMore />} aria-controls='acc3-content' id="acc3-header">
                    <Typography className={classes.heading}>Private settings</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>
                    <Grid container justify='center' alignItems='center'>
                        <Grid item xs={4}>
                            <Typography className={classes.secondaryHeading}>Change Password: </Typography>
                        </Grid>
                        <Button variant='contained' color='primary'>Send email</Button>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </Grid>
    );
}

export default AccountPage;