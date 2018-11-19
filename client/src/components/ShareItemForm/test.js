import { connect } from 'react-redux'
import { Form, Field } from 'react-final-form'
import { FormSpy } from 'react-final-form'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import CircularProgress from '@material-ui/core/CircularProgress'
import CloudDoneIcon from '@material-ui/icons/CloudDone'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'
import React, { Component } from 'react'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import {
  updateNewItem,
  resetNewItem,
  resetNewItemImage
} from '../../Redux/ShareItemPreview/actions'
import validate from './helpers/validation'
import ItemsContainer from '../../Containers/ItemsContainer'
import styles from './styles'

class ShareItemForm extends Component {
  constructor () {
    super()
    this.fileInput = React.createRef()
    this.state = {
      fileSelected: false,
      done: false,
      selectedTags: []
    }
  }

  componentWillUnmount () {
    this.props.resetNewItem()
  }

  handleSelectTag (event) {
    this.setState({ selectedTags: event.target.value })
  }

  applyTags (tags) {
    return (
      tags &&
      tags
        .filter(t => this.state.selectedTags.indexOf(t.id) > -1)
        .map(t => ({ title: t.title, id: t.id }))
    )
  }

  getBase64Url () {
    return new Promise(resolve => {
      const reader = new FileReader()
      reader.onload = e => {
        resolve(
          `data:${this.state.fileSelected.mimeType};base64, ${btoa(e.target.result)}`
        )
      }
      reader.readAsBinaryString(this.state.fileSelected)
    })
  }

  handleSelectFile (e) {
    this.setState({ fileSelected: this.fileInput.current.files[0] })
  }

  resetFileInput () {
    this.fileInput.current.value = ''
    this.props.resetNewItemImage()
    this.setState({ fileSelected: false })
  }

  async saveItem (values, tags, addItem) {
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

  generateTagsText (tags, selected) {
    return tags
      .map(t => (selected.indexOf(t.id) > -1 ? t.title : false))
      .filter(e => e)
      .join(', ')
  }

  dispatchUpdate (values, tags, updateNewItem) {
    if (!values.imageurl && this.state.fileSelected) {
      this.getBase64Url().then(imageurl => {
        updateNewItem({
          imageurl
        })
      })
    }

    updateNewItem({
      ...values,
      tags: this.applyTags(tags)
    })
  }

  reset (form) {
    form.reset()
    this.setState({
      fileSelected: false,
      done: false,
      selectedTags: []
    })
    this.props.resetNewItem()
    this.resetFileInput()
  }

  render () {
    const { classes, updateNewItem, resetNewItem } = this.props
    return (
      <ItemsContainer>
        {({ addItem, tagData: { tags } }) => {
          return (
            <Form
              onSubmit={values => {
                this.saveItem(values, tags, addItem)
              }}
              validate={validate.bind(this)}
              render={({
                handleSubmit,
                pristine,
                submitting,
                invalid,
                form
              }) => (
                <form onSubmit={handleSubmit} className={classes.shareItemForm}>
                  <FormSpy
                    subscription={{ values: true }}
                    component={({ values }) => {
                      if (values) {
                        this.dispatchUpdate(values, tags, updateNewItem )
                      }
                      return ''
                    }}
                  />
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
                              onChange={e => this.handleSelectFile(e)}
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
                          rows='4'
                          rowsMax='4'
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
                    <InputLabel htmlFor='age-simple'>
                      Add some tags
                    </InputLabel>
                    <Field name='tags'>
                      {({ input, meta }) => {
                        return (
                          <Select
                            multiple
                            value={this.state.selectedTags}
                            onChange={e => this.handleSelectTag(e)}
                            renderValue={selected => {
                              return this.generateTagsText(tags, selected)
                            }}
                          >
                            {tags &&
                              tags.map(tag => (
                                <MenuItem key={tag.id} value={tag.id}>
                                  <Checkbox
                                    checked={
                                      this.state.selectedTags.indexOf(tag.id) >
                                        -1
                                    }
                                  />
                                  <ListItemText primary={tag.title} />
                                </MenuItem>
                              ))}
                          </Select>
                        )
                      }}
                    </Field>
                  </FormControl>
                  <Button
                    type='submit'
                    className={classes.formButton}
                    variant='contained'
                    size='large'
                    color='primary'
                    disabled={pristine || invalid}
                  >
                    {submitting &&
                      <CircularProgress
                        size={24}
                        color='inherit'
                        className={classes.buttonLoader}
                      />}
                    {' '}
                    Share
                  </Button>
                  <Dialog open={this.state.done} aria-labelledby='Dialog title'>
                    <DialogTitle>
                      <div className={classes.doneTitle}>
                        <CloudDoneIcon /> Your item was added!
                      </div>
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        You may add another item if you like. To add another item click 'Add another item'. To view your item, click 'Back to items page'.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={() => {
                          this.reset(form, resetNewItem)
                        }}
                        color='primary'
                      >
                        Add Another Item
                      </Button>
                      <Button autoFocus color='secondary'>
                        <Link to='/items' className={classes.backButton}>
                          Back to Items Page
                        </Link>
                      </Button>
                    </DialogActions>
                  </Dialog>
                </form>
              )}
            />
          )
        }}
      </ItemsContainer>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateNewItem (item) {
    dispatch(updateNewItem(item))
  },
  resetNewItem () {
    dispatch(resetNewItem())
  },
  resetNewItemImage () {
    dispatch(resetNewItemImage())
  }
})

export default connect(undefined, mapDispatchToProps)(
  withStyles(styles)(ShareItemForm)
)



// WEBPACK FOOTER //
// ./src/Components/ShareItemForm/index.js