import React, { Component } from 'react';
import { Form, Field } from 'react-final-form'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'



class ShareForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  onSubmit = async values => {
    await this.sleep(400);
    window.alert(JSON.stringify(values, 0, 2));
  };

  render() {
    const { classes } = this.props
    return (
      <div className={classes.test}>
        <p>This is the share form.</p>
        <Form
          onSubmit={this.onSubmit}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <label>Title</label>
                <Field
                  name="firstName"
                  component="input"
                  type="text"
                  placeholder="First Name"
                />
              </div>
              <div>
                <label>Categories</label>
                <div>
                  <label>
                    <Field
                      name="sauces"
                      component="input"
                      type="checkbox"
                      value="ketchup"
                    />{" "}
                    Ketchup
              </label>
                  <label>
                    <Field
                      name="sauces"
                      component="input"
                      type="checkbox"
                      value="mustard"
                    />{" "}
                    Mustard
              </label>
                  <label>
                    <Field
                      name="sauces"
                      component="input"
                      type="checkbox"
                      value="mayonnaise"
                    />{" "}
                    Mayonnaise
              </label>
                  <label>
                    <Field
                      name="sauces"
                      component="input"
                      type="checkbox"
                      value="guacamole"
                    />{" "}
                    Guacamole 🥑
              </label>
                </div>
              </div>
              <div>
                <label>Description</label>
                <Field name="notes" component="textarea" placeholder="Notes" />
              </div>
              <div className="buttons">
                <button type="submit" disabled={submitting || pristine}>
                  Submit
            </button>
                <button
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                >
                  Reset
            </button>
              </div>
              <pre>{JSON.stringify(values, 0, 2)}</pre>
            </form>
          )}
        />
      </div>
    );
  }
}

export default withStyles(styles)(ShareForm);
