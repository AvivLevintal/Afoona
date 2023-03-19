import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { FacebookProvider, Like } from 'react-facebook';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SocialMediaPop() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" sx={{ my: 2, color: 'white', display: 'block' }} onClick={handleClickOpen}>
        רשתות חברתיות
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{ direction: 'rtl', textAlign: 'right' }}
      >
        <DialogTitle>{"תנו לנו לייק בפייסבוק ותעזרו לנו לגדול!"}</DialogTitle>
        <DialogContent>
            <FacebookProvider appId="123456789">
                <Like href="http://www.facebook.com" colorScheme="dark" showFaces share />
            </FacebookProvider>
        </DialogContent>
        

      </Dialog>
    </div>
  );
}