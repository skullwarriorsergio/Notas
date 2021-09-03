import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import {
  Grid,
  Divider,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Estudiantes from '../src/components/Estudiantes'
import MainLayout from '../src/layouts/main'

export default function Home() {
  return (
    <MainLayout>
      <Estudiantes></Estudiantes>
    </MainLayout>
  )
}
