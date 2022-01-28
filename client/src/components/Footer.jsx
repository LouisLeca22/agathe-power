import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.img`
  width: 250px
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
    width: 50%;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo src={"https://firebasestorage.googleapis.com/v0/b/shop-2bc8b.appspot.com/o/logo.png?alt=media&token=ce69ea54-813f-48fb-8c5c-83f5b675b2cb"} />
        <Desc>
          Restez à la pointe de la mode avec Agathe Power. Nous avons toujours le vêtement qui correspond à votre style. L'experience de nos couturiers travaillent au quotidien pour vous créer une large game de prêt-à-porter qui se distingue par son élégance et son originalité. 
        </Desc>
        <SocialContainer>
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
          </a>
         <a href="https://www.pinterest.com" target="blank" rel="noreferrer">
         <SocialIcon color="E60023">
            <Pinterest />
          </SocialIcon>
         </a>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Liens utiles</Title>
        <List>
          <ListItem>Accueil</ListItem>
          <ListItem>Panier</ListItem>
          <ListItem>Boutiques</ListItem>
          <ListItem>Suivi de comande</ListItem>
          <ListItem>S.A.V</ListItem>
          <ListItem>Mon Compte</ListItem>
          <ListItem>Newsletter</ListItem>
          <ListItem>Entreprise</ListItem>
          <ListItem>Chèques cadeaux</ListItem>
          <ListItem>Mentions légales</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{marginRight:"10px"}}/> 95 Rue des Dames, 75017 Paris.
        </ContactItem>
        <ContactItem>
          <Phone style={{marginRight:"10px"}}/> +(33) 1 87 21 00 00
        </ContactItem>
        <ContactItem>
          <MailOutline style={{marginRight:"10px"}} /> contact-magasin@agathepower.fr
        </ContactItem>
        <Payment src="https://firebasestorage.googleapis.com/v0/b/shop-2bc8b.appspot.com/o/payment.png?alt=media&token=80d783d4-c935-41e2-9064-524c790d37d8" />
      </Right>
    </Container>
  );
};

export default Footer;