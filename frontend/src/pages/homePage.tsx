import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { LoadingButton as _LoadingButton } from '@mui/lab';

const LoadingButton = styled(_LoadingButton)`
  padding: 0.4rem;
  color: white;
  font-weight: 500;
  border: 2px solid #222;
  margin-right: 1rem;
  background-color: #3770b3;
  border-radius: unset;
  border-color: #3770b3;
  width: 100px;
  &:hover {
    color: black;
  }
`;
const ButtonBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
`;
const HomePageContainer = styled(Container)`
  background-image: url("homePageBackground.jpg");
  height:100vh;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  background-position: center;
  background-size: auto;
`;
const HomePage = () => {
    const navigate = useNavigate();

    return(
        <HomePageContainer>
            <ButtonBox display='flex' sx={{ ml: 'auto' }}>
                <LoadingButton
                    sx={{ mr: 2 }}
                    onClick={() => navigate('/signup')}
                >
                  SignUp
                </LoadingButton>
                <LoadingButton onClick={() => navigate('/signin')}>
                  Signin
                </LoadingButton>
            </ButtonBox>
        </HomePageContainer>
    )
}

export default HomePage;