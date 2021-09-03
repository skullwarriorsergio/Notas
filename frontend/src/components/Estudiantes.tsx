/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react"
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
    Grid,
    Divider,
    Paper,
    Typography,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Container
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Estudiante } from "../utils/types";
import { getEstudiantes } from '../utils/apiHelper'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: "2rem",
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '33.33%',
            flexShrink: 0,
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
    }),
);

const formatEstudiante = (estudiante: Estudiante) => ({
    id: estudiante?.id,
    nombre: estudiante?.nombre
})

const Estudiantes = () => {
    const [objects, setObjects] = useState<Estudiante[]>([])
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        getEstudiantes()
            .then((res) => setObjects(res?.data))
            .catch((err) => console.log(err))
    }, [objects]);

    return (
        <Container className={classes.root}>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography className={classes.heading}>Estudiantes</Typography>
                    <Typography className={classes.secondaryHeading}>Lista de estudiantes registrados</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container justifyContent="flex-start">
                        {
                            objects?.map((item) =>
                                <Paper />)
                        }
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </Container>
    )
}

export default Estudiantes