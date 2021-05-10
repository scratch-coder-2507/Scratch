import styled from "styled-components";

const Login = (props) => {
    return (
        <Container>
            <Content>
                <CTA>
                    <CTALogoOne src="/assets/images/cta-logo-one.svg" alt="cta-logo"/>
                    <SignUp>GET ALL THERE</SignUp>
                    <Description>
                        Get Premier Access to Raya and the Last Dragon for an additional fee
                        with a Scratch subscription. As of 03/26/21, the price of Scratch
                        and The Scratch Bundle will increase by $1.
                    </Description>
                    <CTALogoTwo src="/assets/images/cta-logo-two.png" alt="cta-logo-two"/>
                </CTA>
                <BgImage/>
            </Content>
        </Container>
    );
};

const Container = styled.section`
    overflow: hidden;
    display: flex;
    flex-direction: column;
    text-align: center;
    height: 100vh;
`;

const Content = styled.div`
    display: flex;
    position: relative;
    margin-bottom: 10vw;
    width: 100%;
    min-height: 100vh;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 80px 40px;
    height: 100%;
`;

const BgImage = styled.div`
    height: 100%;
    background-position: top;
    background-size: cover;
    background-repeat: no-repeat;
    position:absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: -1;
    background-image: url("/assets/images/login-background.jpg");
`;

const CTA = styled.div`
    max-width:650px;
    width:100%;
    display: flex;
    flex-direction: column;
`;

const CTALogoOne = styled.img`
    margin-bottom: 12px;
    max-width: 600px;
    min-height: 1px;
    display: block;
    width: 100%;
`;

const SignUp = styled.a`
    background-color: #0063e5;
    color: #f9f9f9;
    font-weight: bold;
    margin-bottom: 12px;
    width: 100%;
    letter-spacing: 1.5px;
    font-size: 18px;
    padding: 16.5px 0;
    border: 1px solid transparent;
    border-radius: 5px;

    &:hover {
        background-color: #0483ee;
        cursor: pointer;
    }
`;

const Description = styled.p`
    color: hsla(0, 0%, 95.3%, 1);
    font-size: 11px;
    margin: 0 0 24px;
    line-height: 1.5;
    letter-spacing: 1.5px;
`;

const CTALogoTwo = styled.img`
    max-width: 600px;
    margin-bottom: 20px;
    display: inline-block;
    vertical-align: bottom;
    width: 100%;
`;

export default Login;
