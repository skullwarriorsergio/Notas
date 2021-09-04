/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react"
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
    Grid,
    Divider,
    Typography,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Container
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Estudiante, Profesor } from "../utils/types";
import { getEstudiantes } from '../utils/apiHelper'
import EstudianteCard from "./EstudianteCard";
import ProfesorCard from "./ProfesorCard";

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


type Props = {
    data: Profesor[]
    onDelete : any
}

const Profesores = ({data, onDelete}: Props) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <Container className={classes.root}>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography className={classes.heading}>Lista de profesores</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container justifyContent="flex-start">
                        {(() => {
                            if (data?.some(x => x)){
                                return (
                                    data?.map((item) =>
                                // eslint-disable-next-line react/jsx-key
                                <ProfesorCard data={item} onDelete={onDelete} />)
                                )
                            }              
                            return (
                            <Typography className={classes.secondaryHeading}>No hay profesores registrados</Typography>
                            )
                        })()
                        }
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </Container>
    )
}

export default Profesores