import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'

interface EmailVerificationDialogProps {
  isOpen: boolean
  onClose: () => void
}

const EmailVerificationDialog: React.FC<EmailVerificationDialogProps> = ({
  isOpen,
  onClose
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Email Verification Required
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Your email is not verified. Please check your inbox and verify your
          email before logging in.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export { EmailVerificationDialog }
