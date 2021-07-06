import { Button, CircularProgress, Grid, Step, StepLabel, Stepper } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Form, Formik, FormikConfig, FormikValues } from 'formik';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import InputCheckbox from '../../components/InputCheckbox';
import InputSelect from '../../components/InputSelect';
import InputText from '../../components/InputText';
import InputTextMask from '../../components/InputTextMask';
import { useStores } from '../../hooks/useStores';
import UnidadeSaudeDto from '../../services/unidadeSaude/dto/unidadeSaudeDto';
import { initialValues, validationSchema } from './validation';


const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));
export default function Agendamento() {
  const classes = useStyles();
  const { unidadeSaudeStore, agendamentoStore } = useStores();
  const [unidadesSaude, setUnidadesSaude] = useState<UnidadeSaudeDto[]>([]);

  useEffect(() => {
    async function getUnidade() {
      var unidades = await unidadeSaudeStore.getList();
      setUnidadesSaude(unidades);
    }

    getUnidade();
  }, [unidadeSaudeStore,]);

  async function handleSubmit(values: any, { setSubmitting }: any) {
    try {
      await agendamentoStore!.create(values).then(() => {
        Swal.fire({
          title: 'Sucesso',
          html: "<p>Agendamento realizado com sucesso</p>",
          icon: 'success'
        });
      });
    } catch (error) {
      setSubmitting(false);
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Agende sua vacina
          </Typography>

          <FormikStepper
            initialValues={{ ...initialValues }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <FormikStep validationSchema={validationSchema} label="Agendamento">
              <Grid container spacing={1}>

                <Grid item xs={12}>
                  <InputSelect
                    name="unidade_saude_id"
                    label="Unidade de Saúde"
                    options={unidadesSaude}
                  />
                </Grid>

                <Grid item xs={12}>
                  <InputTextMask
                    name="data_hora"
                    label="Data do agendamento"
                    placeholder="__/__/____ __:__"
                    mask="99/99/9999 99:99"
                  />
                </Grid>

              </Grid>
            </FormikStep>

            <FormikStep validationSchema={validationSchema} label="Dados Pessoais">
              <Grid container spacing={1}>

                <Grid item xs={12}>
                  <InputText
                    label="Observações"
                    name="observacoes"
                  />
                </Grid>

                <Grid item xs={12}>
                  <InputCheckbox
                    name="necessidades_especiais"
                    label="Necessidades Especiais"
                  />
                </Grid>

              </Grid>
            </FormikStep>

          </FormikStepper>
        </Paper>
      </main>
    </React.Fragment>
  );
}

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
  label: string;
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

export function FormikStepper({ children, ...props }: FormikConfig<FormikValues>) {
  const classes = useStyles();
  const childrenArray = React.Children.toArray(children) as React.ReactElement<FormikStepProps>[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          setCompleted(true);
        } else {
          setStep((s) => s + 1);
          helpers.setTouched({});
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child, index) => (
              <Step key={child.props.label} completed={step > index || completed}>
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {currentChild}

          <div className={classes.buttons}>

            {step > 0 ? (
              <Button
                disabled={isSubmitting}
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => setStep((s) => s - 1)}
              >
                Voltar
              </Button>
            ) : null}
            <Button
              startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
              disabled={isSubmitting}
              variant="contained"
              className={classes.button}
              color="primary"
              type="submit"
            >
              {isSubmitting ? 'Submitting' : isLastStep() ? 'Confirmar' : 'Próximo'}
            </Button>

          </div>
        </Form>
      )}
    </Formik>
  );
}