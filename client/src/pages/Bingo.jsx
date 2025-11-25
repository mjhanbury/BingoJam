import { useContext } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

const SongCard = ({ order, title, artist }) => {
    return (
        <Row>
            <Col md={2} className='d-flex justify-content-center align-items-center'>{order}</Col>
            <Col>
                <Row>{title}</Row>
                <Row className='text-muted'>{artist}</Row>
            </Col>
        </Row>
    )
}

const PlayedSongs = () => {
    const { history } = useContext(ControlsContext);
    return (
        <Card style={{ width: 400 }}>
            <Card.Body>
                <Col className='d-flex flex-column gap-3'>
                    {
                        history.map((song, index) => (
                            <SongCard key={index} order={index + 1} title={song.title} artist={song.artist} />
                        ))
                    }
                </Col>
            </Card.Body>
        </Card>
    )
}

function Bingo() {
    

    return (
        <Container className='h-100 d-flex flex-column justify-content-center align-items-center gap-3'>
            <PlayedSongs />
        </Container>
    )
}

export default Bingo