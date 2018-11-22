import React, { Component } from 'react';
import { Form, Field, FormSpy } from 'react-final-form'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'
import Checkbox from '@material-ui/core/Checkbox'
import ItemsContainer from '../../containers/ItemsContainer'
import FormControl from '@material-ui/core/FormControl'

class ShareForm extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef()
    this.state = {
      fileSelected: false,
      done: false,
      selectedTags: [],
    }
  }

  generateTagsText(tags, selected) {
    return tags
      .map(t => (selected.indexOf(t.id) > -1 ? t.title : false))
      .filter(e => e)
      .join(', ');
  }

  handleSelectFile(e) {
    this.setState({ fileSelected: this.fileInput.current.files[0] })
  }
  resetFileInput() {
    console.log(this.state.fileSelected)
    this.fileInput.current.value = ''
    // this.props.resetNewItemImage()
    this.setState({ fileSelected: false })
  }

  onSubmit = (values, tags, addItem) => {
    const { title, description } = values
    const tagData = this.applyTags(tags)
    console.log(tagData, 'this is tagData')
    addItem.mutation({
      variables: {
        ownerid: '1',
        title: title,
        description: description,
        tags: tagData
      }
    })
  };

  handleChange = event => {
    this.setState({ selectedTags: event.target.value });
  };

  async saveItem(values, tags, addItem) {
    const { validity, files: [file] } = this.fileInput.current
    if (validity.valid && file) {
      try {
        const itemData = {
          ...values,
          tags: this.applyTags(tags)
        }
        await addItem.mutation({
          variables: {
            item: itemData,
            image: file
          }
        })
        this.setState({ done: true })
      } catch (e) {
        console.log(e)
      }
    } else {
      console.log('No File...')
    }
  }

  applyTags(tags) {
    return (
      tags &&
      tags
        .filter(tag => this.state.selectedTags.indexOf(tag.id) > -1)
        .map(tag => ({ title: tag.title, id: tag.id }))
    );
  }

  render() {
    const { classes } = this.props

    return (
      <ItemsContainer>
        {({ addItem, tagData: { loading, error, tags } }) => {
          if (loading) return 'loading'
          if (error) return 'error'
          return (
            <div className={classes.test}>
              <Form
                onSubmit={(values) => {
                  this.onSubmit(values, tags, addItem)
                }
                }
                render={({ handleSubmit, form, submitting, pristine, values, invalid }) => (
                  <form onSubmit={handleSubmit}>
                    <Typography variant='display2' className={classes.headline}>
                      Share. Borrow. Prosper.
                  </Typography>
                    <FormControl fullWidth className={classes.formControl}>
                      <Field name='imageurl'>
                        {({ input, meta }) => {
                          return (
                            <React.Fragment>
                              {!this.state.fileSelected
                                ? <Button
                                  size='medium'
                                  color='primary'
                                  variant='contained'
                                  onClick={() => {
                                    this.fileInput.current.click()
                                  }}
                                >
                                  <Typography>Select an Image</Typography>
                                </Button>
                                : <Button
                                  size='medium'
                                  color='primary'
                                  variant='outlined'
                                  onClick={() => {
                                    this.resetFileInput()
                                  }}
                                >
                                  <Typography>
                                    Reset image
                        </Typography>
                                </Button>}
                              <input
                                ref={this.fileInput}
                                hidden
                                type='file'
                                accept='image/*'
                                id='fileInput'
                                onChange={e =>
                                  this.handleSelectFile(e)}
                              />
                            </React.Fragment>
                          )
                        }}
                      </Field>
                    </FormControl>
                    <FormControl fullWidth className={classes.formControl}>
                      <InputLabel htmlFor='title'>Name your Item</InputLabel>
                      <Field name='title'>
                        {({ input, meta }) => (
                          <Input
                            id='title'
                            type='text'
                            inputProps={{
                              ...input,
                              autoComplete: 'off'
                            }}
                            value={input.value}
                          />
                        )}
                      </Field>
                    </FormControl>
                    <FormControl fullWidth className={classes.formControl}>
                      <Field name='description'>
                        {({ input, meta }) => (
                          <TextField
                            id='description'
                            placeholder='Describe your item'
                            margin='normal'
                            multiline
                            rows='2'
                            rowsMax='2'
                            inputProps={{
                              ...input,
                              autoComplete: 'off'
                            }}
                            value={input.value}
                          />
                        )}
                      </Field>
                    </FormControl>

                    <FormControl fullWidth className={classes.formControl}>
                      <InputLabel htmlFor="select-multiple">Select Tags</InputLabel>
                      <Field name='tags'>
                        {({ input, meta }) => {
                          return (
                            <Select
                              multiple
                              value={this.state.selectedTags}
                              onChange={this.handleChange}
                              input={<Input id="select-multiple-checkbox" />}
                              renderValue={selected => this.generateTagsText(tags, selected)}
                            >
                              {tags.map(tag => (
                                <MenuItem key={tag.id} value={tag.id}>
                                  <Checkbox checked={this.state.selectedTags.indexOf(tag.id) > -1} />
                                  <ListItemText primary={tag.title} />
                                </MenuItem>
                              ))}
                            </Select>
                          )
                        }}
                      </Field>
                    </FormControl>

                    <div className="buttons">
                      <Button
                        type='submit'
                        className={classes.formButton}
                        variant='contained'
                        size='large'
                        color='primary'
                        disabled={pristine || invalid}
                      >
                        Share
                      </Button>
                      <Button
                        type="button"
                        onClick={form.reset}
                        disabled={submitting || pristine}
                      >
                        Reset
                      </Button>
                    </div>
                    <pre>{JSON.stringify(values, 0, 2)}</pre>
                  </form>
                )}
              />
            </div>
          )
        }
        }
      </ItemsContainer>
    );
  }
}

export default withStyles(styles)(ShareForm);
