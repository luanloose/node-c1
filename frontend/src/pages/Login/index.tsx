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
import { useNavigate } from 'react-router-dom';
import { useStores } from '../../hooks/useStores';
import { Formik, Form } from 'formik';
import { validationSchema, initialValues } from './validation';
import InputText from '../../components/InputText';

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
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login: React.FC = () => {
  const classes = useStyles();
  const { authenticationStore } = useStores();
  let navigate = useNavigate();

  async function handleRegister() {
    navigate('/register');
  }

  async function handleSubmit(values: any, { setSubmitting }: any) {
    try {
      await authenticationStore!.login(values).then(() => navigate('/app'));
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
          Login
        </Typography>
        <Formik
          initialValues={{ ...initialValues }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({ isSubmitting }) =>
            <Form>
              <InputText
                name="email"
                label="Email"
                autoComplete="email"
                autoFocus
                disabled={isSubmitting}
              />
              <InputText
                name="password"
                label="Senha"
                type="password"
                autoComplete="current-password"
                disabled={isSubmitting}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                className={classes.submit}
                disabled={isSubmitting}
              >
                Login
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="" onClick={handleRegister} variant="body2">
                    {"Não tem uma conta? Registre-se"}
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

export default Login;