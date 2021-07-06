import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Formik, Form } from 'formik';
import { validationSchema, initialValues } from './validation';
import InputText from '../../components/InputText';
import { useNavigate } from 'react-router-dom';
import InputCheckbox from '../../components/InputCheckbox';
import InputTextMask from '../../components/InputTextMask';
import { useStores } from '../../hooks/useStores';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register: React.FC = () => {
  const classes = useStyles();
  let navigate = useNavigate();
  const { pessoaStore } = useStores();

  async function handleLogin() {
    navigate('/login');
  }

  async function handleSubmit(values: any, { setSubmitting }: any) {
    try {
      await pessoaStore!.create(values).then(() => navigate('/login'));
    } catch (error) {
      setSubmitting(false);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrar
        </Typography>
        <Formik
          initialValues={{ ...initialValues }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({ isSubmitting }) =>
            <Form>
              <Grid container spacing={1}>

                <Grid item xs={12}>
                  <InputText
                    label="Nome"
                    name="nome"
                    autoComplete="name"
                    autoFocus
                    disabled={isSubmitting}
                  />
                </Grid>

                <Grid item xs={12}>
                  <InputText
                    label="Email"
                    name="email"
                    autoComplete="email"
                    disabled={isSubmitting}
                  />
                </Grid>

                <Grid item xs={12}>
                  <InputText
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    disabled={isSubmitting}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <InputTextMask
                    name="cpf"
                    label="CPF"
                    mask="999.999.999-99"
                    disabled={isSubmitting}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <InputTextMask
                    name="data_nascimento"
                    label="Data de Nascimento"
                    mask="99/99/9999"
                    disabled={isSubmitting}
                  />
                </Grid>

                <Grid item xs={12}>
                  <InputTextMask
                    name="telefone"
                    label="Telefone"
                    mask="(99) 99999-9999"
                    disabled={isSubmitting}
                  />
                </Grid>

                <Grid item xs={12}>
                  <InputText
                    label="Endereço"
                    name="endereco"
                    disabled={isSubmitting}
                  />
                </Grid>

                <Grid item xs={12}>
                  <InputCheckbox
                    name="grupo_prioritario"
                    label="Grupo Prioritário"
                  />
                </Grid>

              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                className={classes.submit}
                disabled={isSubmitting}
              >
                Registrar
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="" onClick={handleLogin} variant="body2">
                    Já possui uma conta? Login
                  </Link>
                </Grid>
              </Grid>
            </Form>
          }
        </Formik>
      </div>
    </Container>
  )
};

export default Register;