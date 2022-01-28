import styled from "styled-components"

const Container = styled.div`
height: 30px;
background-color: #f990c7;
color: white;
display: flex;
align-items: center;
justify-content: center;
font-size: 14px;
font-weight: 500;
`
const Announcement = () => {
  return (
    <Container>
      Première demarque ! tous les vêtements de la collection automne-hiver à -20%
    </Container>
  )
}

export default Announcement
