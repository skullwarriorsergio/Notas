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
import { Estudiante } from "../utils/types";
import { getEstudiantes } from '../utils/apiHelper'
import EstudianteCard from "./EstudianteCard";

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
    data: Estudiante[]
    onDelete : any
}

const Estudiantes = ({data, onDelete}: Props) => {
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
                    <Typography className={classes.heading}>Lista de estudiantes</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container direction="row" justifyContent="flex-start">
                        {(() => {
                            if (data?.some(x => x)){
                                return (
                                    data?.map((item) =>
                                // eslint-disable-next-line react/jsx-key
                                <EstudianteCard data={item} onDelete={onDelete} />)
                                )
                            }              
                            return (
                            <Typography className={classes.secondaryHeading}>No hay usuarios registrados</Typography>
                            )
                        })()
                        }
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </Container>
    )
}

export default Estudiantes