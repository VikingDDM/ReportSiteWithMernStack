import React, { useState, useEffect } from 'react';
import { Container } from '@mui/system';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { LoadingButton as _LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { object, string, TypeOf } from 'zod';
import { useCreateReportMutation } from '../redux/api/reportApi';
import { toast } from 'react-toastify';
import SwipeableViews from "react-swipeable-views";
import UserDailyReportTable from '../components/userDailyReportTable';
import { useAppSelector } from '../redux/hooks';
import {user} from '../redux/selectors/userSelector';

const LoadingButton = styled(_LoadingButton)`
  padding: 0.4rem;
  color: white;
  font-weight: 500;
  border: 2px solid #222;
  margin-right: 1rem;
  background-color: cadetblue;
  border-radius: unset;
  border-color: cadetblue;
  width: 100px;
  &:hover {
    color: black;
  }
`;

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const steps = ['How much income?', 'How is your project going?', 'What did you study about?', 'Anythng else?'];
// const reportTags = ['Payment','Project','Study','Extra'];

const createReportSchema = object({
  Payment: string().min(1, 'Your incoming status is required'),
  Project: string().min(1, 'Your project status is required'),
  Study: string().min(1, 'Your study status is required'),
  Extra: string().min(1, 'Extra content is required'),
})

const createReportWithUserSchema = object({
  Payment: string(),
  Project: string(),
  Study: string(),
  Extra: string(),
  Username: string(),
})

export type ICreateReportWithUser = TypeOf<typeof createReportWithUserSchema>;
export type ICreateReport = TypeOf<typeof createReportSchema>;

const UserDailyReportPage = () => {
    const [buttonAtive, setButtonActive] = React.useState('');
    const reportUser = useAppSelector(user);
    const [headerText, setHeaderText] = React.useState('');
    
    useEffect(() => {
      if(new Date().getDay() === 0 || new Date().getDay() === 6) {
        setHeaderText('This is weekend. Have a rest.')
      } else if(new Date().getHours() <18){setHeaderText('This is not report time.')}
    },[])
// model action section
    const [activeStep, setActiveStep] = React.useState(0);
    const [modelShow, setModelShow] = useState(false);
    const modelHandleShow = () => setModelShow(true);
    const [eachReportValue, setEachReportValue] = useState('');
    const takeReportValue = (e:any) => {
      setEachReportValue(e.target.value);
    }
    const [reportResult, setReportResult] = useState<Array<string>>([]);
    // const [reportValue, setReportValue] = useState<Array<string>>([]);
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      if(eachReportValue !== '') {
        reportResult[activeStep]=eachReportValue;
      }
      setEachReportValue('');
      setValue('Payment', reportResult[0]);
      setValue('Project', reportResult[1]);
      setValue('Study', reportResult[2]);
      setValue('Extra', reportResult[3]);
    };
    const handleBack = () => {
      if(eachReportValue !== '') {
        reportResult[activeStep]=eachReportValue;
      }
      setEachReportValue('');
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleClose = () => {
      setActiveStep(0);
      setReportResult([]);
      setEachReportValue('');
      setModelShow(false);
      setValue('Payment', '');
      setValue('Project', '');
      setValue('Study', '');
      setValue('Extra', '');
      clearErrors('Payment');
      clearErrors('Project');
      clearErrors('Study');
      clearErrors('Extra');
    };
      
    const handlePaymentResult = (e:any) => {
        reportResult[0] = (e.target.value)
    }
    const handleProjectResult = (e:any) => {
        reportResult[1] = (e.target.value)
    }
    const handleStudyResult = (e:any) => {
        reportResult[2] = (e.target.value)
    }
    const handleExtraResult = (e:any) => {
        reportResult[3] = (e.target.value)
    }

// report submitting section
    const methods = useForm<ICreateReport>({
      resolver: zodResolver(createReportSchema),
    });

    const {
      reset,
      handleSubmit,
      register,
      setValue,
      clearErrors,
      formState: { isSubmitting, errors },
    } = methods;

    register('Payment', {
      onChange: handlePaymentResult,
    });
    register('Project', {
      onChange: handleProjectResult,
    });
    register('Study', {
      onChange: handleStudyResult,
    });
    register('Extra', {
      onChange: handleExtraResult,
    });

    const [createReport, { isLoading, isError, error, isSuccess }] =
    useCreateReportMutation();

    useEffect(() => {
      if (isSuccess) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
      }
  
      if (isError) {
        if (Array.isArray((error as any).data.error)) {
          (error as any).data.error.forEach((el: any) =>
            toast.error(el.message, {
              position: 'top-right',
            })
          );
        } else {
          toast.error((error as any).data.message, {
            position: 'top-right',
          });
        }
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    useEffect(() => {
      if (isSubmitting) {
        reset();
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitting]);

    const onSubmitHandler: SubmitHandler<any> = (values) => {
      createReport({
        Payment : reportResult[0],
        Project : reportResult[1],
        Study : reportResult[2],
        Extra : reportResult[3],
        Username : reportUser?.name
      });
      setReportResult([]);
      setValue('Payment', '')
      setValue('Project', '')
      setValue('Study', '')
      setValue('Extra', '')
    };


    return(
        <Container>
          <h5 style={{fontSize:"30px", color:"grey",marginBottom:"20px" ,fontWeight:"lighter"}}>Please report in a few minutes</h5>
          <h5 style={{fontSize:"15px", color:"grey",marginBottom:"20px" ,fontWeight:"lighter"}}>{headerText}</h5>
          
          <LoadingButton onClick={modelHandleShow} style={{display:buttonAtive}}>
            Report
          </LoadingButton>
          <Modal
            open={modelShow}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >       
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {steps[activeStep]}
              </Typography>
              <Box sx={{ width: '100%' }}>
                 <Stepper activeStep={activeStep}>
                   {steps.map((label, index) => {
                     const stepProps: { completed?: boolean } = {};
                     const labelProps: {
                       optional?: React.ReactNode;
                     } = {};
                     return (
                       <Step key={label} {...stepProps}>
                         <StepLabel {...labelProps}>{label}</StepLabel>
                       </Step>
                     );
                   })}
                 </Stepper>
                 <FormProvider {...methods}>
                   <Box component="form" noValidate autoComplete='off' onSubmit={handleSubmit(onSubmitHandler)} sx={{ mt: 3 }}>
                      <SwipeableViews index={activeStep}>
                        {steps.map((tag, index) => {
                          return(
                            <TextField
                              key={tag}
                              fullWidth
                              name={tag}
                              id={tag}
                              defaultValue={reportResult[index]}
                              onChange={takeReportValue}
                              rows={18}
                              multiline
                              style={{paddingRight:"10px", paddingLeft:"10px"}}
                             />
                          );
                        })}
                        <Paper style={{boxShadow:"none"}}>
                          <p style={{margin:"unset", color:"gray"}}>Income</p>
                          <TextField
                            fullWidth 
                            defaultValue={reportResult[0]}
                            rows={2}
                            multiline
                            error={!!errors['Payment']}
                            style={{ marginTop:"8px", paddingRight:"10px", paddingLeft:"10px"}}
                            {...register('Payment')}
                          />  
                          <p style={{margin:"unset", color:"gray"}}>Project</p>
                          <TextField
                            fullWidth 
                            defaultValue={reportResult[1]}
                            rows={2}
                            multiline
                            error={!!errors['Project']}
                            style={{ marginTop:"8px",paddingRight:"10px", paddingLeft:"10px"}}
                            {...register('Project')}
                          />
                          <p style={{margin:"unset", color:"gray"}}>Study</p>
                          <TextField
                            fullWidth 
                            defaultValue={reportResult[2]}
                            rows={2}
                            multiline
                            error={!!errors['Study']}
                            style={{ marginTop:"8px", paddingRight:"10px", paddingLeft:"10px"}}
                            {...register('Study')}
                          />
                          <p style={{margin:"unset", color:"gray"}}>Extra</p>
                          <TextField
                            fullWidth 
                            defaultValue={reportResult[3]}
                            rows={2}
                            multiline
                            error={!!errors['Extra']}
                            style={{ marginTop:"8px", paddingRight:"10px", boxShadow:"none !important", paddingLeft:"10px"}}
                            {...register('Extra')}
                          />
                        </Paper>
                        <div className='reportSuccess'>
                          <div style={{fontSize:"30px", color:"cadetblue", margin:"auto"}}>
                            Complete! You have done perfectly!
                          </div>
                        </div>
                      </SwipeableViews>
                      {activeStep === steps.length + 1 ? (
                        <React.Fragment>
                          <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                          </Typography>
                          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleClose}>close</Button>
                          </Box>
                        </React.Fragment>
                      ) 
                        : activeStep === steps.length ? (
                        <React.Fragment>
                          <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                          </Typography>
                          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleClose}>close</Button>
                            <Button type='submit'>Save</Button>
                          </Box>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                              disabled={activeStep === 0}
                              onClick={handleBack}
                              sx={{ mr: 1 }}
                            >
                              Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleClose}>
                              Close
                            </Button>
                            <Button onClick={handleNext}>
                              Next
                            </Button>
                          </Box>
                        </React.Fragment>
                      )}
                    </Box>
                  </FormProvider>
              </Box>
            </Box>
          </Modal>
          <UserDailyReportTable setBtnAble={(btnAble:string) => setButtonActive(btnAble)}/>
        </Container>
    )
}

export default UserDailyReportPage;