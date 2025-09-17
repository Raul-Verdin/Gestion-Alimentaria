import React, { useEffect, useState } from 'react';
import ReservationForm from '../components/ReservationForm';
import axiosClient from '../api/axiosClient';
import useSocket from '../hooks/useSocket';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';

export default function Reservations() {
  const [reservations, setReservations] = useState([]);
  const socketRef = useSocket();

  // Obtener reservas iniciales
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await axiosClient.get('/reservations');
        setReservations(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReservations();
  }, []);

  // Escuchar nuevas reservas en tiempo real
  useEffect(() => {
    if (!socketRef.current) return;
    socketRef.current.on('newReservation', (reservation) => {
      setReservations((prev) => [...prev, reservation]);
    });
  }, [socketRef]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Reservas
      </Typography>

      <Paper sx={{ p: 2, mb: 4 }}>
        <ReservationForm />
      </Paper>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Fecha y Hora</TableCell>
              <TableCell>Personas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map((r) => (
              <TableRow key={r._id || r.id}>
                <TableCell>{r.name}</TableCell>
                <TableCell>{r.phone}</TableCell>
                <TableCell>{r.dateTime}</TableCell>
                <TableCell>{r.partySize}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
